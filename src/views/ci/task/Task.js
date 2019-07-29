import {transDate, getDay} from 'utils/'

export default {
    name: 'task',
    data() {
        return {

            //查询条件
            searchParams: {
                id: '',
                taskName: '',
                groupName: '',
                projectName: '',
                branchName: '',
                tarType:'',
                startDate:'',
                endDate:'',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            buildForm: {
                id: '',
                taskName: '',
                group: '',
                environment: '',
                instances: [],
                branch: '',
                desc: '',
                tarType: '',
                tagOrBranch: '1',

                preCommand: '',
                postCommand: '',
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


        }
    },

    mounted() {
        this.getData();
        this.getGroup();

    },

    methods: {
        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        add() {
            console.info("open create taskhis window")
            this.cleanBuildForm();
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

                    id: this.searchParams.id,
                    taskName: this.searchParams.taskName,

                    groupName: this.searchParams.groupName,
                    projectName: this.searchParams.projectName,
                    branchName: this.searchParams.branchName,

                    tarType: this.searchParams.tarType,
                    startDate: this.searchParams.startDate,
                    endDate: this.searchParams.endDate,

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


        convertTarType(row, column, cellValue, index) {
            if(cellValue=="1"){
                return "tar";
            }else if(cellValue=="2"){
                return "jar";
            }else if(cellValue=="3"){
                return "docker";
            }else{

            }
        },

        //获取实例名称
        getinstance() {
            var groupId = this.buildForm.group;
            var environmentId = this.buildForm.environment;
            this.instanceData = [];

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
                        //判断要不要清空选中
                        var needClean = true;
                        console.info("lenght_ ins:" + this.instanceData.length);
                        for (let i = 0; i < this.instanceData.length; i++) {
                            console.info("check:" + this.instanceData[i].id);
                            console.info("check2:" + this.buildForm.instances);
                            if (this.instanceData[i].id == this.buildForm.instances[0]) {
                                needClean = false;
                                break;
                            }
                        }
                        if (needClean) {
                            this.buildForm.instances = [];
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
                        //判断要不要清空选中
                        var needClean = true;
                        console.info("lenght:" + this.envirData.length);
                        for (let i = 0; i < this.envirData.length; i++) {
                            if (this.envirData[i].id == this.buildForm.environment) {
                                needClean = false;
                                break;
                            }
                        }
                        if (needClean) {
                            this.buildForm.environment = "";
                            this.buildForm.instances = [];
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

        save() {
            console.info(this.buildForm.group);
            console.info(this.buildForm.instances.toString());
            console.info(this.buildForm.branch);

            this.dialogLoading = true;
            this.$$api_ci_saveTask({
                data: {
                    id: this.buildForm.id,
                    taskName: this.buildForm.taskName,
                    appGroupId: this.buildForm.group,
                    branchName: this.buildForm.branch,
                    instance: this.buildForm.instances.toString(),
                    tarType: this.buildForm.tarType,
                    branchType: this.buildForm.tagOrBranch,
                    preCommand: this.buildForm.preCommand,
                    postCommand: this.buildForm.postCommand,
                },
                fn: data => {
                    this.dialogLoading = false;
                    if (data.code == 200) {
                        this.dialogVisible = false;
                        this.getData();
                        this.cleanBuildForm();
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

        taskDetail(row){
            this.dialogVisible=true;
            this.$$api_ci_taskDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    if (data.code == 200) {
                        this.buildForm.id=data.data.task.id;
                        this.buildForm.taskName=data.data.task.taskName;
                        this.buildForm.group=data.data.task.appGroupId;

                        this.buildForm.environment=data.data.envId;
                        console.info(data.data.envId+"into edit"+this.buildForm.environment)

                        this.buildForm.instances=data.data.instances;
                        this.buildForm.branch=data.data.task.branchName;
                        this.buildForm.tarType=data.data.task.tarType;
                        this.buildForm.preCommand=data.data.task.preCommand;
                        this.buildForm.postCommand=data.data.task.postCommand;
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


        getBranchs() {
            this.branchs=[];
            if(this.buildForm.group==''){
                return;
            }
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

        delTask(row) {
            this.$$api_ci_delTask({
                data: {
                    id: row.id,
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
        },

        cleanBuildForm() {
            this.buildForm.id = '';
            this.buildForm.taskName = '';
            this.buildForm.group = '';
            this.buildForm.environment = '';
            this.buildForm.instances = [];
            this.buildForm.branch = '';
            this.buildForm.tarType = '';
            this.buildForm.tagOrBranch = '1';
            this.buildForm.preCommand = '';
            this.buildForm.postCommand = '';
        },

        countInstance(row){
            //return "1";
            return row.instances.length
        },

        instances2Str(row){
            var result = "";
            for(var i=0;i<row.instances.length;i++){
                result += row.instances[i].remark+"\n";
            }
            return result;
        },

        runTask(row){
            if(!row.id){
                return;
            }
            this.$$api_ci_runTask({
                data: {
                    taskId: row.id,
                },
                fn: data => {
                    if (data.code == 200) {
                        this.$alert('创建任务成功', '信息', {
                            confirmButtonText: '确定'
                        });
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
        }


    }
}
