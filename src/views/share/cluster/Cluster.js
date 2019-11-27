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
            this.$$api_share_clusterList({
                data: {
                    clusterName: this.searchParams.clusterName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.total = data.data.page.total;
                    this.tableData = data.data.list;
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
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_share_saveCluster({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
                        }
                    });
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
                    console.info(data.data.data);
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
    }
}
