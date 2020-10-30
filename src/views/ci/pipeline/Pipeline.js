import {transDate, getDay} from 'utils/'
import fa from "element-ui/src/locale/lang/fa";
import global from "../../../common/global_variable";
import RightPanel from '@/components/RightPanel'
export default {
    name: 'pipeline',
    components: {
        RightPanel,
    },
    data() {
        return {
            //查询条件
            searchParams: {
                pipeName: '',
                providerKind:'',
                environment: '',
            },
            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,


            //列表Data
            tableData: [],

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

            //before create Build Task
            confirmDialog: false,
            confirmDialogTitle: '[Confirm Title]',

            confirmForm:{
                id: '',
                pcmId: '',
                pcmEnable: 1,


                trackId: '',
                trackType: '',
                remark: '',

                userId: '',
                projectId: '',
                issueId: '',
                //upload file
                fileList: [],
                annex: '',
            },

            loading: false,
            saveLoading: false,

            users: [],
            projects: [],
            issues: [],

            uploadUrl: global.getBaseUrl(global.ci,false)+'/fs/upload',

        }
    },

    activated() {
        this.getData();
    },

    mounted() {
        // this.getData();
    },

    methods: {
        onSubmit() {
            this.loading = true;
            this.getData();
        },

        submitUpload() {
            this.$refs.upload.submit();
        },

        add(command) {
            if(command==''){
                this.dialogVisible = true;
                this.dialogTitle = '新增';
            }else if (command==''){
                this.dialogVisible = true;
                this.dialogTitle = '新增';
            }else{
                this.dialogVisible = true;
                this.dialogTitle = '新增';
            }

            //TODO jump to detail page
            this.$router.push({path: this.permitutil.getRoutePathByPermission('ci:pipeline:edit'),query: {command: command}})

        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        taskDetail(row){
            this.$router.push({path: this.permitutil.getRoutePathByPermission('ci:pipeline:edit'),query: {id:row.id}})
        },

        // 获取列表数据
        getData() {
            this.searchParams.pageNum = this.pageNum;
            this.searchParams.pageSize = this.pageSize;
            this.$$api_ci_pipelineList({
                data: this.searchParams,
                fn: data => {
                    this.loading = false;
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                },
            })
        },

        getDate(startDate){
            let Y = startDate.getFullYear() + '-';
            let M = (startDate.getMonth()+1 < 10 ? '0'+(startDate.getMonth()+1) : startDate.getMonth()+1) + '-';
            let D = startDate.getDate() <10 ? '0'+(startDate.getDate()) : startDate.getDate();
            return Y+M+D;
        },

        delTask(row) {
            this.$confirm('Confirm?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_ci_delPipeline({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });

        },

        countInstance(row){
            //return "1";
            return row.instances.length
        },
        instances2Str(row){
            var result = "";
            for(var i=0;i<row.instances.length;i++){
                result += row.instances[i].remark+"\n";
            }
            return result;
        },
        countProject(row){
            //return "1";
            return row.pipeStepBuildingProjects.length
        },
        branchs2Str(row){
            var result = "";
            for(var i=0;i<row.pipeStepBuildingProjects.length;i++){
                result += row.pipeStepBuildingProjects[i].projectName+" ["+row.pipeStepBuildingProjects[i].ref +"]\n";
            }
            return result;
        },


        beforeRunTask(row){
            this.cleanConfirm();
            if(!row.id){
                return;
            }

            this.confirmForm.pipeId = row.id;
            this.confirmForm.pcmId = row.pcmId;
            this.confirmForm.pcmEnable = row.pcmEnable;

            this.confirmDialogTitle = '构建[' + row.pipeName+ ']';
            this.confirmForm.taskId = row.id;
            this.confirmDialog = true;

            this.saveLoading = false;

            this.getPcmSelect(row);

        },

        cleanConfirm() {
            this.confirmForm = {
                id: '',
                pcmId: '',
                pcmEnable: 1,

                trackId: '',
                trackType: '',
                remark: '',

                userId: '',
                projectId: '',
                issueId: '',
                //upload file
                fileList: [],
                annex: '',
            };
        },

        runTask() {
            this.saveLoading = true;
            this.$refs['confirmForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_runPipeline({
                        data: this.confirmForm,
                        fn: data => {
                            this.saveLoading = false;
                            this.confirmDialog = false;
                            this.$confirm('Create Task Success,jump to task list?', {
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                type: 'success'
                            }).then(() => {
                                this.$router.push( this.permitutil.getRoutePathByPermission('ci:pipehis'));
                            }).catch(() => {
                                //do nothing
                            });
                        },
                        errFn: () => {
                            this.saveLoading = false;
                        }
                    })
                }else {
                    this.saveLoading = false;
                }
            });
        },


        getPcmSelect(row){
            if(row.pcmEnable===1){
                this.getUsers();
                this.getProjects();
                this.getIssues();
            }
        },
        getUsers(){
            this.$$api_ci_getUsers({
                data: {
                    pcmId: this.confirmForm.pcmId
                },
                fn: data => {
                    this.users = data.data;
                },
            })
        },
        getProjects(){
            this.$$api_ci_getPcmProjects({
                data: {
                    pcmId: this.confirmForm.pcmId
                },
                fn: data => {
                    this.projects = data.data;
                },
            })
        },
        getIssues(){
            this.$$api_ci_getIssues({
                data: {
                    pcmId: this.confirmForm.pcmId,
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
