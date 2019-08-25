import {transDate, getDay} from 'utils/'

export default {
    name: 'templat',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
                metricId: '',
                classify: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                metricId: '',
                classify: '',
                notifyLevel: '',
                tagMap: [],
                rules: [],
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            metricList: [],
            metricList2: [],

        }
    },

    mounted() {
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

        addTemplat() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        // 获取列表数据
        getData() {
            this.$$api_umc_templatList({
                data: {
                    name: this.searchParams.name,
                    metricId: this.searchParams.metricId,
                    classify: this.searchParams.classify,
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

        cleanSaveForm() {
            this.saveForm.id = '';
            this.saveForm.name = '';
            this.saveForm.metric = '';
            this.saveForm.classify = '';
            this.saveForm.notifyLevel = '';
            this.saveForm.tagMap = [];
            this.saveForm.rules = [];
        },

        deleteTag(index) {
            this.saveForm.tagMap.splice(index, 1);
        },

        addTag() {
            this.saveForm.tagMap.push({
                name: '',
                value: '',
            })
        },

        deleteRule(index) {
            this.saveForm.rules.splice(index, 1);
        },

        addRule() {
            this.saveForm.rules.push({
                logicalOperator: 1,
                aggregator: '',
                relateOperator: '',
                value: '',
                queueTimeWindow: '',
                alarmLevel: '',
            })
        },


        saveTemplat() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    //this.dialogLoading = true;
                    this.$$api_umc_saveTemplat({
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

        editTemplat(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_templatDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        console.info(data.data.alarmTemplate);
                        this.saveForm = data.data.alarmTemplate;
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


        delTemplat(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_delTemplat({
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


        convertClassifyValue(value){
            console.info(value);

            if (value == 'basic') {
                return 'basic';
            }
            if (value == 'docker') {
                return 'docker';
            }
            if (value == 'redis') {
                return 'redis';
            }
            if (value == 'kafka') {
                return 'kafka';
            }
            if (value == 'zookeeper') {
                return 'zookeeper';
            }
            return '--';
        },

        convertLevelValue(value){
            console.info(value);

            if (value == 1) {
                return 'warn';
            }
            if (value == 2) {
                return 'error';
            }
            if (value == 3) {
                return 'danger';
            }
            if (value == 4) {
                return 'death';
            }

            return '--';
        },

        convertStatusType(value){
            if (value == 1) {
                return 'warning';
            }
            if (value == 3) {
                return 'success';
            }
            if (value == 3) {
                return 'danger';
            }
            if (value == 4) {
                return 'danger';
            }
            return 'danger';
        },


        getMetricByClassify(){
            this.$$api_umc_getMetricByClassify({
                data: {
                    classify: this.searchParams.classify,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.metricList = data.data.list;
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

        getMetricByClassifyForm(){
            this.$$api_umc_getMetricByClassify({
                data: {
                    classify: this.saveForm.classify,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.metricList2 = data.data.list;
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
        }




    }
}
