import global from "../../../common/global_variable";
import de from "element-ui/src/locale/lang/de";

export default {
    name: 'Fs',
    data() {
        return {

            currentPath: '/',
            routePath:[{
                name: '/',
                path: '/',
            }],

            loading: false,

            //查询条件
            searchParams: {
                cossProvider: '',
                bucketName: '',
                prefix: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            fistRow: [],
            tableData: [],

            detailDialog: false,

            uploadDialog: false,
            fileList: [],
            uploadUrl: global.getBaseUrl(global.coss,false)+'/webservice/putObject',
            uploadData:{
                cossProvider: '',
                bucketName: '',
                key: '',
                //
                uploadToType: '1',
                uploadPath: '',
                acl: 'default',
            },

            acls: [],

            aclDialog: false,
            aclForm: {
                acl: '',
                key: '',
            },

            detailData: {
                metadata:{},
                downloadUrl: ''
            },

            createDrDialog: false,
            dirName: '',

            headDialog: false,
            headForm: {
                contentType: '',
                contentEncoding: '',
                contentDisposition: '',
                cacheControl: '',
                etime: '',
                userMetadata:[],
            },

        }
    },

    mounted() {

    },

    activated() {
        this.searchParams.cossProvider = this.$route.query.cossProvider;
        this.searchParams.bucketName = this.$route.query.bucketName;
        this.currentPath = '/';

        this.getData();
        this.getACLs();
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
        // 获取列表数据
        getData() {
            this.total = 4;
            this.loading = true;
            this.$$api_coss_listObjects({
                data: {
                    cossProvider: this.searchParams.cossProvider,
                    prefix: this.currentPath + this.searchParams.prefix,
                    bucketName: this.searchParams.bucketName,
                    marker: null,//TODO
                    maxKeys: 10,
                }, fn: data => {
                    this.tableData = [
                        {key:['/',data.data.bucketName]},
                    ];
                    this.tableData = this.tableData.concat(data.data.objectSummaries);
                    console.info(this.tableData);
                    this.loading = false;
                }
            });
        },


        nextPath(subPath){
            this.currentPath = this.currentPath + subPath;
            this.routePath.push({
                name: subPath,
                path: this.currentPath,
            });
            this.getData();
        },

        prePath(){
            if(this.currentPath.length<=1){
                this.currentPath = "/";
                this.getData();
            }else {
                const str = this.currentPath.substring(0,this.currentPath.length-1);
                const i = str.lastIndexOf("/");
                this.currentPath = str.substring(0,i+1);
                this.routePath.splice(this.routePath.length-1, 1);
                this.getData();
            }


        },

        isDir(key){
            const i = key.lastIndexOf("/");
            if(i>0 && i===key.length-1){
                return true;
            }else {
                return false;
            }
        },

        changePath(path){
            this.currentPath = path;
            this.getData();

            const paths = path.split('/');
            this.routePath = [{
                name: '/',
                path: '/',
            }];
            let temp = '/';
            for(let i in paths){
                if(paths[i]===''){
                    continue;
                }
                temp = temp + paths[i]+'/';
                this.routePath.push({
                    name: paths[i]+'/',
                    path: temp,
                })
            }

        },

        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if(rowIndex === 0){
                if (columnIndex === 1) {
                    return [1, 7];
                }else if(columnIndex === 0){
                    return [1, 1];
                } else {
                    return [0, 0];
                }
            }
            return [1,1];
        },

        firstRowSelectable(row, index){
            if(index === 0) {
                return false;
            }else {
                return true;
            }
        },

        handleCommand(command){
            const  action = command.action;
            const row = command.row;
            if(action === 'getAcl'){
                this.getAcl(this.currentPath + row.key)
            }else if(action === 'deleteObject'){
                this.deleteObject(row);
            }
        },


        openOetailDialog(row){
            if(row.key.endsWith("/")){
                this.nextPath(row.key);
            }else{
                this.getObject(this.currentPath + row.key);
                this.detailDialog = true;
            }
        },

        back(){
            this.$router.push({path:'/coss/bucketdetail',query: {cossProvider: this.searchParams.cossProvider, bucketName: this.searchParams.bucketName,}})
        },

        dateFormat(row, column){
            var moment = require('moment');
            var date = row[column.property];
            if (!date || date === 0) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        },

        openUploadDialog(){
            this.uploadDialog = true;
            this.fileList = [];
            this.uploadData = {
                cossProvider: this.searchParams.cossProvider,
                bucketName: this.searchParams.bucketName,
                key: this.currentPath,
                uploadToType: '1',
                uploadPath: '',
                acl: 'default',

            }
        },
        submitUpload(){
            if(this.uploadData.uploadToType ==2){
                this.uploadData.key = this.uploadData.uploadPath;
            }
            this.$refs.upload.submit();
        },
        beforeUpload(file){

        },
        uploadSuccess(response, file, fileList){
            console.info(response)
            this.$message.success('Success');
            this.uploadDialog = false;
            this.getData();
        },
        uploadFail(err, file, fileList){
            this.$message.error(err);
        },
        onExceed(files, fileList){
            this.$message.error('最多只能同时上传个文件');
        },

        deleteObject(row){
            this.$confirm('confirm?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$$api_coss_deleteObject({
                    data: {
                        cossProvider: this.searchParams.cossProvider,
                        bucketName: this.searchParams.bucketName,
                        key: row.key,
                    }, fn: data => {
                        this.$message({
                            type: 'success',
                            message: 'Success'
                        });
                        this.getData();
                    }
                });
            }).catch(() => {

            });
        },

        getACLs(){
            this.$$api_coss_getACLs({
                data: {},
                fn: data => {
                    this.acls = data.data;
                }
            });
        },


        getAcl(key){
            this.aclForm = {
                acl: '',
                key: '',
            },
            this.$$api_coss_getObjectAcl({
                data: {
                    cossProvider: this.searchParams.cossProvider,
                    bucketName: this.searchParams.bucketName,
                    key: key,
                }, fn: data => {
                    this.aclForm.acl = data.data.acl;
                    this.aclForm.key = key;
                    this.aclDialog = true;
                }
            });
        },

        setAcl(){
            this.$$api_coss_setObjectAcl({
                data: {
                    cossProvider: this.searchParams.cossProvider,
                    bucketName: this.searchParams.bucketName,
                    key: this.aclForm.key,
                    acl: this.aclForm.acl,
                }, fn: data => {
                    this.aclDialog = false;
                    if(!this.isDir(this.aclForm.key)){
                        this.getObject(this.aclForm.key);
                    }
                }
            });
        },

        getObject(key){
            this.detailData = {
                metadata:{},
            };
            this.$$api_coss_getObject({
                data: {
                    cossProvider: this.searchParams.cossProvider,
                    bucketName: this.searchParams.bucketName,
                    key: key,
                }, fn: data => {
                    this.detailData = data.data;
                    this.detailData.downloadUrl = global.getBaseUrl(global.coss,false)+'/webservice/download' + "?bucketName=" +this.searchParams.bucketName +"&key="+key+"&cossProvider="+this.searchParams.cossProvider;
                }
            });
        },

        openCreateDrDialog(){
            this.dirName = '';
            this.createDrDialog = true;
        },

        createDir(){
            this.$$api_coss_createDir({
                data: {
                    bucketName: this.searchParams.bucketName,
                    currentPath: this.currentPath,
                    dirName: this.dirName,
                }, fn: data => {
                    this.$message({
                        message: 'Success',
                        type: 'success'
                    });
                    this.createDrDialog = false;
                    this.getData();
                }
            });
        },

        onCopySuccess(){
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        },

        getHead(key){
            this.headDialog = true;
            this.modifyHead();
        },

        modifyHead(){
            if(!this.detailData || !this.detailData.metadata){
                return;
            }
            this.headForm =  {
                contentType: this.detailData.metadata.contentType,
                contentEncoding: this.detailData.metadata.contentEncoding,
                contentDisposition: this.detailData.metadata.contentDisposition,
                cacheControl: this.detailData.metadata.cacheControl,
                etime: this.detailData.metadata.etime,

                contentLength: this.detailData.metadata.contentLength,
                contentMd5: this.detailData.metadata.contentMd5,
                etag: this.detailData.metadata.etag,
                versionId: this.detailData.metadata.versionId,
                mtime: this.detailData.metadata.mtime,
                atime: this.detailData.metadata.atime,
                acl: this.detailData.metadata.acl,
            };
            //map ==> list
            this.headForm.userMetadata = []
            for(let key in this.detailData.metadata.userMetadata) {
                this.headForm.userMetadata.push({
                    name: key,
                    value: this.detailData.metadata.userMetadata[key],
                })
            }
        },

        addRow(){
            this.headForm.userMetadata.push({
                name: '',
                value: '',
            })
        },

        deleteRow(index){
            this.headForm.userMetadata.splice(index, 1);
        },

        putObjectMetaData(){
            debugger
            /*var map = new Map();
            for(let i in this.headForm.userMetadata){
                map.set(this.headForm.userMetadata[i].name,this.headForm.userMetadata[i].value);
            }*/
            let map = {}
            this.headForm.userMetadata.forEach(row => {
                map[row.name] = row.value;
            })

            this.detailData.metadata =  {

                bucketName: this.searchParams.bucketName,
                key: this.detailData.key,

                contentType: this.headForm.contentType,
                contentEncoding: this.headForm.contentEncoding,
                contentDisposition: this.headForm.contentDisposition,
                cacheControl: this.headForm.cacheControl,
                etime: this.headForm.etime,

                contentLength: this.headForm.contentLength,
                contentMd5: this.headForm.contentMd5,
                etag: this.headForm.etag,
                versionId: this.headForm.versionId,
                mtime: this.headForm.mtime,
                atime: this.headForm.atime,
                acl: this.headForm.acl,
            };
            this.detailData.metadata.param = {};
            this.detailData.metadata.param.cossProvider =  this.searchParams.cossProvider;
            this.detailData.metadata.userMetadata = map;
            this.$$api_coss_putObjectMetaData({
                data: this.detailData.metadata,
                fn: data => {
                    this.$message({
                        message: 'Success',
                        type: 'success'
                    });
                    this.headDialog = false;
                    this.getObject(this.detailData.key);
                }
            });



        },







    },
}

