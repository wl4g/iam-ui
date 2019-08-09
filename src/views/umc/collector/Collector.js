import {transDate, getDay} from 'utils/'

export default {
    name: 'collector',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
                addr: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                hostId: [],

            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            allHost: [],

        }
    },

    mounted() {
        this.getAllHost();
        this.getData();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        // 获取列表数据
        getData() {
            this.$$api_umc_collectorList({
                data: {
                    name: this.searchParams.name,
                    addr: this.searchParams.addr,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.total = data.data.page.total;
                        this.tableData = data.data.list;
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
        getAllHost() {
            this.$$api_umc_allHost({
                data: {

                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.allHost = data.data.list;
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

        addCollector() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        cleanSaveForm() {
            this.saveForm.id = '';
            this.saveForm.name = '';
            this.saveForm.addr = '';
            this.saveForm.hostId = '';
        },


        saveCollector() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    //this.dialogLoading = true;
                    this.$$api_umc_saveCollector({
                        data: {
                            id: this.saveForm.id,
                            name: this.saveForm.name,
                            addr: this.saveForm.addr,
                            hostId: this.saveForm.hostId,
                        },

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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        editCollector(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_collectorDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = data.data.alarmCollector;
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

            this.dialogVisible = true;
            this.dialogTitle = '编辑';
        },


        delCollector(row) {
            if (!row.id) {
                return;
            }
            this.$$api_umc_delCollector({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData();
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

    }
}
