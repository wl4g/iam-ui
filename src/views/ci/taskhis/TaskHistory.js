import {transDate, getDay} from 'utils/'

export default {
    name: 'taskhis',
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

            logIndex: 0,
            logThread: 0,
        }
    },

    mounted() {

        this.getGroup();

        const dic = new Map();
        dic.set(1, "Hook");
        dic.set(2, "Manual");
        dic.set(3, "Rollback");
        this.dictData.set("ci_task_type", dic);

        const dic2 = new Map();
        dic2.set(0, "New");
        dic2.set(1, "Running");
        dic2.set(2, "Success");
        dic2.set(3, "Failed");
        dic2.set(4, "Timeout");
        this.dictData.set("ci_task_status", dic2);

    },

    activated() {
        //alert("into activated");
        this.getData();
    },

    methods: {
        onSubmit() {
            //this.loading = true;
            this.getData();
        },
        create() {
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },
        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },
        // 获取列表数据
        getData() {
            this.$$api_ci_taskHisList({
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
        convertStatusValue(row){
            switch(row.status){
            case 0:
                return { img: 'static/images/state/gray_normal.png', text: 'New' };
            case 1:
                return { img: 'static/images/state/red_run.gif', text: 'Running' };
            case 2:
                return { img: 'static/images/state/green_ok.png', text: 'Success' };
            case 3:
                return { img: 'static/images/state/red_fail.png', text: 'Failed' };
            case 4:
                return { img: 'static/images/state/red_fail.png', text: 'Timeout' };
            case 5:
                return { img: 'static/images/state/red_fail.png', text: 'Stop' };
            default:
                return '--';
            }
        },
        convertStatusType(row){
            if (row.status == 0) {
                return 'info';
            }
            if (row.status == 1) {
                return '';
            }
            if (row.status == 2) {
                return 'success';
            }
            if (row.status == 3) {
                return 'danger';
            }
            if (row.status == 4) {
                return 'danger';
            }
            if (row.status == 5) {
                return 'danger';
            }
            return 'warning';
        },
        //双击
        doubleClickRow(row, column, event) {
            this.detailVisible = true;
            let that = this;
            this.$$api_ci_taskHisDetail({
                data: {
                    taskId: row.id,
                },
                fn: data => {
                    if (data.code == 200) {
                        this.detailForm.group = data.data.group;
                        this.detailForm.branch = data.data.branch;
                        this.detailForm.taskDetails = data.data.taskDetails;
                        if(data.data.result){
                            this.detailForm.result = data.data.result;
                        }else{
                            this.detailForm.result = '';
                        }

                        if(!data.data.result){
                            that.readLogTask(row);
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
        detail(row) {
            this.doubleClickRow(row);
        },

        //log part
        readLogTask(row){
            let that = this;
            this.stopReadLogTask();
            console.info(this.detailForm.result);
            this.detailForm.result = '';
            this.logIndex = 0;
            this.logThread = self.setInterval(function () {
                that.readLog(row.id);
            }, 1 * 1000);

        },

        stopReadLogTask(){
            console.info("stop read log task");
            window.clearInterval(this.logThread);
        },

        readLog(taskHisId){
            console.debug("read log taskHisId="+taskHisId+" index="+this.logIndex);
            var that = this;
            this.$$api_ci_taskHisReadLog({
                data: {
                    taskHisId: taskHisId,
                    index: that.logIndex,
                    size:1000,
                },
                fn: data => {
                    if (data.code == 200) {
                        let logs = data.data.data.lines;
                        if(data.data.data.isEnd==true){
                            console.info("into stop log task");
                            this.stopReadLogTask();
                        }
                        console.debug(logs);
                        for(let i in logs) {
                            //that.logIndex = that.logIndex+1;
                            //console.log(logs[i]);
                            that.detailForm.result = that.detailForm.result+logs[i]+"\n";
                            if(logs[i].indexOf("[EOF]>") != -1){
                                this.stopReadLogTask();
                            }
                            that.scroll();
                        };
                        that.logIndex = data.data.data.pointer;
                    } else {
                        /*this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });*/
                    }
                },
                errFn: () => {
                    /*this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });*/
                }
            })
        },

        //滚动
        scroll() {
            this.$nextTick(() => {
                //console.info("into scroll");
                let div = document.querySelector(".mytextarea2 .el-textarea__inner");
                //console.info(div);
                div.scrollTop = div.scrollHeight;
            })
        },

        stopTask(id){
            if(!id){
                return;
            }
            this.$confirm('Stop task confirm', {
                confirmButtonText: 'ok',
                cancelButtonText: 'cancel',
                type: 'info'
            }).then(() => {
                this.$$api_ci_stopTask({
                    data: {
                        taskHisId: id,
                    },
                    fn: data => {
                        if (data.code == 200) {
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
                //do nothing
            });
        },


        //获取实例名称
        getinstance() {
            var clusterId = this.buildForm.group;
            var environmentId = this.buildForm.environment;
            this.instanceData = [];
            this.buildForm.instances = [];
            if (environmentId == "" || clusterId == "") {
                return;
            }
            this.$$api_instance_instancelist({
                data: {
                    clusterId: clusterId,
                    envId: environmentId
                },
                fn: data => {
                    if (data.code == 200) {
                        this.instanceData = data.data.instancelist;
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
            var clusterId = this.buildForm.group;
            if (clusterId == "") {
                return;
            }
            this.$$api_instance_envirlist({
                data: {
                    clusterId: clusterId
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
            this.$$api_instance_grouplist({
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
            this.dialogLoading = true;
            this.$$api_ci_createTaskHis({
                data: {
                    appClusterId: this.buildForm.group,
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
            this.$$api_ci_getBranchs({
                data: {
                    appClusterId: this.buildForm.group,
                    tarOrBranch: this.buildForm.tagOrBranch,
                },
                fn: data => {
                    if (data.code == 200) {
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

                this.$$api_ci_rollbackTaskHis({
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
    },

    //离开前清除定时任务
    beforeRouteLeave(to,from,next){
        console.info("leave , stop the thread");
        this.stopReadLogTask();
        next();
    },


}
