import {transDate, getDay} from 'utils/'

export default {
    name: 'task',
    data() {
        return {

            //查询条件
            searchParams: {
                groupName: '',
                projectName: '',
                branchName: ''
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            buildForm: {
                group: '',
                environment: '',
                instances: [],
                branch: '',
                desc: '',
                tarType: '',
                tagOrBranch: '1',
            },
            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            //create内的下拉数据
            groupData: [],
            envirData: [],
            instanceData: [],
            branchs: [],

            //列表Data
            tableData: [],

            //字典
            dictData: new Map(),

            //详情
            detailVisible: false,
            detailForm: {
                group: '',
                branch: '',
                taskDetails: [],
                result: ''
            },

        }
    },

    mounted() {
        this.getData();
        this.getGroup();

        const dic = new Map();
        dic.set(1, "钩子触发");
        dic.set(2, "手动部署");
        dic.set(3, "回滚");
        this.dictData.set("ci_task_type", dic);

        const dic2 = new Map();
        dic2.set(0, "创建");
        dic2.set(1, "进行");
        dic2.set(2, "成功");
        dic2.set(3, "失败");
        dic2.set(4, "超时");
        this.dictData.set("ci_task_status", dic2);

    },

    methods: {

        onSubmit() {
            //this.loading = true;

            this.getData();
        },

        create() {
            console.info("open create task window")
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        tellme(value) {
            console.info(value);
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        // 获取列表数据
        getData() {
            this.$$api_ci_taskList({
                data: {
                    groupName: this.searchParams.groupName,
                    projectName: this.searchParams.projectName,
                    branchName: this.searchParams.branchName,
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


        //Dict convert
        getDatagridDict(category, cellValue) {
            var dictGroup = this.dictData.get(category);
            var result = dictGroup.get(cellValue);
            //TODO add format tag
            return result;
        },

        convertType(row, column, cellValue, index) {
            return this.getDatagridDict("ci_task_type", cellValue);
        },

        convertStatus(row, column, cellValue, index) {
            return this.getDatagridDict("ci_task_status", cellValue);
        },


        //双击
        doubleClickRow(row, column, event) {
            this.detailVisible = true;
            this.$$api_ci_taskDetail({
                data: {
                    taskId: row.id,
                },
                fn: data => {
                    if (data.code == 200) {
                        this.detailForm = data.data;
                        console.info(data.data);

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

        detail(row) {
            this.doubleClickRow(row);
        },

        //获取实例名称
        getinstance() {
            var groupId = this.buildForm.group;
            var environmentId = this.buildForm.environment;
            this.instanceData = [];
            this.buildForm.instances = [];
            if (environmentId == "" || groupId == "") {
                return;
            }
            this.$$api_instanceman_instancelist({
                data: {
                    groupId: groupId,
                    envId: environmentId
                },
                fn: data => {
                    if (data.code == 200) {
                        this.instanceData = data.data.instancelist;
                        console.info(groupId);
                        console.info(environmentId);
                        console.info(data.data.instancelist);
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
            this.buildForm.environment = "";
            var groupId = this.buildForm.group;
            if (groupId == "") {
                return;
            }
            this.$$api_instanceman_envirlist({
                data: {
                    groupId: groupId
                },
                fn: data => {
                    if (data.code == 200) {
                        this.instanceData = [];
                        this.envirData = data.data.envlist;
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
            this.getBranchs();
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

        createTask() {
            console.info(this.buildForm.group);
            console.info(this.buildForm.instances.toString());
            console.info(this.buildForm.branch);
            this.dialogLoading = true;
            this.$$api_ci_createTask({
                data: {
                    appGroupId: this.buildForm.group,
                    branchName: this.buildForm.branch,
                    instances: this.buildForm.instances.toString(),
                    tarType: this.buildForm.tarType,
                },
                fn: data => {
                    this.dialogLoading = false;
                    if (data.code == 200) {
                        this.dialogVisible = false;
                        this.getData();
                        cleanBuildForm();
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
            })
        },


        getBranchs() {
            console.info(this.buildForm.group);
            console.info(this.buildForm.tagOrBranch);

            this.$$api_ci_getBranchs({
                data: {
                    appGroupId: this.buildForm.group,
                    tarOrBranch: this.buildForm.tagOrBranch,
                },
                fn: data => {
                    if (data.code == 200) {
                        console.info(this.buildForm.group);
                        this.branchs=data.data.branchNames;
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

        cleanBuildForm() {
            this.buildForm.group = '';
            this.buildForm.instances = [];
            this.buildForm.branch = '';
            this.buildForm.tarType = '';
        },

        rollbackTask(row, column, event) {
            this.$confirm('回滚操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                this.$$api_ci_rollbackTask({
                    data: {
                        taskId: row.id,
                    },
                    fn: data => {
                        if (data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.getData();
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
            }).catch(() => {
                /*this.$message({
                    type: 'info',
                    message: '已取消删除'
                });*/
            });
        },


    }
}
