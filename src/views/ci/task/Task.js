import {transDate, getDay} from 'utils/'
import fa from "element-ui/src/locale/lang/fa";

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
            isEdit: false,
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
                buildCommand: '',
                preCommand: '',
                postCommand: '',
                contactGroupId: '',
                taskBuildCommands: [],
                commandOnOff:false,
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

            contactGroupData: [],

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

            //before create Build Task
            confirmDialog: false,

            confirmForm:{
                taskId: '',
                trackId: '',
                trackType: '',
                remark: '',
            },



        }
    },

    mounted() {
        this.getData();
        this.getGroup();
        this.groupList();

    },

    methods: {
        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        add(command) {
            this.getGroup();
            this.groupList();

            this.isEdit = false;
            this.cleanBuildForm();

            if(command==''){
                this.dialogVisible = true;
                this.dialogTitle = '新增';
            }else if (command==''){
                this.dialogVisible = true;
                this.dialogTitle = '新增';
            }else{
                this.dialogVisible = true;
                this.dialogTitle = '新增';
            }
            //TODO ......
            this.buildForm.tarType = command;

        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        groupList() {
            this.$$api_share_groupList({
                data: {

                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.contactGroupData = data.data;
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


        //获取实例名称
        getinstance() {
            let clusterId = this.buildForm.group;
            let envType = this.buildForm.environment;
            this.instanceData = [];
            if (!envType||envType == "" || !clusterId||clusterId == "") {
                return;
            }
            this.$$api_share_instances({
                data: {
                    clusterId: clusterId,
                    envType: envType
                },
                fn: data => {
                    if (data.code == 200) {
                        this.instanceData = data.data.instances;
                        //判断要不要清空选中
                        let needClean = true;
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
        onChangeCluster() {
            this.getBranchs();
            this.getTaskBuildCommands();
            this.getinstance();
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
                            instance: this.buildForm.instances,
                            tarType: this.buildForm.tarType,
                            branchType: this.buildForm.tagOrBranch,
                            buildCommand: this.buildForm.buildCommand,
                            preCommand: this.buildForm.preCommand,
                            postCommand: this.buildForm.postCommand,
                            contactGroupId: this.buildForm.contactGroupId,
                            taskBuildCommands: this.buildForm.taskBuildCommands,


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
            this.getGroup();
            this.groupList();

            this.isEdit = true;
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
                        this.buildForm.buildCommand=data.data.task.buildCommand;
                        this.buildForm.preCommand=data.data.task.preCommand;
                        this.buildForm.postCommand=data.data.task.postCommand;
                        this.buildForm.contactGroupId=data.data.task.contactGroupId;
                        this.buildForm.taskBuildCommands=data.data.taskBuildCommands;

                        this.buildForm.commandOnOff=true;
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
                    this.branchs=data.data.branchNames;
                },
                errFn: (data) => {
                    this.$alert(data.message, '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        getTaskBuildCommands(){
            if(this.isEdit){
                return;
            }
            console.info(this.buildForm.group);
            this.$$api_ci_getTaskBuildCommands({
                data: {
                    appClusterId: this.buildForm.group,
                },
                fn: data => {
                    this.buildForm.taskBuildCommands=data.data.list;
                },
                errFn: (data) => {
                    this.$alert(data.message, '错误', {
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
            this.buildForm.buildCommand = '';
            this.buildForm.preCommand = '';
            this.buildForm.postCommand = '';
            this.buildForm.contactGroupId='';
            this.buildForm.taskBuildCommands=[];
            this.buildForm.commandOnOff = false;
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


        beforeRunTask(row){
            this.cleanConfirm();
            if(!row.id){
                return;
            }
            this.confirmForm.taskId = row.id;
            this.confirmDialog = true;
        },

        cleanConfirm() {
            this.confirmForm = {
                taskId: '',
                trackId: '',
                trackType: '',
                remark: '',
            };
        },

        runTask(){
                this.$$api_ci_runTask({
                    data: this.confirmForm,
                    fn: data => {
                        this.confirmDialog = false;
                        this.$confirm('Create Task Success,jump to task list?',  {
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            type: 'success'
                        }).then(() => {
                            this.$router.push('/ci/taskhis');
                        }).catch(() => {
                            //do nothing
                        });

                    },
                    errFn: (data) => {
                        this.confirmDialog = false;
                        if(data&&data.message){
                            this.$alert(data.message, '错误', {
                                confirmButtonText: '确定',
                            });
                        }else{
                            this.$alert('访问失败，请稍后重试！', '错误', {
                                confirmButtonText: '确定',
                            });
                        }

                    }
                })




        }


    }
}
