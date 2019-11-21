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

        }
    },

    mounted() {
        this.getData();
        this.getAllHost();
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

        //获取主机列表
        getAllHost() {
            this.$$api_share_hostList({
                fn: data => {
                    if(data.code == 200){
                        this.allHost = data.data;
                    }else{
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
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
            this.$$api_share_clusterList({
                data: {
                    clusterName: this.searchParams.clusterName,
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

        cleanSaveForm() {
            this.saveForm.id= '';
            this.saveForm.name= '';
            this.saveForm.remark= '';
            this.saveForm.instances= [];
        },

        deleteRow(index) {
            this.saveForm.instances.splice(index, 1);
        },

        addRow() {
            this.saveForm.instances.push({

                envType: '',
                hostId: '',
                endpoint: '',
                sshUser: '',
                sshKey: '',
                remark: '',

            })
        },

        saveData() {
            //this.dialogLoading = true;
            this.$$api_share_saveCluster({
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
                    //this.loading = false;
                    if (data.code == 200) {
                        console.info(data.data.data);
                        this.saveForm = data.data.data;
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


        delData(row) {
            if (!row.id) {
                return;
            }
            this.$$api_share_delCluster({
                data: {
                    clusterId: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: 'del success',
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
