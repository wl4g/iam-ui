// Generated by XCloud DevOps for Codegen, refer: http://dts.devops.wl4g.com
import {transDate, getDay} from 'utils/'
import i18n from "../../../i18n/i18n";
import dragTreeTable from "xcloud-vue-drag-tree-table";
import RightPanel from '@/components/RightPanel'
import global from "../../../common/global_variable";

export default {
    name: 'enterpriseApi',
    components: {
        dragTreeTable,
        RightPanel,
    },
    data() {
        return {

            repositoryId: '',

            versions: [],
            versionId: '',


            //module part
            modules: [],
            node_had: {},
            resolve_had: {},

            tempNode: null,

            //api part
            apiList: [],
            defaultProps: {
                children: 'children',
                label: 'name',
                isLeaf: 'leaf'
            },

            //查询条件
            searchParams: {
                apiVersion: '',
                address: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 9999,

            //弹窗表单
            saveForm: {
                moduleId: '',
                name: '',
                url: '',
                method: '',
                description: '',
            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            versionDialog: false,

            importApiDialogVisible: false,
            importApiSaveForm: {
                kind: 'OAS3',
                json: '',
                moduleId: '',
                dataFormat: 'JSON',
            },
            importLoading: false,

            exportApiDialogVisible: false,
            exportApiSaveForm: {
                kind: 'OAS3',
                moduleId: '',
                dataFormat: 'JSON',
            },
            exportLoading: false,

            exportUrl: global.getBaseUrl(global.doc, false) + '/enterpriseapi/exportApi',

            converterProviderKinds: [],

            // 表单规则
            rules: {
                name: [{ required: true, message: 'name is required', trigger: 'change' }],
                method: [{ required: true, message: 'method is required', trigger: 'change' }],
                url: [{ required: true, message: 'url is required', trigger: 'change' }],
                address: [{ required: true, message: 'address is required', trigger: 'change' }],
                apiVersion: [{ required: true, message: 'apiVersion is required', trigger: 'change' }],
                protocolType: [{ required: true, message: 'protocolType is required', trigger: 'change' }],
            },
            loading: false,

            treeData: {
                custom_field: {
                    //id: 'id',
                    //order: 'sort',
                    lists: 'children',
                    parent_id: 'parentId'
                },
                columns: [
                    {
                        title: '<i class="el-icon-plus"></i>',
                        titleOnClick: () => {
                            this.treeData.lists.push({
                                id: Math.floor(Math.random()*10000000001),
                                name: '',
                                scope: '',
                                type: '',
                                pos: '',
                                rule: '',
                                value: '',
                                required: '0',
                                children: [],
                            });
                        },
                        field: "scope",
                        width: 20,
                        align: "center",
                        isdraggable: true,
                        formatter: item => {
                            return '<i style="cursor: move" class="el-icon-rank"></i>';
                        }
                    },
                    {
                        type: "selection",
                        title: "属性名",
                        field: "name",
                        width: 200,
                        align: "center",
                        editable: true,
                    },
                    {
                        title: "scope",
                        field: "scope",
                        width: 100,
                        align: "center",
                        isdraggable: true,
                    },
                    {
                        title: "type",
                        field: "type",
                        width: 100,
                        align: "center",
                        editable: true,
                        input:{
                            type: 'select', // text | select | checkbox
                            selectData: {
                                list: [{label: 'aaa',value: '1'},{label: 'bbb',value: '2'}],
                            }
                        },
                    },{
                        title: "pos",
                        field: "pos",
                        width: 100,
                        align: "center",
                        editable: true,
                    },{
                        title: "rule",
                        field: "rule",
                        width: 100,
                        align: "center",
                        editable: true,
                    },{
                        title: "value",
                        field: "value",
                        width: 100,
                        align: "center",
                        editable: true,
                    },{
                        title: "必填",
                        field: "required",
                        width: 20,
                        align: "center",
                        editable: true,
                        input:{
                            type: 'checkbox', // text | select | checkbox
                        },
                    },
                    {
                        title: "操作",
                        type: "action",
                        flex: 1,
                        align: "center",
                        actions: [
                            {
                                text: "添加子节点",
                                onclick: (item) => {
                                    console.info('into add');
                                    if(!item.children){
                                        item.children = [];
                                    }
                                    item.children.push({
                                        id: Math.floor(Math.random()*10000000001),
                                        name: '',
                                        scope: '',
                                        type: '',
                                        pos: '',
                                        rule: '',
                                        value: '',
                                        required: '0',
                                        children: [],
                                    });
                                    item.open = true;
                                },
                                formatter: item => {
                                    return "<i class='el-icon-plus'></i>";
                                }
                            },
                            {
                                text: "删除",
                                onclick: (item, parentModel) => {
                                    console.info('into del')
                                    if(parentModel){
                                        for(let i in parentModel.children){
                                            let li = parentModel.children[i];
                                            if(item == li){
                                                parentModel.children.splice(i,1);
                                                return;
                                            }
                                        }
                                    }else{
                                        for(let i in this.treeData.lists){
                                            let li = this.treeData.lists[i];
                                            if(item == li){
                                                this.treeData.lists.splice(i,1);
                                                return;
                                            }
                                        }
                                    }

                                },
                                formatter: item => {
                                    return "<i class='el-icon-delete'></i>";
                                }
                            }
                        ]
                    }
                ],
                lists: []
            },

            treeData2: {
                custom_field: {
                    //id: 'id',
                    //order: 'sort',
                    lists: 'children',
                    parent_id: 'parentId'
                },
                columns: [
                    {
                        title: '<i class="el-icon-plus"></i>',
                        titleOnClick: () => {
                            this.treeData2.lists.push({
                                id: Math.floor(Math.random()*10000000001),
                                name: '',
                                scope: '',
                                type: '',
                                pos: '',
                                rule: '',
                                value: '',
                                required: '0',
                                children: [],
                            });
                        },
                        field: "scope",
                        width: 20,
                        align: "center",
                        isdraggable: true,
                        formatter: item => {
                            return '<i style="cursor: move" class="el-icon-rank"></i>';
                        }
                    },
                    {
                        type: "selection",
                        title: "属性名",
                        field: "name",
                        width: 200,
                        align: "center",
                        editable: true,
                    },
                    {
                        title: "scope",
                        field: "scope",
                        width: 100,
                        align: "center",
                        isdraggable: true,
                    },
                    {
                        title: "type",
                        field: "type",
                        width: 100,
                        align: "center",
                        editable: true,
                        input:{
                            type: 'select', // text | select | checkbox
                            selectData: {
                                list: [{label: 'aaa',value: '1'},{label: 'bbb',value: '2'}],
                            }
                        },
                    },{
                        title: "pos",
                        field: "pos",
                        width: 100,
                        align: "center",
                        editable: true,
                    },{
                        title: "rule",
                        field: "rule",
                        width: 100,
                        align: "center",
                        editable: true,
                    },{
                        title: "value",
                        field: "value",
                        width: 100,
                        align: "center",
                        editable: true,
                    },{
                        title: "必填",
                        field: "required",
                        width: 20,
                        align: "center",
                        editable: true,
                        input:{
                            type: 'checkbox', // text | select | checkbox
                        },
                    },
                    {
                        title: "操作",
                        type: "action",
                        flex: 1,
                        align: "center",
                        actions: [
                            {
                                text: "添加子节点",
                                onclick: (item) => {
                                    console.info('into add');
                                    if(!item.children){
                                        item.children = [];
                                    }
                                    item.children.push({
                                        id: Math.floor(Math.random()*10000000001),
                                        name: '',
                                        scope: '',
                                        type: '',
                                        pos: '',
                                        rule: '',
                                        value: '',
                                        required: '0',
                                        children: [],
                                    });
                                    item.open = true;
                                    console.info('finish add');
                                },
                                formatter: item => {
                                    return "<i class='el-icon-plus'></i>";
                                }
                            },
                            {
                                text: "删除",
                                onclick: (item, parentModel) => {
                                    console.info('into del')
                                    if(parentModel){
                                        for(let i in parentModel.children){
                                            let li = parentModel.children[i];
                                            if(item == li){
                                                parentModel.children.splice(i,1);
                                                return;
                                            }
                                        }
                                    }else{
                                        for(let i in this.treeData.lists){
                                            let li = this.treeData.lists[i];
                                            if(item == li){
                                                this.treeData.lists.splice(i,1);
                                                return;
                                            }
                                        }
                                    }

                                },
                                formatter: item => {
                                    return "<i class='el-icon-delete'></i>";
                                }
                            }
                        ]
                    }
                ],
                lists: []
            },



        }
    },
    activated() {
        let id = this.$route.query.id;
        if(id){
            this.repositoryId = id;
        }
        //TODO clean panel
        this.node_had.childNodes = [];
        this.versionId = '';
        this.cleanSaveForm();

        this.getVersionsByRepositoryId();
        this.getConverterProviderKind();
    },

    mounted() {
        /*this.getData();
        this.getVersionsByRepositoryId();*/
    },
    methods: {
        //api tree part
        isApi(data){
            return !!(data && data.moduleId);
        },

        getVersionsByRepositoryId(){
            this.$$api_doc_getVersionsByRepositoryId({
                data: {
                    repositoryId: this.repositoryId,
                },
                fn: json => {
                    this.versions = json.data;

                    if(json.data && json.data.length > 0){
                        this.versionId = json.data[0].id;
                        // TODO getByVersionIdAndParentId
                        this.loadModule(this.node_had,this.resolve_had);
                    }else{
                        //TODO clean panel
                        /*this.node_had.childNodes = [];
                        this.versionId = '';
                        this.cleanSaveForm();*/
                    }

                }
            });
        },

        loadModule(node, resolve){
            if (node.level === 0) {
                this.node_had = node;
                this.resolve_had = resolve;
            }
            if(!this.versionId || !this.versionId>0){
                console.info('not version yet')
                return;
            }

            let parentId = 0;
            if(node.data && node.data.id ){
                parentId = node.data.id;
            }
            this.$$api_doc_getByVersionIdAndParentId({
                data: {
                    versionId: this.versionId,
                    parentId: parentId,
                },
                fn: json => {
                    let data = json.data;
                    for(let i in data){
                        data[i].key = 'module_'+data[i].id;
                    }

                    if(parentId !== 0){
                        this.$$api_doc_getByModuleId({
                            data: {
                                versionId: this.versionId,
                                moduleId: parentId,
                            },
                            fn: json2 => {
                                if(json2.data && json2.data.length>0){
                                    for(let i in json2.data){
                                        json2.data[i].leaf = true;
                                        json2.data[i].key = 'api_' + json2.data[i].id;
                                    }
                                    data = data.concat(json2.data);
                                    resolve(data);
                                }else{
                                    resolve(data);
                                }
                            },
                        })
                    }else{
                        resolve(data);
                    }
                },
            })
        },

        reloadApiTree() {
                this.node_had.childNodes = [];//把存起来的node的子节点清空，不然会界面会出现重复树！
                this.loadModule(this.node_had, this.resolve_had);//再次执行懒加载的方法
        },

        refreshByNode(node, key) {
            if(!node){
                let node = this.$refs.asyncTree.getNode(key);// 通过节点id找到对应树节点对象
            }
            node.loaded = false;
            node.expand(); // 主动调用展开节点方法，重新查询该节点下的所有子节点
        },

        addDir(parent,node){

            if(!this.versionId || this.versionId == ''){
                this.$message.error("请先选择Version")
            }

            this.$prompt('请输入目录名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                if(parent){
                    this.$$api_doc_saveEnterpriseApiModule({
                        data: {
                            name: value,
                            versionId: this.versionId,
                            parentId: parent.id,
                        },
                        fn: json => {
                            this.refreshByNode(node);
                        },
                    })
                }else{
                    this.$$api_doc_saveEnterpriseApiModule({
                        data: {
                            name: value,
                            versionId: this.versionId,
                            parentId: 0,
                        },
                        fn: json => {
                            this.reloadApiTree();
                        },
                    })
                }
            }).catch(() => {
                //do nothing
            });
        },

        addApi(parent, node) {
            this.$prompt('请输入接口名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({value}) => {
                this.$$api_doc_saveEnterpriseApi({
                    data: {
                        name: value,
                        moduleId: parent.id,
                    },
                    fn: json => {
                        this.refreshByNode(node);
                    }
                });
            }).catch(() => {
                //do nothing
            });
        },

        handleNodeClick(data) {
            if(!this.isApi(data)){
                this.importApiSaveForm.moduleId = data.id;
                this.exportApiSaveForm.moduleId = data.id;
                return;
            }
            this.cleanSaveForm();
            if (!data.id) {
                return;
            }
            this.loading = true;
            this.$$api_doc_enterpriseApiDetail({
                data: {
                    id: data.id,
                },
                fn: json => {
                    this.loading = false;
                    this.saveForm = json.data;
                    //this.treeData.lists = json.data.properties;

                    //TODO
                    let requestList = [];
                    let responseList = [];
                    for(let i in json.data.properties){
                        let item = json.data.properties[i];
                        if(item.scope == 'Request'){
                            requestList.push(item);
                        }else{
                            responseList.push(item);
                        }
                    }

                    this.treeData.lists = requestList;
                    this.treeData2.lists = responseList;

                },
                errFn: () => {
                    this.loading = false;
                }
            });
        },


        delApiOrDir(data, node){
            if(this.isApi(data)){
                this.delData(data);
            }else{
                if(node.parent.data.children){
                    for(let i in node.parent.data.children){
                        if(node.parent.data.children[i] == data){
                            node.parent.data.children.splice(i, 1);
                            return;
                        }
                    }
                }else if(node.parent.data){
                    for(let i in node.parent.data){
                        if(node.parent.data[i] == data){
                            node.parent.data.splice(i, 1);
                            return;
                        }
                    }
                }
            }
        },
        cleanSaveForm() {
            this.saveForm = {
                moduleId: '',
                name: '',
                url: '',
                method: '',
                description: '',
            };
            this.treeData.lists = [];
        },
        saveData() {
            this.loading = true;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.saveForm.properties = this.treeData.lists.concat(this.treeData2.lists);
                    this.$$api_doc_saveEnterpriseApi({
                        data: this.saveForm,
                        fn: json => {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.loading = false;
                        },
                        errFn: () => {
                            this.loading = false;
                        }
                    });
                }else {
                    this.loading = false;
                }
            });
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
                this.$$api_doc_delEnterpriseApi({
                    data: {
                        id: row.id,
                    },
                    fn: json => {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                        //this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        clickBtn(row){
            console.info(row);
        },

        onTreeDataChange(list) {
            this.treeData.lists = list;
        },

        onTreeDataChange2(list) {
            this.treeData2.lists = list;
        },

        versionList(){
            this.getVersionsByRepositoryId();
        },

        addVersion(){
            this.$prompt('请输入版本', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$$api_doc_saveEnterpriseProjectVersion({
                    data: {
                        repositoryId: this.repositoryId,
                        version: value
                    },
                    fn: json => {
                        this.versionList();
                    },
                    errFn: () => {
                    }
                });
            }).catch(() => {
                //do nothing
            });
        },

        delVersion(row){
            if (!row.id) {
                return;
            }
            this.$confirm('Confirm?', 'warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$$api_doc_delEnterpriseProjectVersion({
                    data: {
                        id: row.id,
                    },
                    fn: json => {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                        //this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        openImportApiDialog(){
            if(!this.importApiSaveForm.moduleId || this.importApiSaveForm.moduleId == ''){
                this.$message.error("请先选择要导入模块或目录")
                return;
            }

            this.importApiSaveForm.kind = 'OAS3';
            this.importApiSaveForm.json = '';
            this.importApiDialogVisible = true;
        },

        importApi(){
            this.importLoading = true;
            this.$$api_doc_importApi({
                data: this.importApiSaveForm,
                fn: json => {
                    this.$message({
                        message: 'Success',
                        type: 'success'
                    });
                    this.importLoading = false;
                    this.importApiDialogVisible = false;
                    //this.getData();
                },
                errFn: () =>  {
                    this.importLoading = false;
                }
            })
        },

        handleCommand(command){
            switch (command){
                case 'import':
                    this.openImportApiDialog();
                    break;
                case 'export':
                    this.openExportApiDialog();
                    break;
                default: break;
            }
        },

        openExportApiDialog(){
            if(!this.exportApiSaveForm.moduleId || this.exportApiSaveForm.moduleId == ''){
                this.$message.error("请先选择要导出模块或目录")
                return;
            }

            this.exportApiSaveForm.kind = 'OAS3';
            this.exportApiDialogVisible = true;
        },

        exportApi(){
            let exportUrl = this.exportUrl+"?kind=" + this.exportApiSaveForm.kind + "&moduleId="+ this.exportApiSaveForm.moduleId;
            window.location.href = exportUrl;
            this.exportApiDialogVisible = false;
        },

        getConverterProviderKind(){
            this.$$api_doc_getConverterProviderKind({
                data: {},
                fn: json => {
                    this.converterProviderKinds = json.data;
                },
            })
        },




    }
}
