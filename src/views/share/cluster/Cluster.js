import {transDate, getDay} from 'utils/'

export default {
    name: 'cluster',
    data() {
        return {
            //查询条件
            searchParams: {
                clusterName: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                remark: '',
                instances: [],
            },

            isEdit: false,

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            //allHost
            allHost: [],

            rules: {
                name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
            },
            loading: false
        }
    },

    mounted() {
        this.getData();
        this.getAllHost();
    },

    methods: {

        onSubmit() {
            this.getData();
        },

        currentChange(i) {
            this.pageNum = i;
            this.getData();
        },

        //获取主机列表
        getAllHost() {
            this.$$api_share_allHost({
                fn: data => {
                    this.allHost = data.data;
                }
            })
        },

        addData() {
            this.getAllHost();

            this.isEdit = false;
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_share_clusterList({
                data: {
                    clusterName: this.searchParams.clusterName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.loading = false;
                    this.total = data.data.page.total;
                    this.tableData = data.data.list;
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },

        cleanSaveForm() {
            this.saveForm.id= '';
            this.saveForm.name= '';
            this.saveForm.remark= '';
            this.saveForm.instances= [];
        },

        deleteRow(index) {
            this.saveForm.instances.splice(index, 1);
        },

        connectTest(row){
            this.$$api_share_connectTest({
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
                    this.$$api_share_saveCluster({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogLoading = false;
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
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


        editData(row) {
            this.getAllHost();
            this.isEdit = true;
            if (!row.id) {
                return;
            }
            this.$$api_share_clusterDetail({
                data: {
                    clusterId: row.id,
                },
                fn: data => {
                    this.saveForm = data.data.data;
                }
            });
            this.dialogVisible = true;
            this.dialogTitle = '编辑';
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
                this.$$api_share_delCluster({
                    data: {
                        clusterId: row.id,
                    },
                    fn: data => {
                        this.$message({
                            message: 'del success',
                            type: 'success'
                        });
                        this.getData();
                    }
                })
            }).catch(() => {
                //do nothing
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
        generateSshKey(row){
            this.$$api_share_generateSshKeyPair({
                data: {},
                fn: data => {
                    row.sshKey = data.data.privateKey;
                    row.sshKeyPub = data.data.publicKey;
                }
            })
        },
        sshKeyPubTip(row){
            if(!row.sshKeyPub || !row.sshUser){
                return '参考命令:';
            }
            return '参考命令:echo "\n'+row.sshKeyPub+'\n" >> /home/'+row.sshUser + '/authorized_keys'
        }
    }
}
