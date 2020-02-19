import {transDate, getDay} from 'utils/'

export default {
    name: 'newPipeline',
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

            taskId: '',

            //弹窗表单
            buildForm: {
                id: '',
                taskName: '',
                group: '',
                envType: '',
                instances: [],
                branch: '',
                desc: '',
                providerKind: '',
                tagOrBranch: '1',
                buildCommand: '',
                preCommand: '',
                postCommand: '',
                contactGroupId: '',
                taskBuildCommands: [],
                commandOnOff:false,
                pcmId: '',
            },

            //create内的下拉数据
            groupData: [],
            envirData: [],
            instanceData: [],
            branchs: [],
            contactGroupData: [],
            isEdit: false,
            pcmData: [],

            postCommandTip: '<br/>. /etc/profile && . /etc/bashrc && . ~/.bash_profile && . ~/.bashrc && ',


            // 表单规则
            rules: {
                taskName: [
                    {required: true, message: 'Please Input taskName', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                group: [
                    {type:'number', required: true, message: 'Please select Group', trigger: 'change' },
                ],
                providerKind: [
                    {type:'number', required: true, message: 'Please select tar type', trigger: 'change' },
                ],
                instances: [
                    { validator: validateInstances,required: true, trigger: 'change' },
                ],
                branch: [
                    {required: true, message: 'Please select branch', trigger: 'change' },
                ],
                pcmId: [
                    {required: true, message: 'Please select Pcm', trigger: 'change' },
                ],
            },
            loading: false,
        }
    },

    activated() {
        this.cleanBuildForm();
        this.taskId = this.$route.query.id;

        let command = this.$route.query.command;
        if(command){
            this.buildForm.providerKind = command;
        }

        this.getGroup();
        this.groupList();
        this.getPcm();
        if(this.taskId){
            this.isEdit = true;
            this.taskDetail(this.taskId);
        }else{
            this.isEdit = false;
        }

    },

    mounted() {

    },

    methods: {
        cleanBuildForm() {
            this.buildForm = {
                id: '',
                taskName: '',
                group: '',
                envType: '',
                instances: [],
                branch: '',
                desc: '',
                providerKind: '',
                tagOrBranch: '1',
                buildCommand: '',
                preCommand: '',
                postCommand: '',
                contactGroupId: '',
                taskBuildCommands: [],
                commandOnOff:false,
                pcmId: '',
            }
        },

        groupList() {
            this.$$api_iam_groupList({
                data: {

                },
                fn: data => {
                    this.contactGroupData = data.data;
                },
            })
        },

        //获取实例名称
        getinstance() {
            let clusterId = this.buildForm.group;
            let envType = this.buildForm.envType;
            this.instanceData = [];
            if (!envType || envType == "" || !clusterId || clusterId == "") {
                return;
            }
            this.$$api_share_instances({
                data: {
                    clusterId: clusterId,
                    envType: envType
                },
                fn: data => {
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
                },
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
                    this.groupData = data.data.clusters;
                },
            })
        },

        save() {
            this.loading = true;

            this.$refs['buildForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_saveTask({
                        data: {
                            id: this.buildForm.id,
                            taskName: this.buildForm.taskName,
                            appClusterId: this.buildForm.group,
                            envType: this.buildForm.envType,
                            branchName: this.buildForm.branch,
                            instance: this.buildForm.instances,
                            providerKind: this.buildForm.providerKind,
                            branchType: this.buildForm.tagOrBranch,
                            buildCommand: this.buildForm.buildCommand,
                            preCommand: this.buildForm.preCommand,
                            postCommand: this.buildForm.postCommand,
                            contactGroupId: this.buildForm.contactGroupId,
                            taskBuildCommands: this.buildForm.taskBuildCommands,
                            pcmId: this.buildForm.pcmId,
                        },
                        fn: data => {
                            this.loading = false;
                            this.cleanBuildForm();
                            this.$router.push({path:'/ci/task'})
                        },
                        errFn: () => {
                            this.loading = false;
                        }
                    })
                } else {
                    this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        taskDetail(){
            this.getGroup();
            this.groupList();

            this.isEdit = true;
            this.dialogVisible=true;
            this.$$api_ci_taskDetail({
                data: {
                    id: this.taskId,
                },
                fn: data => {
                    this.buildForm.id=data.data.task.id;
                    this.buildForm.taskName=data.data.task.taskName;
                    this.buildForm.group=data.data.task.appClusterId;
                    this.buildForm.envType=data.data.task.envType;
                    this.buildForm.instances=data.data.instances;
                    this.buildForm.branch=data.data.task.branchName;
                    this.buildForm.providerKind=data.data.task.providerKind;
                    this.buildForm.buildCommand=data.data.task.buildCommand;
                    this.buildForm.preCommand=data.data.task.preCommand;
                    this.buildForm.postCommand=data.data.task.postCommand;
                    this.buildForm.contactGroupId=data.data.task.contactGroupId;
                    this.buildForm.taskBuildCommands=data.data.taskBuildCommands;
                    this.buildForm.commandOnOff=true;
                    this.buildForm.pcmId=data.data.task.pcmId;

                    this.getinstance();
                },
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
            })
        },

        getTaskBuildCommands(){
            if(this.isEdit){
                return;
            }
            if(!this.buildForm.group){
                return
            }
            console.info(this.buildForm.group);
            this.$$api_ci_getTaskBuildCommands({
                data: {
                    appClusterId: this.buildForm.group,
                },
                fn: data => {
                    this.buildForm.taskBuildCommands=data.data.list;
                },
            })
        },

        backToTask(){
            this.$router.push({path:'/ci/task'})
        },

        getPcm() {
            this.$$api_ci_pcmAll({
                fn: data => {
                    this.pcmData = data.data;
                },
            })
        },

    }
}
