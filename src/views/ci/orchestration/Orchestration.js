import {transDate, getDay} from 'utils/'
import global from "../../../common/global_variable";

export default {
    name: 'orchestration',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                type: '',
                remark: '',
                orchestrationPipelines: [],
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],
            pipelines: [],


            // 表单规则
            rules: {

                name: [
                    {required: true, message: 'Please Input name', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],

            },
            loading: false,

            //before create Build Task
            confirmDialog: false,

            confirmForm:{
                id: '',
                trackId: '',
                trackType: '',
                remark: '',

                userId: '',
                projectId: '',
                issueId: '',

                fileList: [],
                annex: '',
            },

            saveLoading: false,

            users: [],
            projects: [],
            issues: [],

            uploadUrl: global.getBaseUrl(global.ci,false)+'/fs/upload',

            buildRules:{
                trackType: [
                    {required: true, message: 'Please select trackType', trigger: 'change' },
                ],
                trackId: [
                    {required: true, message: 'Please input trackId', trigger: 'change' },
                ],
                remark: [
                    {required: true, message: 'Please input remark', trigger: 'change' },
                ],
            },


        }
    },

    mounted() {
        this.getData();

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

        addData() {
            this.getPipelines();
            this.cleanSaveForm();
            this.dialogLoading = false;
            this.dialogVisible = true;
            this.dialogTitle = 'Add orchestration information';
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_ci_orchestrationList({
                data: {
                    name: this.searchParams.name,
                },
                fn: data => {
                    this.loading = false;
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },
        cleanSaveForm() {
            this.saveForm = {
                id: '',
                name: '',
                type: '1',
                remark: '',
                orchestrationPipelines: [],
            };
        },

        saveData() {
            this.dialogLoading = true;

            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_saveOrchestration({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogLoading = false;
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                        }
                    });
                }else {
                    this.dialogLoading = false;
                }
            });
        },

        editData(row) {
            if (!row.id) {
                return;
            }
            this.getPipelines();
            this.$$api_ci_orchestrationDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    this.saveForm = {
                        id: data.data.id,
                        name: data.data.name,
                        type: data.data.type.toString(),
                        remark: data.data.remark,
                        orchestrationPipelines: data.data.orchestrationPipelines,
                    };
                }
            });
            this.dialogLoading = false;
            this.dialogVisible = true;
            this.dialogTitle = 'Configure Orchestration information';
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
                this.$$api_ci_delOrchestration({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        // 获取列表数据
        getPipelines() {
            this.$$api_ci_getPipelineForSelect({
                data: {},
                fn: data => {
                    this.pipelines = data.data;
                }
            })
        },

        runOrchestration(row) {
            this.$confirm('Continue to start Orchestration?', 'warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                this.$$api_ci_runOrchestration({
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
                });
            }).catch(() => {
                //do nothing
            });
        },

        deleteRow(index) {
            this.saveForm.orchestrationPipelines.splice(index, 1);
        },

        addRow() {
            if(!this.saveForm.orchestrationPipelines){
                this.saveForm.orchestrationPipelines = [];
            }
            this.saveForm.orchestrationPipelines.push({
                pipelineId: '',
                priority: '50',
            })
        },

        beforeRunTask(row){
            this.cleanConfirm();
            if(!row.id){
                return;
            }
            this.confirmForm.id = row.id;
            this.confirmDialog = true;

            this.saveLoading = false;


            this.getUsers();
            this.getProjects();
            this.getIssues();

        },

        cleanConfirm() {
            this.confirmForm = {
                id: '',
                trackId: '',
                trackType: '',
                remark: '',

                userId: '',
                projectId: '',
                issueId: '',

                fileList: [],
                annex: '',
            };
        },

        runTask() {
            this.saveLoading = true;
            this.$refs['confirmForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_runOrchestration({
                        data: this.confirmForm,
                        fn: data => {
                            this.getData();
                            this.confirmDialog = false;
                            this.saveLoading = false;
                            this.$confirm('Success,jump to task list?', {
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                type: 'success'
                            }).then(() => {
                                this.$router.push('/ci/taskhis');
                            }).catch(() => {
                                //do nothing
                            });
                        },
                        errFn: () => {
                            this.saveLoading = false;
                        }
                    });
                }else {
                    this.saveLoading = false;
                }
            });
        },

        getUsers(){
            this.$$api_ci_getUsers({
                data: {
                    taskId: this.confirmForm.taskId
                },
                fn: data => {
                    this.users = data.data;
                },
            })
        },
        getProjects(){
            this.$$api_ci_getProjects({
                data: {
                    taskId: this.confirmForm.taskId
                },
                fn: data => {
                    this.projects = data.data;
                },
            })
        },
        getIssues(){
            this.$$api_ci_getIssues({
                data: {
                    taskId: this.confirmForm.taskId,
                    userId: this.confirmForm.userId,
                    projectId: this.confirmForm.projectId,
                },
                fn: data => {
                    this.issues = data.data;
                },
            })
        },
        uploadSuccess(response, file, fileList){
            this.confirmForm.annex = response.data
        },
        uploadFail(err, file, fileList){
            this.$message.error('upload fail');
        }


    }
}
