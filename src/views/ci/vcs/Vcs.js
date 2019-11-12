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
            this.dialogTitle = '新增';
        },

        // 获取列表数据
        getData() {
            this.$$api_ci_vcsList({
                data: {
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



        cleanSaveForm() {
            this.saveForm = {
                id: '',
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
            this.$$api_ci_saveVcs({
                data: this.saveForm,
                fn: data => {
                    this.dialogLoading = false;
                    if (data.code == 200) {
                        this.dialogVisible = false;
                        this.getData();
                        this.cleanSaveForm();
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
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = {
                            id: data.data.id,
                            provider: data.data.provider.toString(),
                            authType: data.data.authType.toString(),
                            baseUri: data.data.baseUri,
                            sshKeyPub: data.data.sshKeyPub,
                            sshKey: data.data.sshKey,
                            token: data.data.token,
                            username: data.data.username,
                            password: data.data.password,
                        };


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
            });

            this.dialogVisible = true;
            this.dialogTitle = '编辑';
        },


        delData(row) {
            if (!row.id) {
                return;
            }
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
                errFn: () => {
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },


    }
}
