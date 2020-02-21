import {transDate, getDay} from 'utils/'
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';

export default {
    name: 'taskhis',
    data() {
        return {
            //查询条件
            searchParams: {
                groupName: '',
                projectName: '',
                branchName: '',
                startDate: '',
                endDate: '',
                envType: '',
            },
            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,
            //弹窗表单
            buildForm: {
                group: '',
                environment: '',
                instances: [],
                branch: '',
                desc: '',
                providerKind: '',
                tagOrBranch: '1',
            },
            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            //create内的下拉数据
            groupData: [],
            envirData: [],
            instanceData: [],
            branchs: [],

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

            startPos: 0,
            logThread: 0,
            refreshListThread: 0,

            term: null,
            loading: false,
            //searchAddon: null,

        }
    },

    mounted() {
        const dic = new Map();
        dic.set(1, "Hook");
        dic.set(2, "Manual");
        dic.set(3, "Rollback");
        this.dictData.set("ci_task_type", dic);

        const dic2 = new Map();
        dic2.set(0, "New");
        dic2.set(1, "Running");
        dic2.set(2, "Success");
        dic2.set(3, "Failed");
        dic2.set(4, "Timeout");
        this.dictData.set("ci_task_status", dic2);


    },

    activated() {
        //alert("into activated");
        this.getData();
        //this.startRefreshList();
    },

    methods: {
        onSubmit() {

            this.getData();
        },
        create() {
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },
        currentChange(i) {
            this.pageNum = i;
            this.getData();
        },

        startRefreshList(){
            this.stopRefreshList();
            let that = this;
            if(this.checkExistRunningTask()){
                this.refreshListThread = self.setTimeout(function () {
                    that.getData();
                }, 1 * 3000);
            }
        },

        checkExistRunningTask(){
            if(this.tableData){
                for (var i in this.tableData) {
                    let taskHis = this.tableData[i];
                    if(taskHis['status']==0||taskHis['status']==1){//status is create or running
                        return true;
                    }
                }
            }
            return false;
        },

        stopRefreshList(){
            window.clearTimeout(this.refreshListThread);
        },


        // 获取列表数据
        getData() {
            this.loading = true;
            var start = '';
            var end = '';
            if(this.searchParams.startDate!=''){
                start = this.getDate(this.searchParams.startDate);
            }
            if(this.searchParams.endDate!=''){
                end = this.getDate(this.searchParams.endDate);
            }

            this.$$api_ci_taskHisList({
                data: {
                    groupName: this.searchParams.groupName,
                    projectName: this.searchParams.projectName,
                    branchName: this.searchParams.branchName,
                    startDate: start,
                    endDate: end,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    envType: this.searchParams.envType,
                },
                fn: data => {
                    this.loading = false;
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                    this.startRefreshList();
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },

        getDate(startDate){
            let Y = startDate.getFullYear() + '-';
            let M = (startDate.getMonth()+1 < 10 ? '0'+(startDate.getMonth()+1) : startDate.getMonth()+1) + '-';
            let D = startDate.getDate() <10 ? '0'+(startDate.getDate()) : startDate.getDate();
            return Y+M+D;
        },

        //Dict convert
        getDatagridDict(category, cellValue) {
            var dictGroup = this.dictData.get(category);
            var result = dictGroup.get(cellValue);
            //TODO add format tag
            return result;
        },
        convertType(row, column, cellValue, index) {
            return this.getDatagridDict("ci_task_type", cellValue);
        },
        convertStatusValue(row){
            switch(row.status){
            case 0:
                return { img: 'static/images/state/gray_normal.png', text: 'New' };
            case 1:
                return { img: 'static/images/state/red_run.gif', text: 'Running' };
            case 2:
                return { img: 'static/images/state/green_ok.png', text: 'Success' };
            case 3:
                return { img: 'static/images/state/red_fail.png', text: 'Failed' };
            case 4:
                return { img: 'static/images/state/red_fail.png', text: 'Timeout' };
            case 5:
                return { img: 'static/images/state/red_fail.png', text: 'Stopped' };
            case 6:
                return { img: 'static/images/state/red_fail.png', text: 'Part Success' };
            default:
                return '--';
            }
        },
        convertStatusType(row){
            if (row.status == 0) {
                return '#75a2f9';
            }
            if (row.status == 1) {
                return '#50bfff';
            }
            if (row.status == 2) {
                return '#44e88d';
            }
            if (row.status == 4) {
                return '#dc9417';
            }
            if (row.status == 5) {
                return '#f77171';
            }
            if (row.status == 6) {
                return '#dc9417';
            }
            return '#DC143C';
        },
        //双击
        doubleClickRow(row, column, event) {
            this.$router.push({path:'/ci/taskhisdetail',query: {id:row.id}})
        },
        detail(row) {
            this.doubleClickRow(row);
        },

        stopTask(id){
            if(!id){
                return;
            }
            this.$confirm('Stop task confirm', {
                confirmButtonText: 'ok',
                cancelButtonText: 'cancel',
                type: 'info'
            }).then(() => {
                this.$$api_ci_stopTask({
                    data: {
                        taskHisId: id,
                    },
                    fn: data => {
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        createTask() {
            this.dialogLoading = true;
            this.$$api_ci_createTaskHis({
                data: {
                    appClusterId: this.buildForm.group,
                    branchName: this.buildForm.branch,
                    instances: this.buildForm.instances.toString(),
                    providerKind: this.buildForm.providerKind,
                },
                fn: data => {
                    this.dialogLoading = false;
                    this.dialogVisible = false;
                    this.getData();
                    cleanBuildForm();
                }
            })
        },

        cleanBuildForm() {
            this.buildForm.group = '';
            this.buildForm.instances = [];
            this.buildForm.branch = '';
            this.buildForm.providerKind = '';
        },
        rollbackTask(row, column, event) {
            this.$confirm('回滚操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                this.$$api_ci_rollbackTaskHis({
                    data: {
                        taskId: row.id,
                    },
                    fn: data => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.getData();
                    }
                })
            }).catch(() => {

            });
        },
    },

    //离开前清除定时任务
    beforeRouteLeave(to,from,next){
        this.stopRefreshList();
        next();
    },


}
