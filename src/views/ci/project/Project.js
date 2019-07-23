import {transDate, getDay} from 'utils/'

export default {
    name: 'project',
    data() {
        return {

            //查询条件
            searchParams: {
                groupName: '',
                projectName: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                appGroupId: '',
                projectName: '',
                gitUrl: '',
                tarPath: '',
                parentAppHome: '',
                linkAppHome: '',
                remark: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            //create内的下拉数据
            groupData: [],

            //列表Data
            tableData: [],


            //详情
            detailVisible: false,
            detailForm: {
                group: '',
                branch: '',
                taskDetails: [],
                result: ''
            },

        }
    },

    mounted() {
        this.getData();
        this.getGroup();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        //add
        addPriject() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        //edit
        editPriject(row) {
            if (!row.id) {
                return;
            }

            this.$$api_ci_projectDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = data.data.project;
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
            this.$$api_ci_projectList({
                data: {
                    groupName: this.searchParams.groupName,
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
        getGroup() {
            this.$$api_instanceman_grouplist({
                fn: data => {
                    if (data.code == 200) {
                        this.groupData = data.data.grouplist;
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

        saveProject() {
            console.info(this.saveForm);
            this.dialogLoading = true;

            this.$$api_ci_saveProject({
                data: {
                    id: this.saveForm.id,
                    appGroupId: this.saveForm.appGroupId,
                    projectName: this.saveForm.projectName,
                    gitUrl: this.saveForm.gitUrl,
                    tarPath: this.saveForm.tarPath,
                    parentAppHome: this.saveForm.parentAppHome,
                    linkAppHome: this.saveForm.linkAppHome,
                    remark: this.saveForm.remark,
                },
                fn: data => {
                    this.dialogLoading = false;
                    console.info("in");
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
            this.saveForm.appGroupId = '';
            this.saveForm.projectName = '';
            this.saveForm.gitUrl = '';
            this.saveForm.tarPath = '';
            this.saveForm.parentAppHome = '';
            this.saveForm.linkAppHome = '';
            this.saveForm.remark = '';
        },

        delProject(row) {
            if (!row.id) {
                return;
            }
            this.$$api_ci_delProject({
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
        },

        convertLockStatus(row) {
            console.info("into" + row.id);
            if (row.lockStatus == 1) {
                return '解锁';
            } else {
                return '非锁定';
            }
        },

        convertLockStatusDisable(row) {
            if (row.lockStatus == 1) {
                return false;
            } else {
                return true;
            }
        },

        unlock(row) {
            if (!row.id) {
                return;
            }
            this.$confirm('解锁操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_ci_unlock({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        if (data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.getData();
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
            }).catch(() => {
                /*this.$message({
                    type: 'info',
                    message: '已取消删除'
                });*/
            });


        }


    }
}
