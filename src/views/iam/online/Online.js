import {transDate, getDay} from 'utils/'

export default {
    name: 'online',
    data() {
        return {
            //查询条件
            searchParams: {
                id: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            iamServers: [],

            saveForm: {
                alarmTemplate: {},

            },

        }
    },

    mounted() {
        this.getIamServer();
        //this.getData();
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
            console.info(this.searchParams.id);
            this.$$api_iam_onlineList({
                data: {
                    id: this.searchParams.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        //this.total = data.data.page.total;
                        this.tableData = data.data.sessions;
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

        getIamServer(){
            this.$$api_iam_getIamServer({
                data: {

                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.iamServers = data.data;
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

        destroySessions(row){
            this.$$api_iam_destroySessions({
                data: {
                    sessionIds : row.id
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: 'destroy seccess',
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
