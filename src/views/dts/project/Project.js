import { transDate, getDay } from 'utils/'
import global from "../../../common/global_variable";

export default {
    name: 'project',
    data() {
        return {
            //查询条件
            searchParams: {
                projectName: '',
            },
            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,
            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,
            tableData: [],
            downloadUrl: global.getBaseUrl(global.dts, false) + '/gen/configure/download?jobId=',
            // 表单规则
            rules: {
                projectName: [
                    { required: true, message: 'Please Input name', trigger: 'change' },
                ],
                tplCategory: [
                    { required: true, message: 'Please Input name', trigger: 'change' },
                ],
            },
            loading: false,
        }
    },
    mounted() {
        //this.getData();
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
        addData() {
            this.$router.push({ path: '/dts/projectedit' })
        },
        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_dts_projectList({
                data: {
                    projectName: this.searchParams.projectName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.loading = false;
                    this.total = data.data.total;
                    for (let i in data.data.records) {
                        if (!data.data.records[i].generating) {
                            data.data.records[i].generating = false;
                        }
                    }
                    this.tableData = data.data.records;
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },
        editData(row) {
            if (!row.id) {
                return;
            }
            this.$router.push({ path: '/dts/projectedit', query: { id: row.id } })
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
                this.$$api_dts_delProject({
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

        toTable(row) {
            this.$router.push({ path: '/dts/table', query: { id: row.id } })
        },

        generate(row) {
            if (!row.id) {
                return;
            }
            row.generating = true;
            this.$$api_dts_generate({
                data: {
                    id: row.id,
                },
                fn: data => {
                    row.generating = false;
                    this.$message({
                        message: '生成成功，下载中...',
                        type: 'success'
                    });
                    window.open(this.downloadUrl + data.data, '_self')
                },
                errFn: data => {
                    row.generating = false;
                    if (data && data.message) {
                        this.$message.error(data.message);
                    }
                },
            })
        },
    }
}
