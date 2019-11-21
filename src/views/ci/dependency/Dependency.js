import {transDate, getDay} from 'utils/'

export default {
    name: 'dependency',
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

            //弹窗表单
            saveForm: {
                id: '',
                projectId: '',
                dependentId: '',
                branch: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            //create内的下拉数据
            ProjectData: [],

            //列表Data
            tableData: [],

            //字典
            dictData: new Map(),

            //详情
            detailVisible: false,
            detailForm: {
                group: '',
                branch: '',
                taskInstances: [],
                result: ''
            },

        }
    },

    mounted() {
        this.getData();
        this.getProject();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        //add
        addDependency() {
            this.getProject();
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        //edit
        editDependency(row) {
            this.getProject();
            if (!row.id) {
                return;
            }

            this.$$api_ci_dependencyDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = data.data.dependency;
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

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        // 获取列表数据
        getData() {
            this.$$api_ci_dependencyList({
                data: {
                    projectName: this.searchParams.projectName,
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

        // 获取分组名称
        getProject() {
            this.$$api_ci_allProject({
                fn: data => {
                    if (data.code == 200) {
                        this.ProjectData = data.data.list;
                    } else {
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

        saveDependency() {
            console.info(this.saveForm);
            this.dialogLoading = true;

            this.$$api_ci_saveDependency({
                data: {
                    id: this.saveForm.id,
                    projectId: this.saveForm.projectId,
                    dependentId: this.saveForm.dependentId,
                    branch: this.saveForm.branch,
                },
                fn: data => {
                    this.dialogLoading = false;
                    if (data.code == 200) {
                        this.dialogVisible = false;
                        this.getData();
                        cleanSaveForm();
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
            })
        },

        cleanSaveForm() {
            this.saveForm.id = '';
            this.saveForm.projectId = '';
            this.saveForm.dependentId = '';
            this.saveForm.branch = '';
        },

        delDependency(row) {
            if (!row.id) {
                return;
            }
            this.$$api_ci_delDependency({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        //delete success
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
        }


    }
}
