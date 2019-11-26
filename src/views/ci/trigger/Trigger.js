import {transDate, getDay} from 'utils/'

export default {
    name: 'trigger',
    data() {
        return {

            //查询条件
            searchParams: {
                id: '',
                name: '',
                taskId: '',
                enable: '',
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
                taskId: '',
                providerKind: '',
                remark: '',
                enable: '1',
                type: '',
                cron: '',
                name: '',

                //other
                group: '',
                environment: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            //create内的下拉数据
            ProjectData: [],
            groupData: [],
            envirData: [],
            instanceData: [],
            tasksData: [],

            //列表Data
            tableData: [],

            //字典
            dictData: new Map(),

            //详情
            detailVisible: false,
            detailForm: {
                group: '',
                branch: '',
                taskInstances: [],
                result: ''
            },

            checkResult: '',

            // 表单规则
            rules: {
                name: [
                    {required: true, message: 'Please Input name', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                group: [
                    {type:'number', required: true, message: 'Plese select Group', trigger: 'change' },
                ],
                taskId: [
                    {type:'number', required: true, message: 'Plese select task', trigger: 'change' },
                ],
                type: [
                    {type:'number', required: true, message: 'Plese select type', trigger: 'change' },
                ],

            },

        }
    },

    mounted() {
        this.getData();
        this.getProject();
        this.getGroup();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        //add
        addTrigger() {
            this.getProject();
            this.getGroup();

            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        //edit
        editTrigger(row) {
            this.getProject();
            this.getGroup();
            if (!row.id) {
                return;
            }
            this.dialogVisible = true;
            this.dialogTitle = '编辑';
            this.$$api_ci_triggerDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    if (data.code == 200) {
                        this.saveForm.id = data.data.id;
                        this.saveForm.taskId = data.data.taskId;
                        this.saveForm.name = data.data.name;
                        this.saveForm.remark = data.data.remark;
                        this.saveForm.enable = data.data.enable;
                        this.saveForm.type = data.data.type;
                        this.saveForm.cron = data.data.cron;

                        this.saveForm.group = data.data.appClusterId;
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

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
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

            this.$$api_ci_triggerList({
                data: {
                    id: this.searchParams.id,
                    name: this.searchParams.name,
                    taskId: this.searchParams.taskId,
                    enable: this.searchParams.enable,
                    startDate: start,
                    endDate: end,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.total = data.data.total;
                        this.tableData = data.data.records;
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

        // 获取分组名称
        getProject() {
            this.$$api_ci_allProject({
                fn: data => {
                    if (data.code == 200) {
                        this.ProjectData = data.data.list;
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

        saveTrigger() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.dialogLoading = true;
                    this.$$api_ci_saveTrigger({
                        data: {
                            id: this.saveForm.id,
                            appClusterId: this.saveForm.group,
                            taskId: this.saveForm.taskId,
                            name: this.saveForm.name,
                            remark: this.saveForm.remark,
                            enable: this.saveForm.enable,
                            type: this.saveForm.type,
                            cron: this.saveForm.cron,
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
                            this.$alert('访问失败，请稍后重试！2', '错误', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        cleanSaveForm() {
            this.saveForm.id = '';
            this.saveForm.group = '';
            this.saveForm.taskId = '';
            this.saveForm.name = '';
            this.saveForm.remark = '';
            this.saveForm.enable = '1';
            this.saveForm.group = '';
            this.saveForm.environment = '';

            this.saveForm.type = '';
            this.saveForm.cron = '';
        },

        delTrigger(row) {
            if (!row.id) {
                return;
            }
            this.$$api_ci_delTrigger({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        //delete success
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

        // 获取分组名称
        getGroup() {
            this.$$api_share_clusters({
                fn: data => {
                    if (data.code == 200) {
                        this.groupData = data.data.clusters;
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


        checkCron() {
            this.$$api_ci_checkCron({
                data: {
                    expression: this.saveForm.cron,
                    numTimes: 5,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        //delete success
                        if (data.data.validExpression) {
                            this.checkResult = data.data.nextExecTime;
                        } else {
                            this.checkResult = 'Expression unvalid';
                        }
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


        getTasksByAppClusterId() {
            if(!this.saveForm.group){
                return;
            }
            this.$$api_ci_getTasksByAppClusterId({
                data: {
                    appClusterId: this.saveForm.group,
                },
                fn: data => {
                    this.tasksData = data.data;
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        convertType(row) {
            if (row.type == 4) {
                return '调度';
            }
            if (row.type == 1) {
                return '钩子';
            }
            return '--';
        },

        convertEnableValue(row){
            if (row.enable == 0) {
                return '停用';
            }
            if (row.enable == 1) {
                return '启用';
            }

        },

        convertEnableType(row){
            if (row.enable == '0') {
                return 'danger';
            }
            if (row.enable == '1') {
                return 'success';
            }
            return 'warning';
        },


    }
}
