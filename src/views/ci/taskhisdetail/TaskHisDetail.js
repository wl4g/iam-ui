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

            startPos: 0,
            logThread: 0,
            refreshListThread: 0,
            term: null,
        }
    },

    mounted() {

    },

    activated() {
        this.detail(this.$route.query.id);
    },

    methods: {

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

        detail(id) {
            this.detailVisible = true;
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

                    if (!data.data.result) {
                        that.readLogTask(id);
                    }
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

            let that = this;
            console.info(this.detailForm.result);
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
            var that = this;
            this.$$api_ci_taskHisReadLog({
                data: {
                    taskHisId: taskHisId,
                    startPos: that.startPos,
                    size:10000,
                },
                fn: data => {
                    let logs = data.data.data.lines;
                    if (!data.data.data.hasNext) {
                        window.clearTimeout(this.logThread);
                    }
                    for (let i in logs) {
                        this.term.writeln(logs[i]);
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

    },

    //离开前清除定时任务
    beforeRouteLeave(to,from,next){
        console.info("leave , stop the thread");
        this.destoryReadLogTask();
        next();
    },

}
