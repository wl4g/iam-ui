import {transDate, getDay} from 'utils/'

export default {
    name: 'newPipeline',
    data() {
        var validateInstances = (rule, value, callback) => {
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
                //projectId: '',
                appClusterId: '',
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

                //
                projectName: '',
                assetsPath: '',
                assetsPath3: '{clusterName}-{version}-bin.tar',
                parentAppHome: '',

            },

            //create内的下拉数据
            envirData: [],
            instanceData: [],
            instanceData2: [],
            branchs: [],
            contactGroupData: [],
            isEdit: false,
            pcmData: [],
            //projectData:[],
            clusterData:[],

            postCommandTip: '<br/>. /etc/profile && . /etc/bashrc && . ~/.bash_profile && . ~/.bashrc && ',

            gotoProjectSettingDialog: false,

            // 表单规则
            rules: {
                taskName: [
                    {required: true, message: 'Please Input taskName', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                appClusterId: [
                    {required: true, message: 'Please select Cluster', trigger: 'change' },
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
        const from = this.$route.query.from;
        if(!from || from==='task'){
            this.cleanBuildForm();
            this.taskId = this.$route.query.id;

            let command = this.$route.query.command;
            if(command){
                this.buildForm.providerKind = command;
            }

            this.getClusters();
            this.groupList();
            this.getPcm();
            //this.getProject();
            if(this.taskId){
                this.isEdit = true;
                this.taskDetail(this.taskId);
            }else{
                this.isEdit = false;
            }
        }else{
            this.gotoProjectSettingDialog = false;
            this.onChangeCluster(this.buildForm.appClusterId);
        }
    },

    mounted() {

    },

    methods: {
        cleanBuildForm() {
            this.buildForm = {
                id: '',
                appClusterId: '',
                taskName: '',
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

                projectName: '',
                assetsPath: '',
                assetsPath3: '{clusterName}-{version}-bin.tar',
                parentAppHome: '',
            }
        },

        refreshClusterData(){
            //this.getProject();
            this.getClusters();
        },
        refreshPcmtData(){
            this.getPcm();
        },
        refreshInstanceData(){
            this.getinstance();
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

        // 获取分组名称
        getClusters() {
            this.$$api_erm_clusters({
                fn: data => {
                    this.clusterData = data.data.clusters;
                },
            })
        },

        //获取实例名称
        getinstance() {
            let clusterId = this.buildForm.appClusterId;
            let envType = this.buildForm.envType;
            this.instanceData = [];
            if (!envType || envType == "" || !clusterId || clusterId == "") {
                return;
            }
            this.$$api_erm_instances({
                data: {
                    clusterId: clusterId,
                    envType: envType
                },
                fn: data => {
                    this.instanceData = data.data.instances;
                    this.instanceData2 = [];
                    for (let i = 0; i < this.instanceData.length; i++) {
                        this.instanceData2.push({
                            label: this.instanceData[i].hostname,
                            key: this.instanceData[i].id,
                        });
                    }


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
        onChangeCluster(id) {
            this.getBranchs();
            this.getinstance();

            this.buildForm.assetsPath3 = '/'+this.getClusterById(id).name + '-{version}-bin.tar';
            this.getProjectByAppClusterId();
        },

        getClusterById(id){
            for(let i in this.clusterData){
                if(this.clusterData[i].id === id){
                    return this.clusterData[i];
                }
            }
        },


        save() {
            this.loading = true;
            this.$refs['buildForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_saveTask({
                        data: {
                            id: this.buildForm.id,
                            taskName: this.buildForm.taskName,
                            //projectId: this.buildForm.projectId,
                            appClusterId: this.buildForm.appClusterId,

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

                            assetsPath: this.buildForm.assetsPath,
                            parentAppHome: this.buildForm.parentAppHome,
                        },
                        fn: data => {
                            this.loading = false;
                            this.cleanBuildForm();
                            this.$router.push({path:'/ci/task'})
                        },
                        errFn: (err) => {
                            this.loading = false;
                            this.$message.error(err.message);
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
            // this.getGroup();
            // this.groupList();

            this.isEdit = true;
            this.dialogVisible=true;
            this.$$api_ci_taskDetail({
                data: {
                    id: this.taskId,
                },
                fn: data => {
                    this.buildForm.id=data.data.task.id;
                    this.buildForm.taskName=data.data.task.taskName;
                    //this.buildForm.projectId=data.data.task.projectId;
                    this.buildForm.appClusterId=data.data.task.appClusterId;

                    this.buildForm.envType=data.data.task.envType;
                    this.buildForm.instances=data.data.instances;
                    this.buildForm.branch=data.data.task.branchName;
                    this.buildForm.providerKind=data.data.task.providerKind;
                    this.buildForm.tagOrBranch=data.data.task.branchType;
                    this.buildForm.buildCommand=data.data.task.buildCommand;
                    this.buildForm.preCommand=data.data.task.preCommand;
                    this.buildForm.postCommand=data.data.task.postCommand;
                    this.buildForm.contactGroupId=data.data.task.contactGroupId;
                    this.buildForm.taskBuildCommands=data.data.taskBuildCommands;
                    this.buildForm.commandOnOff=true;
                    this.buildForm.pcmId=data.data.task.pcmId;
                    this.buildForm.assetsPath=data.data.task.assetsPath;
                    this.buildForm.parentAppHome=data.data.task.parentAppHome;

                    this.getProjectByAppClusterId();
                    this.getinstance();
                    this.getBranchs();

                    this.buildForm.assetsPath3 = '/'+this.getClusterById(this.buildForm.appClusterId).name + '-{version}-bin.tar';
                },
            })

        },

        getBranchs() {
            this.branchs=[];
            if(this.buildForm.appClusterId==''){
                return;
            }
            this.$$api_ci_getBranchs({
                data: {
                    appClusterId: this.buildForm.appClusterId,
                    tagOrBranch: this.buildForm.tagOrBranch,
                },
                fn: data => {
                    this.branchs=data.data.branchNames;
                },
                errFn: data => {
                    this.gotoProjectSettingDialog = true;
                }
            });
            this.getTaskBuildCommands();
        },

        getProjectByAppClusterId(){
            if(this.buildForm.appClusterId==''){
                return;
            }
            this.$$api_ci_getProjectByAppClusterId({
                data: {
                    appClusterId: this.buildForm.appClusterId,
                },
                fn: data => {
                    this.buildForm.projectName=data.data.projectName;
                },
            })
        },

        getTaskBuildCommands(){
            if(!this.buildForm.appClusterId){
                return
            }
            this.$$api_ci_getTaskBuildCommands({
                data: {
                    taskId: this.buildForm.id,
                    appClusterId: this.buildForm.appClusterId,
                    tagOrBranch: this.buildForm.tagOrBranch,
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

        gotoProjectSetting(){
            this.$router.push({path:'/ci/project',query: {appClusterId: this.buildForm.appClusterId}})
            this.gotoProjectSettingDialog = false;
        },

    }
}
