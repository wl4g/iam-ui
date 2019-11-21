import {transDate, getDay} from 'utils/'
import fa from "element-ui/src/locale/lang/fa";

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
                appClusterId: '',
                projectName: '',
                httpUrl: '',
                sshUrl: '',
                assetsPath: '',
                parentAppHome: '',
                remark: '',
                restartCommand: '',
                dependencies: [],
                vcsId: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            searchProjectLoading: false,

            //create内的下拉数据
            groupData: [],

            //create内的下拉数据
            ProjectData: [],

            //vcs数据
            vcsData: [],

            //列表Data
            tableData: [],

            vcsProjectData: [],

            //详情
            detailVisible: false,
            detailForm: {
                group: '',
                branch: '',
                taskInstances: [],
                result: ''
            },

            // 表单规则
            rules: {

                projectName: [
                    {required: true, message: 'Please Input projectName', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],

                assetsPath: [
                    { required: true, message: 'Please Input assets Path', trigger: 'change' },
                    { min: 1, max: 100, message: 'length between 1 to 100', trigger: 'blur' }
                ],
                parentAppHome: [
                    { required: true, message: 'Please Input App Home', trigger: 'change' },
                    { min: 1, max: 100, message: 'length between 1 to 100', trigger: 'blur' }
                ],

            },



        }
    },



    mounted() {
        this.getData();
        this.getGroup();
        this.getVcs();
        this.getProject();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        //add
        addPriject() {
            this.getGroup();
            this.getProject();

            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = 'New Project information';
        },


        // 获取分组名称
        getVcs() {
            this.$$api_ci_vcsAll({
                fn: data => {
                    this.vcsData = data.data;
                },
                errFn: () => {
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

        deleteDep(index) {
            this.saveForm.dependencies.splice(index, 1);
        },

        addRow() {
            this.saveForm.dependencies.push({
                dependentId: '',
                branch: '',
            })
        },

        //edit
        editPriject(row) {
            this.getGroup();
            this.getProject();

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
            this.dialogTitle = 'Configuer Project information';
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
                        this.total = data.data.total;
                        this.tableData = data.data.records;
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
            this.$$api_share_clusters({
                fn: data => {
                    if (data.code == 200) {
                        this.groupData = data.data.clusters;
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
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.dialogLoading = true;
                    this.$$api_ci_saveProject({
                        data: {
                            id: this.saveForm.id,
                            appClusterId: this.saveForm.appClusterId,
                            projectName: this.saveForm.projectName,
                            httpUrl: this.saveForm.httpUrl,
                            sshUrl: this.saveForm.sshUrl,
                            vcsId: this.saveForm.vcsId,
                            assetsPath: this.saveForm.assetsPath,
                            parentAppHome: this.saveForm.parentAppHome,
                            restartCommand: this.saveForm.restartCommand,
                            remark: this.saveForm.remark,
                            dependencies: this.saveForm.dependencies,
                        },
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
                            this.$alert('访问失败，请稍后重试2！', '错误', {
                                confirmButtonText: '确定',
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        cleanSaveForm() {
            this.saveForm = {
                id: '',
                appClusterId: '',
                projectName: '',
                httpUrl: '',
                sshUrl: '',
                assetsPath: '',
                parentAppHome: '',
                remark: '',
                restartCommand: '',
                dependencies: [],
                vcsId: '',
            }
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
        },

        changeVcs(){
            if(!this.saveForm.vcsId){
                return;
            }
            this.$$api_ci_vcsProjects({
                data: {
                    vcsId: this.saveForm.vcsId,
                },
                fn: data => {
                    this.vcsProjectData = data.data;
                },
                errFn: () => {
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        remoteMethod(query) {
            this.searchProjectLoading = true;
            this.$$api_ci_vcsProjects({
                data: {
                    vcsId: this.saveForm.vcsId,
                    projectName: query,
                },
                fn: data => {
                    this.vcsProjectData = data.data;
                    this.searchProjectLoading = false;
                },
                errFn: () => {
                    this.searchProjectLoading = false;
                }
            })


        },

        changeProject(){
            let remoteProject = this.getProjectByName(this.saveForm.projectName);
            if(remoteProject){
                this.saveForm.httpUrl = remoteProject.httpUrl
                this.saveForm.sshUrl = remoteProject.sshUrl
            }
        },


        getProjectByName(name){
            for(let i = 0;i<this.vcsProjectData.length;i++){
                if(this.vcsProjectData[i].name==name){
                    return this.vcsProjectData[i];
                }
            }
        }




    }
}
