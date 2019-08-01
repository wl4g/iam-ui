import {transDate, getDay} from 'utils/'

export default {
    name: 'task',
    data() {

        var validateInstances = (rule, value, callback) => {
            console.info(value.length);
            if (value.length<=0) {
                callback(new Error('Instances is Empty'));
            } else {
                callback();
            }

        };

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

            // 表单规则
            rules: {
                taskName: [
                    {required: true, message: 'Please Input taskName', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                group: [
                    {type:'number', required: true, message: 'Plese select Group', trigger: 'change' },
                ],
                tarType: [
                    {type:'number', required: true, message: 'Plese select tar type', trigger: 'change' },
                ],
                instances: [
                    { validator: validateInstances,required: true, trigger: 'change' },
                ],
                branch: [
                    {required: true, message: 'Plese select branch', trigger: 'change' },
                ],
            },

            postCommandTip: '<br/>. /etc/profile && . /etc/bashrc && . ~/.bash_profile && . ~/.bashrc && ',


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
            this.cleanBuildForm();
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

            var start = '';
            var end = '';
            if(this.searchParams.startDate!=''){
                start = this.getDate(this.searchParams.startDate);
            }
            if(this.searchParams.endDate!=''){
                end = this.getDate(this.searchParams.endDate);
            }

            this.$$api_ci_taskList({
                data: {

                    id: this.searchParams.id,
                    taskName: this.searchParams.taskName,

                    groupName: this.searchParams.groupName,
                    projectName: this.searchParams.projectName,
                    branchName: this.searchParams.branchName,

                    tarType: this.searchParams.tarType,
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
            var clusterId = this.buildForm.group;
            var environmentId = this.buildForm.environment;
            this.instanceData = [];

            if (environmentId == "" || clusterId == "") {
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
                        //判断要不要清空选中
                        var needClean = true;
                        for (let i = 0; i < this.instanceData.length; i++) {
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
            var clusterId = this.buildForm.group;
            if (clusterId == "") {
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
                        //判断要不要清空选中
                        var needClean = true;
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
            this.$refs['buildForm'].validate((valid) => {
                if (valid) {
                    this.dialogLoading = true;
                    this.$$api_ci_saveTask({
                        data: {
                            id: this.buildForm.id,
                            taskName: this.buildForm.taskName,
                            appClusterId: this.buildForm.group,
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
                        this.buildForm.group=data.data.task.appClusterId;
                        this.buildForm.environment=data.data.envId;
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
