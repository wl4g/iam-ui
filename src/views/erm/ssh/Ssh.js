import {transDate, getDay} from 'utils/'
export default {
    name: 'host',
    components: {},
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                authType: '',
                username: '',
                password: '',
                sshKey: '',
                sshKeyPub: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            testConnectDialogVisible: false,
            hosts: [],
            testConnect: {
                hostId: '',
                ssh: {},
            },
            connecting: false,

            // 表单规则
            rules: {
                name: [
                    {required: true, message: 'Please Input name', trigger: 'blur' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                username: [
                    {required: true, message: 'Please Input name', trigger: 'blur' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
            },
            loading: false
        }
    },

    mounted() {
        this.getData();
        this.allHost();
    },

    methods: {

        onSubmit() {
            this.getData();
        },

        currentChange(i) {
            this.pageNum = i;
            this.getData();
        },

        addData() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = 'Add SSH';
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_erm_sshList({
                data: {
                    name: this.searchParams.name,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.loading = false;
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },

        cleanSaveForm() {
            this.saveForm = {
                id: '',
                name: '',
                authType: '',
                username: '',
                password: '',
                sshKey: '',
                sshKeyPub: '',
            };
        },

        saveData() {
            this.dialogLoading = true;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_erm_saveSsh({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogLoading = false;
                            this.dialogVisible = false;
                            this.getData();
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                        }
                    });
                }else {
                    this.dialogLoading = false;
                }
            });
        },

        editData(row) {
            if (!row.id) {
                return;
            }
            this.cleanSaveForm();
            this.$$api_erm_sshDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    this.saveForm = data.data;
                },
            });
            this.dialogVisible = true;
            this.dialogTitle = 'Configure SSH';
        },


        delData(row) {
            if (!row.id) {
                return;
            }
            this.$confirm('Confirm?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_erm_delSsh({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        sshKeyPubTip(){
            const sshUser = this.saveForm.username;
            const sshKeyPub = this.saveForm.sshKeyPub;
            if(!sshUser){
                return '用户为空，无法生成参考命令';
            }
            if(!sshKeyPub){
                return '请输入公钥'
            }
            var command = 'su '+sshUser+'\n' + 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo "'+sshKeyPub+'" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys';
            return  command
        },

        generateSshKey(){
            this.$$api_erm_generateSshKeyPair({
                data: {},
                fn: data => {
                    this.saveForm.sshKey = data.data.privateKey;
                    this.saveForm.sshKeyPub = data.data.publicKey;
                    this.$message({
                        message: 'Generate SSH Key Pair Success',
                        type: 'success'
                    });
                }
            })
        },

        allHost() {
            this.$$api_erm_allHost({
                data: {},
                fn: data => {
                    if(data.data){
                        this.hosts = data.data;
                    }
                },
            });
        },

        openTestConnect(row){
            this.testConnect.ssh = row;
            this.testConnectDialogVisible = true;
        },

        testConnecting(){
            this.$$api_erm_connectTest({
                data: {
                    hostId: this.testConnect.hostId,
                    sshUser: this.testConnect.ssh.username,
                    sshKey: this.testConnect.ssh.sshKey,
                },
                fn: data => {
                    this.$message({
                        message: 'Connect Success',
                        type: 'success'
                    });
                },
            });
        },

        copySsh(row){
            if (!row.id) {
                return;
            }
            this.cleanSaveForm();
            this.$$api_erm_sshDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    this.saveForm = data.data;
                    this.saveForm.id = '';
                },
            });
            this.dialogVisible = true;
            this.dialogTitle = 'Add SSH';
        },

        back(){
            this.$router.push({ path: this.permitutil.getRoutePathByPermission('erm:host') })
        },



    }
}
