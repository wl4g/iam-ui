import {transDate, getDay} from 'utils/'
import fa from "element-ui/src/locale/lang/fa";

export default {
    name: 'task',
    data() {
        return {
            //查询条件
            searchParams: {
                id: '',
                taskName: '',
                groupName: '',
                projectName: '',
                branchName: '',
                providerKind:'',
                startDate:'',
                endDate:'',
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

            confirmForm:{
                taskId: '',
                trackId: '',
                trackType: '',
                remark: '',
            },
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
            //this.loading = true;
            this.getData();
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
            this.$router.push({path:'/ci/newpipeline',query: {command: command}})

        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        taskDetail(row){
            this.$router.push({path:'/ci/newpipeline',query: {id:row.id}})
        },

        // 获取列表数据
        getData() {
            var start = '';
            var end = '';
            if(this.searchParams.startDate!=''){
                start = this.getDate(this.searchParams.startDate);
            }
            if(this.searchParams.endDate!=''){
                end = this.getDate(this.searchParams.endDate);
            }
            this.$$api_ci_taskList({
                data: {
                    id: this.searchParams.id,
                    taskName: this.searchParams.taskName,
                    groupName: this.searchParams.groupName,
                    projectName: this.searchParams.projectName,
                    branchName: this.searchParams.branchName,
                    providerKind: this.searchParams.providerKind,
                    startDate: start,
                    endDate: end,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
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
                this.$$api_ci_delTask({
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


        beforeRunTask(row){
            this.cleanConfirm();
            if(!row.id){
                return;
            }
            this.confirmForm.taskId = row.id;
            this.confirmDialog = true;
        },

        cleanConfirm() {
            this.confirmForm = {
                taskId: '',
                trackId: '',
                trackType: '',
                remark: '',
            };
        },

        runTask() {
            this.$refs['confirmForm'].validate((valid) => {
                if (valid) {
                    this.$$api_ci_runTask({
                        data: this.confirmForm,
                        fn: data => {
                            this.confirmDialog = false;
                            this.$confirm('Create Task Success,jump to task list?', {
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                type: 'success'
                            }).then(() => {
                                this.$router.push('/ci/taskhis');
                            }).catch(() => {
                                //do nothing
                            });
                        },
                    })
                }
            });
        }

    }
}
