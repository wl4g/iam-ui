import dateutils from "../../../common/dateutils";
import global from "../../../common/global_variable";
import axios from 'axios'

export default {
    name: 'mdEdit',
    data() {
        var validateLabels = (rule, value, callback) => {
            console.info(value.length);
            if (value.length<=0) {
                callback(new Error('Label is Empty'));
            } else {
                callback();
            }
        };
        return {
            changesData: [],

            saveForm:{
                id: '',
                type: 'md',
                name: '',
                lang: '',
                content: '',
                description: '',
                fileCode: '',
                labelIds: [],
            },

            labelData: [],

            uploadUrl: global.getBaseUrl(global.share,false)+'/fs/uploadImg',

            rules: {
                name: [
                    {required: true, message: 'Please Input name', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
                lang: [
                    {required: true, message: 'Please select language', trigger: 'change' },
                ],
                labelIds: [
                    { validator: validateLabels,required: true, trigger: 'change' },
                ],
            },
        }
    },

    mounted() {

        const SHARE_BASE_URL = "₤shareBaseUrl₤";
        const SHARE_BASE_URL_TRAN = "%E2%82%A4shareBaseUrl%E2%82%A4";

        const  md = this.$refs.md.markdownIt;
        let defaultRender = md.renderer.rules.image;
        let baseUrl = global.getBaseUrl(global.share,false);
        md.renderer.rules.image = function (tokens, idx, options, env, self) {
            console.info(tokens)
            if(!tokens){
                return defaultRender(tokens, idx, options, env, self);
            }
            for(let i in tokens){
                let attrs = tokens[i]['attrs'];
                for(let j in attrs){
                    let attr = attrs[j];
                    if(attr && attr[0] && attr[0]=='src' && attr[1]){
                        if(attr[1].indexOf(SHARE_BASE_URL_TRAN) != -1){
                            attr[1] = attr[1].replace(new RegExp(SHARE_BASE_URL_TRAN,'g'),baseUrl);
                        }else if (attr[1].indexOf(SHARE_BASE_URL) != -1){
                            attr[1] = attr[1].replace(new RegExp(SHARE_BASE_URL,'g'),baseUrl);
                        }
                    }
                }
            }
            return defaultRender(tokens, idx, options, env, self);
        };
    },

    activated() {
        this.getLabelData();
        this.cleanSaveForm();
        this.saveForm.id = this.$route.query.id;
        if(this.saveForm.id){
            this.detail();
        }
    },

    methods: {
        save(){
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_doc_saveDoc({
                        data:  this.saveForm,
                        fn: data => {
                            this.cleanSaveForm();
                            this.$router.push({path:'/doc/file'})
                        }
                    })
                } else {
                    console.log('validate fail!!');
                }
            });



        },
        goBack(){
            this.$router.push({path:'/doc/file'})
        },
        detail(){
            this.$$api_doc_fileDetail({
                data: {
                    id: this.saveForm.id,
                },
                fn: data => {
                    if(data.data){
                        this.saveForm = data.data;
                    }
                    this.getChanges();
                }
            })
        },
        getChanges(){
            this.$$api_doc_getHistoryByFileCode({
                data: {
                    fileCode: this.saveForm.fileCode
                },
                fn: data => {
                    this.changesData = data.data;
                }
            })
        },
        cleanSaveForm(){
            this.saveForm = {
                id: '',
                type: 'md',
                name: '',
                lang: '',
                content: '',
                description: '',
                fileCode: '',
                labelIds: [],
            };
            this.changesData = [];
            this.changesId = '';
        },
        changeChangesId(){
            this.detail();
        },
        getLabelData(){
            this.$$api_doc_allLabel({
                data: {},
                fn: data => {
                    this.labelData = data.data;
                }
            })
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
        },
        imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append('img', $file);
            axios({
                url: this.uploadUrl,
                method: 'post',
                data: formdata,
                withCredentials:true,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((data) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                /**
                 * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                 * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                 * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                 */
                if(!data||!data.data||!data.data.data){
                    return;
                }
                if(data.data.code !== 200){
                    this.$message.error('上传图片失败');
                }
                console.info(data);
                this.$refs.md.$img2Url(pos, data.data.data);
            })
        }

    },
}


