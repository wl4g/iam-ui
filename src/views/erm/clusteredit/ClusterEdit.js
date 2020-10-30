import {transDate, getDay} from 'utils/'

export default {
    name: 'newPipeline',
    data() {
        return {

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                remark: '',
                endpoint: '',
                deployType: '',
                sshId: '',

                environments:[
                    {envType: 'dev',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                    {envType: 'fat',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                    {envType: 'uat',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                    {envType: 'pro',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                ],

                // registryAddress: '',
                // authConfigModel:{
                //     username: '',
                //     password: '',
                // },

                //instances: [],
                //instanceDtoModels:[],
            },

            isEdit: false,
            //allHost
            allHost: [],
            sshs: [],
            dockerRepositorys: [],
            repositoryProjects: [],

            searchRepositoryProjectsLoading: false,

            textDialogVisible: false,
            tempRow: null,
            tempText: '',
            tempTip: '',
            isPub: false,

            rules: {
                name: [{ required: true, message: 'Please input name', trigger: 'blur' }],

                envType: [
                    {required: true, message: 'Please select Env', trigger: 'change' },
                ],
                sshId: [
                    {required: true, message: 'Please select host', trigger: 'change' },
                ],
                endpoint: [
                    {required: true, message: 'Please input endpoint', trigger: 'change' },
                ],
            },
            loading: false,

            tipDialogVisible: false,

        }
    },

    activated() {
        this.getAllHost();
        this.getSshs();
        this.cleanSaveForm();
        this.getDockerRepositorys();

        const id = this.$route.query.id;
        if(id){// edit
            this.isEdit = true;
            this.saveForm.id = id;
            this.dataDetail(id);
        }else{// insert
            this.isEdit = false;
        }

    },

    mounted() {

    },

    methods: {

        back(){
            this.$router.push({path: this.permitutil.getRoutePathByPermission('erm:cluster')})
        },
        cleanSaveForm() {
            this.saveForm={
                id: '',
                name: '',
                remark: '',
                endpoint: '',
                deployType: '',
                sshId: '',

                environments:[
                    {envType: 'dev',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                    {envType: 'fat',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                    {envType: 'uat',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                    {envType: 'pro',runCommand: '', enable:0, configContent:'',repositoryId: '',repositoryNamespace: '',dockerRepository:{authConfigModel:{}}},
                ],
            }

        },

        //获取主机列表
        getAllHost() {
            this.$$api_erm_allHost({
                fn: data => {
                    this.allHost = data.data;
                }
            })
        },


        connectTest(row){
            this.$$api_erm_connectTest({
                data: {
                    hostId: row.hostId,
                    sshUser: row.sshUser,
                    sshKey: row.sshKey,
                },
                fn: data => {
                    this.$message({
                        message: 'Connect Success',
                        type: 'success'
                    });
                }
            });
        },

        saveData() {
            this.dialogLoading = true;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_erm_saveCluster({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogLoading = false;
                            this.dialogVisible = false;
                            this.cleanSaveForm();
                            this.back();
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                        }
                    });
                }else {
                    this.dialogLoading = false;
                }
            })
        },

        dataDetail(id) {
            this.$$api_erm_clusterDetail({
                data: {
                    id: id,
                },
                fn: data => {
                    if(data.data.deployType){
                        data.data.deployType = data.data.deployType.toString();
                    }
                    for(let i in data.data.environments){
                        if(!data.data.environments[i].dockerRepository){
                            data.data.environments[i].dockerRepository = {authConfigModel:{}};
                        }
                        if(!data.data.environments[i].dockerRepository.authConfigModel){
                            data.data.environments[i].dockerRepository.authConfigModel = {};
                        }
                    }
                    this.saveForm = data.data;
                }
            });
        },

        getSshs() {
            this.$$api_erm_getSshForSelect({
                data: {},
                fn: data => {
                    if(data.data){
                        this.sshs = data.data;
                    }
                },
            });
        },

        getDockerRepositorys() {
            this.$$api_erm_getDockerRepositoryForSelect({
                data: {},
                fn: data => {
                    if(data.data){
                        this.dockerRepositorys = data.data;
                    }
                },
            });
        },

        toInstancesPage(envType){
            this.$router.push({path: this.permitutil.getRoutePathByPermission('erm:instance'),query: {
                clusterId: this.saveForm.id,envType:envType
                }})
        },

        getRepositoryProjects(repositoryId, address, name, cb){
            this.searchRepositoryProjectsLoading = true;
            this.$$api_erm_getRepositoryProjects({
                data: {
                    id: repositoryId,
                    address: address,
                    name: name,
                },
                fn: data => {
                    this.searchRepositoryProjectsLoading = false;
                    if(data.data){
                        // this.repositoryProjects = data.data;
                        // let results = [];
                        // for(let i in data.data){
                        //     results.push({value: data.data[i].name});
                        // }
                        if(!data.data || !(data.data instanceof Array)){
                            data.data = [];
                        }
                        cb(data.data);
                    }
                },
                errFn: () => {
                    this.searchRepositoryProjectsLoading = false;
                },

            });
        }


    }
}
