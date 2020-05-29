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
                instances: [],
            },

            isEdit: false,
            //allHost
            allHost: [],

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
                hostId: [
                    {required: true, message: 'Please select host', trigger: 'change' },
                ],
                endpoint: [
                    {required: true, message: 'Please input endpoint', trigger: 'change' },
                ],
                sshUser: [
                    {required: true, message: 'Please input sshUser', trigger: 'change' },
                ],
                sshKey: [
                    {required: true, message: 'Please input sshUser', trigger: 'change' },
                ],
                sshKeyPub: [
                    {required: true, message: 'Please input sshUser', trigger: 'change' },
                ],
            },
            loading: false,

            tipDialogVisible: false,

        }
    },

    activated() {
        this.getAllHost();
        this.cleanSaveForm();

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
            this.$router.push({path:'/erm/cluster'})
        },
        cleanSaveForm() {
            this.saveForm.id= '';
            this.saveForm.name= '';
            this.saveForm.remark= '';
            this.saveForm.instances= [];
        },

        //获取主机列表
        getAllHost() {
            this.$$api_erm_allHost({
                fn: data => {
                    this.allHost = data.data;
                }
            })
        },

        deleteRow(index) {
            this.saveForm.instances.splice(index, 1);
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

        addRow() {
            this.saveForm.instances.push({
                envType: '',
                hostId: '',
                endpoint: '',
                sshUser: '',
                sshKey: '',
                sshKeyPub: '',
                remark: '',
            })
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
                    this.saveForm = data.data.data;
                }
            });
        },

        copyRow(row) {
            if (!row) {
                return;
            }
            this.saveForm.instances.push({
                envType: row.envType,
                hostId: row.hostId,
                endpoint: row.endpoint,
                sshUser: row.sshUser,
                sshKey: row.sshKey,
                sshKeyPub: row.sshKeyPub,
                remark: row.remark,
            })
        },

        confirmGenerateSshKey(row){
            if(row.sshKey || row.sshKeyPub){
                this.$confirm('Confirm? It will replace the sshKey and sshKeyPub', 'warning', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    this.generateSshKey(row);
                }).catch(() => {
                    //do nothing
                });
            }else{
                this.generateSshKey(row);
            }
        },

        generateSshKey(row){
            this.$$api_erm_generateSshKeyPair({
                data: {},
                fn: data => {
                    row.sshKey = data.data.privateKey;
                    row.sshKeyPub = data.data.publicKey;
                    this.$message({
                        message: 'Generate SSH Key Pair Success',
                        type: 'success'
                    });
                    this.tempText = data.data.publicKey;
                    this.tipDialogVisible = true;
                }
            })
        },
        sshKeyPubTip(tempText){
            const sshUser = this.tempRow.sshUser;
            const sshKeyPub = tempText;
            if(!sshUser){
                return '用户为空，无法生成参考命令';
            }
            if(!sshKeyPub){
                return '请输入公钥'
            }
            var command = 'su '+sshUser+'\n' + 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo "'+sshKeyPub+'" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys';
            // var command = '参考命令:echo "\n'+row.sshKeyPub+'\n" >> /home/'+row.sshUser + '/authorized_keys';
             return  command
        },

        openTextDialogVisible(row, isPub){
            if(!row){
                return;
            }
            this.tempRow = row;
            this.isPub = isPub;
            if(isPub){
                this.tempText = row.sshKeyPub;
            }else{
                this.tempText = row.sshKey;
            }
            this.tempTip = '';
            this.textDialogVisible = true;
            //this.$refs.input.$el.querySelector('tempText').focus()
            //this.$refs.tempText.focus()
            //this.$refs['tempText'].focus();

            const that = this;
            setTimeout(function () {
                //that.$refs['input' + row.id].focus()
                that.$refs.inputRef.focus()
            }, 1)

            //this.$refs.inputRef.$el.children[0].focus()
        },
        closeTextDialogVisible(){
            if(this.isPub){
                this.tempRow.sshKeyPub = this.tempText;
            }else{
                this.tempRow.sshKey = this.tempText;
            }
            this.textDialogVisible = false
        },

        onCopySuccess(){
            this.$message.success('复制成功');
        },


    }
}
