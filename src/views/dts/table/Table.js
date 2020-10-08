import { transDate, getDay } from 'utils/'

export default {
    name: 'tableM',
    data() {
        return {
            projectId: '',

            //查询条件
            searchParams: {
                tableName: '',
                status: '1',
            },
            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            tmetadataLoading: false
        }
    },

    activated() {
        if (this.$route.query.id) {
            this.tableData = [];
            this.projectId = this.$route.query.id;
        }
        this.getData();
    },

    mounted() {
        //this.getData();
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
            this.$router.push({ path: '/dts/tableedit', query: { projectId: this.projectId } })
        },

        openTableEdit(row) {
            this.$router.push({ path: '/dts/tableedit', query: { id: row.id, projectId: this.projectId } })
        },

        // 获取列表数据
        getData() {
            this.tmetadataLoading = true;
            this.$$api_dts_genConfigList({
                data: {
                    tableName: this.searchParams.tableName,
                    projectId: this.projectId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.tmetadataLoading = false;
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                },
                errFn: () => {
                    this.tmetadataLoading = false;
                }
            })
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
                this.$$api_dts_delGenConfig({
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

        editData(row) {
            if (!row.id) {
                return;
            }
            this.$router.push({ path: '/dts/tableedit', query: { id: row.id, projectId: this.projectId } })
        },

        setEnable(row) {
            this.$$api_dts_setTableEnable({
                data: {
                    id: row.id,
                    status: row.status,
                },
                fn: data => {
                    this.$message({
                        message: 'Success',
                        type: 'success'
                    });
                    this.getData();
                },
            })
        },


        handleCommand(command) {
            const force = command.force;
            const row = command.row;
            this.synchronizeTable(row, force);
        },

        synchronizeTable(row, force) {
            this.$confirm('同步Table信息?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_dts_synchronizeTable({
                    data: {
                        id: row.id,
                        force: force,
                    },
                    fn: data => {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        generate(row) {
            if (!row.id) {
                return;
            }
            this.$$api_dts_generate({
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

            /*this.$confirm('生成代码?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_dts_generate({
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
            });*/
        }

    }
}
