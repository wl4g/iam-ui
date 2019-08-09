import {transDate, getDay} from 'utils/'

export default {
    name: 'notification',
    data() {
        return {
            //查询条件
            searchParams: {
                startDate: '',
                endDate: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                metric: '',
                classify: '',
                notifyLevel: '',
                tagMap: [],
                rules: [],
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

        }
    },

    mounted() {
        this.getData();

    },

    methods: {

        onSubmit() {
            this.getData();
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        addData() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        // 获取列表数据
        getData() {
            var start = '';
            var end = '';
            if(this.searchParams.startDate!=''){
                start = this.getDate(this.searchParams.startDate);
            }
            if(this.searchParams.endDate!=''){
                end = this.getDate(this.searchParams.endDate);
            }

            this.$$api_umc_metricList({
                data: {
                    startDate: start,
                    endDate: end,

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

        getDate(startDate){
            let Y = startDate.getFullYear() + '-';
            let M = (startDate.getMonth()+1 < 10 ? '0'+(startDate.getMonth()+1) : startDate.getMonth()+1) + '-';
            let D = startDate.getDate() <10 ? '0'+(startDate.getDate()) : startDate.getDate();
            return Y+M+D;
        },

        cleanSaveForm() {
            this.saveForm = {};
            /*this.saveForm.id = '';
            this.saveForm.name = '';
            this.saveForm.metric = '';
            this.saveForm.classify = '';
            this.saveForm.notifyLevel = '';
            this.saveForm.tagMap = [];
            this.saveForm.rules = [];*/
        },

        saveData() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    //this.dialogLoading = true;
                    this.$$api_umc_saveMetric({
                        data: this.saveForm,

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

        convertClassifyValue(value){
            console.info(value);

            if (value == 1) {
                return 'basic';
            }
            if (value == 2) {
                return 'docker';
            }
            if (value == 3) {
                return 'redis';
            }
            if (value == 4) {
                return 'kafka';
            }
            if (value == 5) {
                return 'zookeeper';
            }
            return '--';
        },

        editData(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_metricDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        console.info(data.data.metricTemplate);
                        this.saveForm = data.data.metricTemplate;
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
        },


        delData(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_delMetric({
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

    }
}
