import {transDate, getDay} from 'utils/'

export default {
    name: 'vcs',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
                providerKind: '',
                authType: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                providerKind: '',
                authType: '',
                baseUri: '',
                sshKeyPub: '',
                sshKey: '',
                accessToken: '',
                username: '',
                password: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],


            // 表单规则
            rules: {

                name: [
                    {required: true, message: 'Please Input name', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                providerKind: [
                    { required: true, message: 'Please Input providerKind', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                authType: [
                    { required: true, message: 'Please select authType', trigger: 'change' },
                ],
                baseUri: [
                    { required: true, message: 'Please select baseUri', trigger: 'change' },
                    { min: 1, max: 255, message: 'length between 1 to 255', trigger: 'blur' }
                ],

            },
            loading: false
        }
    },

    mounted() {
        this.getData();

    },

    methods: {

        onSubmit() {
            this.getData();
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        addData() {
            this.cleanSaveForm();
            this.dialogLoading = false;
            this.dialogVisible = true;
            this.dialogTitle = 'Add VCS information';
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_ci_vcsList({
                data: {
                    name: this.searchParams.name,
                    providerKind: this.searchParams.providerKind,
                    authType: this.searchParams.authType,
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
                providerKind: '',
                authType: '',
                baseUri: '',
                sshKeyPub: '',
                sshKey: '',
                accessToken: '',
                username: '',
                password: '',
            };

        },

        saveData() {
            this.dialogLoading = true;

            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_saveVcs({
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
            });
        },

        editData(row) {
            if (!row.id) {
                return;
            }
            this.$$api_ci_vcsDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    this.saveForm = {
                        id: data.data.id,
                        name: data.data.name,
                        providerKind: data.data.providerKind,
                        authType: data.data.authType.toString(),
                        baseUri: data.data.baseUri,
                        sshKeyPub: data.data.sshKeyPub,
                        sshKey: data.data.sshKey,
                        accessToken: data.data.accessToken,
                        username: data.data.username,
                        password: data.data.password,
                    };
                }
            });
            this.dialogLoading = false;
            this.dialogVisible = true;
            this.dialogTitle = 'Configure VCS information';
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
                this.$$api_ci_delVcs({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },


    }
}
