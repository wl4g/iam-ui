import {transDate, getDay} from 'utils/'
import {Terminal} from "xterm";
import {FitAddon} from "xterm-addon-fit";

export default {
    name: 'taskHisDetail',
    data() {
        return {

            taskHisId: '',

            detailForm: {
                group: '',
                branch: '',
                taskInstances: [],
                result: ''
            },

            title: 'detail',
            startPos: 0,
            logThread: 0,
            term: null,

            detailVisible: false,
            dialogLoading: false,
            detailStartPos: 0,
            detailLogThread: 0,
            detailTerm: null,

            refreshListThread: 0,
        }
    },

    mounted() {

    },

    activated() {
        this.taskHisId = this.$route.query.id;
        this.detail(this.taskHisId);
    },

    methods: {

        backToChanges(){
            this.$router.push({path:'/ci/taskhis'})
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
            return '#DC143C';
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
                default:
                    return '--';
            }
        },

        startRefreshList(){
            let that = this;
            if(this.checkExistRunningTask()){
                this.refreshListThread = self.setTimeout(function () {
                    that.detailRefresh();
                }, 1 * 3000);
            }
        },

        checkExistRunningTask(){
            console.info("into check");
            if(this.detailForm.taskInstances){
                for (var i in this.detailForm.taskInstances) {
                    let taskHis = this.detailForm.taskInstances[i];
                    if(taskHis['status']==0||taskHis['status']==1){//status is create or running
                        return true;
                    }
                }
            }
            return false;
        },

        stopRefreshList(){
            //window.clearInterval(this.refreshListThread);
            window.clearTimeout(this.refreshListThread);
        },

        detailRefresh() {
            let that = this;
            this.$$api_ci_taskHisDetail({
                data: {
                    taskId: this.taskHisId,
                },
                fn: data => {
                    this.detailForm.taskInstances = data.data.taskInstances;
                    that.startRefreshList();
                }
            })
        },

        detail(id) {
            let that = this;
            this.$$api_ci_taskHisDetail({
                data: {
                    taskId: id,
                },
                fn: data => {
                    this.detailForm.group = data.data.group;
                    this.detailForm.branch = data.data.branch;
                    this.detailForm.taskInstances = data.data.taskInstances;
                    if (data.data.result) {
                        this.detailForm.result = data.data.result;
                    } else {
                        this.detailForm.result = '';
                    }
                    that.readLogTask(id);
                    that.startRefreshList();
                }
            })
        },

        //log part
        readLogTask(id){
            this.destoryReadLogTask();

            if(this.term){
                this.term.dispose();
            }
            this.term = new Terminal({
                logLevel: 'debug',
                allowTransparency: true,
                fontSize: 12,
                fontFamily: 'courier-new,courier,monospace',
                //letterSpacing: 0,//文字间隔（px）
                theme: { background: '#121319'}
            });
            const fitAddon = new FitAddon();
            this.term.loadAddon(fitAddon);

            //TODO search
            /*this.searchAddon = new SearchAddon();
            this.term.loadAddon(this.searchAddon);*/

            this.term.open(document.getElementById('terminal'));
            fitAddon.fit();
            //=============================================

            this.detailForm.result = '';
            this.startPos = 0;
            this.readLog(id);

        },

        /*test(){
            //this.searchAddon.activate(this.term);
            this.searchAddon.findNext('SUCCESS');
        },*/

        destoryReadLogTask(){
            console.debug("stop read log task");
            window.clearTimeout(this.logThread);
            if(this.term){
                this.term.dispose();
            }
        },

        readLog(taskHisId){
            console.debug("read log taskHisId="+taskHisId+" taskHisReadLog="+this.startPos);
            let that = this;
            this.$$api_ci_taskHisReadLog({
                data: {
                    taskHisId: taskHisId,
                    startPos: that.startPos+1,
                    size:10000,
                },
                fn: data => {
                    let logs = data.data.data.lines;
                    for (let i in logs) {
                        that.term.writeln(logs[i]);
                    }
                    if (!data.data.data.hasNext) {
                        window.clearTimeout(that.logThread);
                        return;
                    }
                    that.startPos = data.data.data.endPos;
                    //console.debug(that.startPos);
                    this.logThread = self.setTimeout(function () {
                        that.readLog(taskHisId);
                    }, 1 * 1000);
                },
                errFn: () => {
                    //do nothing
                }
            })
        },

        //====================================detail=============================================

        openDetail(row){
            this.detailVisible = true;
            this.title = '部署到[' + row.instanceName +']详情';
            this.dialogLoading = true;
            //在旧版1.x中，对dialog没有opened回调事件，需要手动延时
            setTimeout(() => {
                this.readLogDetailTask(row.instanceId);
            }, 300)
        },

        //log part
        readLogDetailTask(instanceId){
            //this.destoryReadLogDetailTask();
            if(this.detailTerm){
                this.detailTerm.dispose();
            }
            console.debug('before new Terminal timestamp = '+new Date().getTime());
            this.detailTerm = new Terminal({
                logLevel: 'debug',
                allowTransparency: true,
                fontSize: 12,
                fontFamily: 'courier-new,courier,monospace',
                //letterSpacing: 0,//文字间隔（px）
                theme: { background: '#121319'}
            });
            const fitAddon = new FitAddon();
            this.detailTerm.loadAddon(fitAddon);
            let detailTerminal = document.getElementById('detailTerminal');
            this.detailTerm.open(detailTerminal);
            fitAddon.fit();
            console.debug('before new Terminal timestamp = '+new Date().getTime());
            this.dialogLoading = false;
            //=============================================
            this.detailStartPos = 0;
            this.readDetailLog(instanceId);

        },

        destoryReadLogDetailTask(){
            window.clearTimeout(this.detailLogThread);
            if(this.detailTerm){
                this.detailTerm.dispose();
            }
        },

        readDetailLog(instanceId){
            var that = this;
            this.$$api_ci_taskHisReadDetailLog({
                data: {
                    taskHisId: this.taskHisId,
                    instanceId: instanceId,
                    startPos: that.detailStartPos,
                    size:10000,
                },
                fn: data => {
                    let logs = data.data.data.lines;
                    for (let i in logs) {
                        this.detailTerm.writeln(logs[i]);
                    }
                    if (!data.data.data.hasNext) {
                        window.clearTimeout(this.detailLogThread);
                        return;
                    }
                    that.detailStartPos = data.data.data.endPos;
                    //console.debug(that.startPos);
                    this.detailLogThread = self.setTimeout(function () {
                        that.readDetailLog(instanceId);
                    }, 1 * 1000);
                },
                errFn: () => {
                    //do nothing
                }
            })
        },



    },



    //离开前清除定时任务
    beforeRouteLeave(to,from,next){
        console.info("leave , stop the thread");
        this.detailVisible = false;
        this.destoryReadLogTask();
        this.stopRefreshList();
        next();
    },

}
