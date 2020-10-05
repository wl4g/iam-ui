import {transDate, getDay} from 'utils/'

export default {
    name: 'bucket',
    data() {
        return {
            //查询条件
            searchParams: {
                prefix: '',
                cossProvider: 'NativeFs',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            tableData: [],

            loading: false,

            dialogVisible: false,
            saveForm: {
                cossProvider: '',
                bucketName: '',
            },

            cossProviders:[],

            // 表单规则
            rules: {
                bucketName: [
                    {required: true, message: 'Please Input name', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                cossProvider: [
                    { required: true, message: 'Please select cossProvider', trigger: 'change' },
                ],

            },


        }
    },

    mounted() {
        this.getData();
        this.getCossProviders();
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

        cleanForm() {
            this.saveForm = {
                cossProvider: '',
                bucketName: '',
            }
        },

        openSaveForm() {
            this.cleanForm();
            this.dialogVisible = true;
        },

        // 获取列表数据
        getData() {
            this.$$api_coss_listBuckets({
                data: {
                    cossProvider: this.searchParams.cossProvider,
                    prefix: this.searchParams.prefix,
                    marker: null,//TODO
                    maxKeys: 10,
                }, fn: data => {
                    this.tableData = data.data.bucketList;
                }
            });
        },

        detail(row) {
            this.$router.push({path: '/coss/bucketdetail', query: {cossProvider: this.searchParams.cossProvider, bucketName: row.name,}})
        },

        createBucket() {
            this.$$api_coss_createBucket({
                data: this.saveForm,
                fn: data => {
                    this.$message({
                        type: 'success',
                        message: 'Success'
                    });
                    this.getData();
                    this.dialogVisible = false;
                }
            });
        },

        dateFormat(row, column) {
            var moment = require('moment');
            var date = row[column.property];
            if (!date || date === 0) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        },

        deleteBucket(row) {
            this.$confirm('confirm?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_coss_deleteBucket({
                    data: {
                        cossProvider: this.searchParams.cossProvider,
                        bucketName: row.name,
                    }, fn: data => {
                        this.$message({
                            type: 'success',
                            message: 'Success'
                        });
                        this.getData();
                    }
                });
            }).catch(() => {

            });
        },

        getCossProviders(){
            this.$$api_coss_getCossProviders({
                data: {},
                fn: data => {
                    this.cossProviders = data.data;
                }
            });
        },


    }
}
