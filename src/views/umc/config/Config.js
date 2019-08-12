import {transDate, getDay} from 'utils/'

export default {
    name: 'config3',
    data() {
        return {
            //查询条件
            searchParams: {

            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                collectId: '',
                group: '',
                environment: '',
                classify: '',
                templateId: '',
                contactGroupId: '',
                callbackUrl: '',
            },

            //create内的下拉数据
            groupData: [],
            envirData: [],
            instanceData: [],

            templates: [],
            contactGroups: [],

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

        }
    },

    mounted() {
        this.getGroup();
        this.getData();
        this.allContactGroup();
        this.getTemplateByClassify();

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
            this.$$api_umc_configList({
                data: {
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

        allContactGroup() {
            this.$$api_umc_allContactGroup({
                data: {
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.contactGroups = data.data.list;
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

        getTemplateByClassify() {
            this.$$api_umc_getTemplateByClassify({
                data: {
                    classify: this.saveForm.classify
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.templates = data.data.list;
                        console.info(this.templates);
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
            this.saveForm.collectId = '';
            this.saveForm.group = '';
            this.saveForm.environment = '';
            this.saveForm.classify = '';
            this.saveForm.templateId = '';
            this.saveForm.contactGroupId = '';
            this.saveForm.callbackUrl = '';
        },


        saveData() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    //this.dialogLoading = true;
                    this.$$api_umc_saveConfig({
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

        dataDetail(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_configDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = data.data.alarmConfig;

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

        //获取实例名称
        getinstance() {
            var clusterId = this.saveForm.group;
            var environmentId = this.saveForm.environment;
            this.instanceData = [];

            if (environmentId == "" || clusterId == "" || clusterId == undefined|| environmentId == undefined) {
                return;
            }
            this.$$api_instanceman_instancelist({
                data: {
                    clusterId: clusterId,
                    envId: environmentId
                },
                fn: data => {
                    if (data.code == 200) {
                        this.instanceData = data.data.instancelist;
                        console.info(this.instanceData);
                        //判断要不要清空选中
                        var needClean = true;
                        for (let i = 0; i < this.instanceData.length; i++) {
                            if (this.instanceData[i].id == this.saveForm.collectId) {
                                needClean = false;
                                break;
                            }
                        }
                        if (needClean) {
                            this.saveForm.collectId = '';
                        }
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        //获取环境名称
        getenvir() {
            this.envirData = [];
            let clusterId = this.saveForm.group;
            if (clusterId == "" || clusterId == undefined) {
                return;
            }
            this.$$api_instanceman_envirlist({
                data: {
                    clusterId: clusterId
                },
                fn: data => {
                    if (data.code == 200) {
                        this.instanceData = [];
                        this.envirData = data.data.envlist;
                        console.info(this.envirData);
                        //判断要不要清空选中
                        var needClean = true;
                        for (let i = 0; i < this.envirData.length; i++) {
                            if (this.envirData[i].id == this.saveForm.environment) {
                                needClean = false;
                                break;
                            }
                        }
                        if (needClean) {
                            this.saveForm.environment = '';
                            this.saveForm.collectId = '';
                        }
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        // 获取分组名称
        getGroup() {
            this.$$api_instanceman_grouplist({
                fn: data => {
                    if (data.code == 200) {
                        this.groupData = data.data.grouplist;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },


    }
}
