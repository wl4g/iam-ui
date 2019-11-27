import {transDate, getDay} from 'utils/'

export default {
    name: 'online',
    data() {
        return {
            //查询条件
            searchParams: {
                id: '',
                principal: '',
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
                    principal: this.searchParams.principal,
                },
                fn: data => {
                    this.tableData = data.data.sessions;
                }
            })
        },

        getIamServer(){
            this.$$api_iam_getIamServer({
                data: {},
                fn: data => {
                    this.iamServers = data.data;
                }
            })
        },

        destroySessions(row) {
            this.$$api_iam_destroySessions({
                data: {
                    id: this.searchParams.id,
                    sessionId: row.id,
                    //principal: row.principal,
                },
                fn: data => {
                    this.$message({
                        message: 'destroy seccess',
                        type: 'success'
                    });
                    this.getData();
                }
            })
        },


        convertType(row, column, cellValue, index) {
            if(cellValue){
                return "true";
            }else{
                return "false";
            }
        },

        subStr(str){
            if(str.length>10){
                str = str.substring(0,10)+"...";
            }
            return str;
        },




    }
}
