import {transDate, getDay} from 'utils/'

export default {
    name: 'dict',
    data() {
        return {
            //查询条件
            searchParams: {
                key: '',
                label: '',
                type: '',
                description: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                key: '',
                value: '',
                label: '',
                type: '',
                description: '',
                themes: '',
                icon: '',
                sort: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,
            //表格数据
            tableData: [],
            //所有的类型，用做下拉框
            allType: [],

            themess: ['primary','gray','success','warning','danger'],

            diseditable: false,

            //cache -- map<map<value,dict>>
            dictDataMap: new Map(),
            //cache -- map<List<map>>
            dictDataList: [],
        }
    },

    mounted() {
        this.allDictType();
        this.getData();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        // 获取列表数据
        getData() {
            this.$$api_share_dictList({
                data: {
                    key: this.searchParams.key,
                    label: this.searchParams.label,
                    type: this.searchParams.type,
                    description: this.searchParams.description,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.total = data.data.page.total;
                        this.tableData = data.data.list;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        // 获取列表数据
        allDictType() {
            this.$$api_share_allDictType({
                data: {
                },
                fn: data => {
                    if (data.code == 200) {
                        this.allType = data.data.list;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        addData() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
            this.diseditable = false;
        },

        cleanSaveForm() {
            this.saveForm.id = '';
            this.saveForm.name = '';
            this.saveForm.addr = '';
            this.saveForm.hostId = '';
        },


        saveData() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    //this.dialogLoading = true;
                    this.$$api_share_saveDict({
                        data: {
                            id: this.saveForm.id,
                            key: this.saveForm.key,
                            value: this.saveForm.value,
                            label: this.saveForm.label,
                            type: this.saveForm.type,
                            description: this.saveForm.description,
                            themes: this.saveForm.themes,
                            icon: this.saveForm.icon,
                            sort: this.saveForm.sort,
                        },
                        fn: data => {
                            this.dialogLoading = false;
                            if (data.code == 200) {
                                this.dialogVisible = false;
                                this.getData();
                                this.cleanSaveForm();
                            } else {
                                this.$alert(data.message, '错误', {
                                    confirmButtonText: '确定'
                                });
                            }
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                            this.$alert('访问失败，请稍后重试！', '错误', {
                                confirmButtonText: '确定',
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        dataDetail(row) {
            if (!row.id) {
                return;
            }
            this.$$api_share_dictDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = data.data.dict;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })

            this.dialogVisible = true;
            this.dialogTitle = '编辑';
            this.diseditable = true;
        },


        delData(row) {
            if (!row.id) {
                return;
            }
            this.$$api_share_delDict({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData();
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        //dict
        getDictMapByType(type,value) {
            if (!type||value) {//type can not be null
                return;
            }
            let dictGroup = this.dictDataMap.get(category);
            if(!dictGroup){//if not found on catch ,  get from server
                var dicts = this.getDictByTypeFromServer(type);
                if(!dicts){
                    return;
                }
                dictGroup = new Map();
                for(let i=0;i<dicts.length;i++){
                    dictGroup.set(dicts[i].value,dicts[i]);
                }
                this.dictDataMap.set(type,dictGroup);
            }
            return dictGroup.get(value);
        },

        getDictListByType(type) {
            if (!type) {//type can not be null
                return;
            }
            let dictGroup = this.dictDataList.get(category);
            if(!dictGroup){//if not found on catch ,  get from server
                var dicts = this.getDictByTypeFromServer(type);
                if(!dicts){
                    return;
                }
                this.dictDataList.set(type,dictGroup);
            }
            return dictGroup;
        },

        getDictByTypeFromServer(type){
            if(!type){
                return;
            }
            this.$$api_share_getDictByType({
                data: {
                    type: type,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        return data.data.dict;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },





    }
}
