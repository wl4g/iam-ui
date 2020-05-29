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

            tableData: [],

            loading: false,
        }
    },

    activated() {
        this.getData();
    },

    methods: {
        onSubmit() {
            this.getData();
        },

        currentChange(i) {
            this.pageNum = i;
            this.getData();
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_erm_clusterList({
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

        addData() {
            //TODO jump to detail page
            this.$router.push({path:'/erm/clusteredit'})
        },

        editData(row) {
            //TODO jump to detail page
            this.$router.push({path:'/erm/clusteredit',query: {id: row.id}})
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
                this.$$api_erm_delCluster({
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
