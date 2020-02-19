import CodeDiff from 'vue-code-diff'
import dateutils from "../../../common/dateutils";

export default {
    name: 'Diff',
    components: {CodeDiff},
    data() {
        return {

            docCode: '',

            changesData: [],

            file1: '',
            file2: '',

            file1lang: '',
            file2lang: '',

            file1dec: '',
            file2dec: '',

            file1Str: '',
            file2Str: '',
        }
    },

    mounted() {

    },

    activated() {
        this.cleanFile();
        this.docCode = this.$route.query.docCode;
        this.getChanges();
    },

    methods: {
        changeChangesId() {
            if(!this.file1 || !this.file2){
                return;
            }
            this.$$api_doc_fileCompareWith({
                data: {
                    oldChangesId: this.file1,
                    newChangesId: this.file2
                },
                fn: data => {
                    if(data.data){
                        this.file1Str = data.data.oldFileChanges.content;
                        this.file2Str = data.data.newFileChanges.content;
                        this.file1dec = data.data.oldFileChanges.description;
                        this.file2dec = data.data.newFileChanges.description;
                        this.file1lang = data.data.oldFileChanges.lang;
                        this.file2lang = data.data.newFileChanges.lang;
                    }
                }
            })
        },
        getChanges(){
            this.$$api_doc_getHistoryByDocCode({
                data: {
                    docCode: this.docCode
                },
                fn: data => {
                    this.changesData = data.data;
                    if(this.changesData && this.changesData.length>=2){// 默认选择最后两条记录
                        this.file1 = this.changesData[1].id;
                        this.file2 = this.changesData[0].id;
                    }else if(this.changesData && this.changesData.length==1){
                        this.file1 = this.changesData[0].id;
                        this.file2 = this.changesData[0].id;
                    }
                    this.changeChangesId();
                }
            })
        },
        goBack(){
            this.$router.push({path:'/doc/file'})
        },
        cleanFile() {
            this.docCode = '';
            this.changesData = [];
            this.file1 = '';
            this.file2 = '';
            this.file1dec = '';
            this.file2dec = '';
            this.file1Str = '';
            this.file2Str = '';
        },
        getHistoryLabel(item){
            let s = dateutils.dateFormat("YYYY-mm-dd HH:MM:SS", item.createDate);
            if( item.createByStr ){
                s = s + ' / ' + item.createByStr;
            }
            if(item.description && item.description.length>30){
                s = s +' / '+ item.description.substring(0,30)+'...';
            }else{
                s = s +' / ' + item.description;
            }
            return s;
        }


    },
}


