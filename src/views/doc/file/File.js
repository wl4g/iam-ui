import global from "../../../common/global_variable";

export default {
    name: 'file',
    data() {
        return {
            searchParams: {
                name: '',
                lang: '',
                labelId: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //列表Data
            tableData: [],
            labelData: [],

            dialogVisible: false,
            saveForm: {
                name: '',
                docCode: '',
                lang: '',
                labelIds: [],
                description: '',
                content: '',
                fileList: [],
            },

            uploadUrl: global.getBaseUrl(global.doc,false)+'/file/upload',
            browseUrl: global.getBaseUrl(global.doc,false)+'/view/index.html',

            shareDialogVisible: false,
            shareText: '',

            // 表单规则
            rules: {
                name: [
                    {required: true, message: 'Please Input name', trigger: 'change' },
                    { min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur' }
                ],
            },

        }
    },

    mounted() {

    },

    activated() {
        this.allLabel();
        this.getData();
    },

    methods: {
        onSubmit() {
            this.getData();
        },
        currentChange(i) {
            this.pageNum = i;
            this.getData();
        },
        getData() {
            this.$$api_doc_docList({
                data: {
                    name: this.searchParams.name,
                    lang: this.searchParams.lang,
                    labelId: this.searchParams.labelId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    this.total = data.data.total;
                    this.tableData = data.data.records;
                }
            })
        },
        add(){
            this.$router.push({path:'/doc/mdEdit'})
        },
        edit(row){
            this.$router.push({path:'/doc/mdEdit',query: {id: row.id}})
        },
        delData(row){
            if(!row){
                return;
            }
            this.$confirm('Confirm?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_doc_delDoc({
                    data: {
                        id: row.id,
                    },
                    fn: data => {
                        this.getData();
                    }
                })
            }).catch(() => {
                //do nothing
            });
        },
        allLabel(){
            this.$$api_doc_allLabel({
                data: {},
                fn: data => {
                    this.labelData = data.data;
                }
            })
        },
        compareFile(row){
            this.$router.push({path:'/doc/diff',query: {docCode: row.dodCode}})
        },
        uploadSuccess(response, file, fileList){
            console.info(response,file,fileList);
            this.saveForm.content = response.data.path;
            this.saveForm.docCode = response.data.docCode;
        },
        uploadFail(err, file, fileList){
            this.$message.error('upload fail');
        },
        onExceed(files, fileList){
            this.$message.error('只能上传一个文件');
        },
        cleanSaveForm() {
            this.saveForm = {
                name: '',
                lang: '',
                labelIds: [],
                description: '',
                content: '',
                fileList: [],
            };
        },
        openUploadForm(){
            this.cleanSaveForm();
            this.dialogVisible = true;
        },
        saveData(){
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_doc_saveUpload({
                        data: this.saveForm,
                        fn: data => {
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
                        },
                    });
                }else {
                    this.dialogLoading = false;
                }
            });
        },
        browseFile(row){
            let url = this.browseUrl+"?code="+row.docCode
            if(row.passwd){
                url = url + "&passwd=" + row.passwd;
            }
            window.open(url, '_blank');
        },
        shareDoc(row){
            this.isEncryptFile(row);
        },
        isEncryptFile(row){
            this.$confirm('是否加密文件?', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '是',
                cancelButtonText: '否'
            }).then(() => {
                this.$$api_doc_shareDoc({
                    data: {
                        id: row.id,
                        isEncrypt:true
                    },
                    fn: data => {
                        row.passwd = data.data;
                        row.shareType = 1;
                        this.showShareInfo(row);
                    },
                });
            }).catch(action => {
                if(action === 'cancel'){
                    this.$$api_doc_shareDoc({
                        data: {
                            id: row.id,
                            isEncrypt:false
                        },
                        fn: data => {
                            row.shareType = 0;
                            this.showShareInfo(row);
                        },
                    });
                }
            });
        },
        showShareInfo(row){
            //e.g: 链接:https://pan.baidu.com/s/aaaaaaaaaaaaaaaaa  密码:k2hn
            this.shareText = '链接:'+this.browseUrl+"?code="+row.docCode;
            if(row.passwd){
                this.shareText = this.shareText + ' 密码:' + row.passwd;
            }
            this.shareDialogVisible = true;
        },
        onCopySuccess(){
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        }

    },
}


