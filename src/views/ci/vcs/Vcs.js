import {transDate, getDay} from 'utils/'

export default {
    name: 'vcs',
    data() {
        return {
            //查询条件
            searchParams: {

            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                provider: '',
                authType: '',
                baseUri: '',
                sshKeyPub: '',
                sshKey: '',
                token: '',
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
                provider: [
                    { required: true, message: 'Please Input provider', trigger: 'change' },
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
            this.dialogVisible = true;
            this.dialogTitle = 'Add VCS information';
        },

        // 获取列表数据
        getData() {
            this.$$api_ci_vcsList({
                data: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                }
            })
        },
        cleanSaveForm() {
            this.saveForm = {
                id: '',
                name: '',
                provider: '',
                authType: '',
                baseUri: '',
                sshKeyPub: '',
                sshKey: '',
                token: '',
                username: '',
                password: '',
            };

        },

        saveData() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_saveVcs({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
                        }
                    });
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
                        provider: data.data.provider.toString(),
                        authType: data.data.authType.toString(),
                        baseUri: data.data.baseUri,
                        sshKeyPub: data.data.sshKeyPub,
                        sshKey: data.data.sshKey,
                        token: data.data.token,
                        username: data.data.username,
                        password: data.data.password,
                    };
                }
            });
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
