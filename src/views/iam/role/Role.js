import {getDay, transDate} from 'utils/'

export default {
    name: 'role',
    data() {
        return {
            //查询条件
            searchParams: {
                roleCode: '',
                displayName: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                displayName: '',
                name: '',
                menuIds: [],
                menuNameStrs: '',
                groupIds: [],
                groupNameStrs: '',
            },

            isEdit: false,

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            //rolesData
            menuData:[],//tree
            menuDataList:[],//list

            defaultProps: {
                children: 'children',
                label: 'displayName',
            },
            treeShow: false,

            groupTreeShow: false,
            groupsTreeData:[],


        }
    },

    mounted() {
        this.getData();
        this.getMenus();
        this.getGroupsTree();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        getMenus(){
            this.$$api_iam_getMenuTree({
                data: {

                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.menuData = data.data.data;
                        this.menuDataList = data.data.data2;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        getGroupsTree(){
            this.$$api_iam_getGroupsTree({
                data: {

                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.groupsTreeData = data.data.data;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },


        addData() {
            this.getMenus();
            this.getGroupsTree();

            this.isEdit = false;
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        // 获取列表数据
        getData() {
            this.$$api_iam_roleList({
                data: {
                    name: this.searchParams.roleCode,
                    displayName: this.searchParams.displayName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.total = data.data.total;
                        this.tableData = data.data.records;
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },

        cleanSaveForm() {
            this.saveForm = {
                displayName: '',
                name: '',
                menuIds: [],
                menuNameStrs: '',
                groupIds: [],
                groupNameStrs: '',
            };
        },


        saveData() {
            this.$$api_iam_saveRole({
                data: this.saveForm,
                fn: data => {
                    this.dialogLoading = false;
                    if (data.code == 200) {
                        this.dialogVisible = false;
                        this.getData();
                        this.cleanSaveForm();
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    this.dialogLoading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            });
        },


        editData(row) {
            this.getMenus();
            this.getGroupsTree();

            this.cleanSaveForm();
            this.isEdit = true;
            if (!row.id) {
                return;
            }
            this.$$api_iam_roleDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        console.info(data.data.data);
                        this.saveForm = data.data.data;

                        if(this.$refs.modulesTree && this.saveForm.menuIds instanceof Array){
                            this.$refs.modulesTree.setCheckedKeys(this.saveForm.menuIds);
                            this.checkChange();
                        }

                        if(this.$refs.modulesTree2 && this.saveForm.groupIds instanceof Array){
                            this.$refs.modulesTree2.setCheckedKeys(this.saveForm.groupIds);
                            this.checkChange2();
                        }

                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })

            this.dialogVisible = true;
            this.dialogTitle = '编辑';
        },


        delData(row) {
            if (!row.id) {
                return;
            }
            this.$$api_iam_delRole({
                data: {
                    userId: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: 'del success',
                            type: 'success'
                        });
                        this.getData();
                    } else {
                        this.$alert(data.message, '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                },
                errFn: () => {
                    //this.loading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },


        //模块权限树展示
        focusDo() {
            if(this.$refs.modulesTree && this.saveForm.menuIds instanceof Array) this.$refs.modulesTree.setCheckedKeys(this.saveForm.menuIds)
            this.treeShow = !this.treeShow;
            let _self = this;
            this.$$lib_$(document).bind("click",function(e){
                let target  = _self.$$lib_$(e.target);
                if(target.closest(".noHide").length == 0 && _self.treeShow){
                    _self.treeShow = false;
                }
                e.stopPropagation();
            })
        },

        getChild(node,list){
            if(node&&node['children']){
                let children = node['children'];
                for(let i = 0; i<children.length;i++){
                    list.push(children[i]['id']);
                    this.getChild(children[i],list);
                }
            }
            return list;
        },

        //模块权限树选择
        checkChange(node, selfChecked, childChecked) {
            let checkedKeys = this.$refs.modulesTree.getCheckedKeys();
            if(selfChecked){
                let parentList = this.getParent(this.menuDataList, node.parentId, []);
                checkedKeys = checkedKeys.concat(parentList)
                this.$refs.modulesTree.setCheckedKeys(checkedKeys)
            }else{
                let childList = this.getChild( node, []);
                checkedKeys = checkedKeys.filter(v => {
                    let flag = true;
                    for (var i = 0; i < childList.length; i++) {
                        if(v == childList[i]){
                            flag = false
                        }
                    }
                    return flag
                });
                this.$refs.modulesTree.setCheckedKeys(checkedKeys)

            }
            let checkedNodes = this.$refs.modulesTree.getCheckedNodes();
            let moduleNameList = [];
            checkedNodes.forEach(function(item){
                moduleNameList.push(item.displayName)
            });
            this.saveForm.menuIds = checkedKeys;
            console.info(this.saveForm.menuIds);
            this.$set(this.saveForm,'menuNameStrs',moduleNameList.join(','))
        },

        getParent(list, parentId, parentList) {
            if (parentId == '0') return;
            for (let i = 0; i < list.length; i++) {
                if (parentId == list[i].id) {
                    parentList.push(list[i].id);
                    this.getParent(list, list[i].parentId, parentList)
                }
            }
            return parentList
        },


        //模块权限树展示
        focusDo2() {
            if(this.$refs.modulesTree2 && this.saveForm.groupIds instanceof Array) this.$refs.modulesTree2.setCheckedKeys(this.saveForm.groupIds)
            this.groupTreeShow = !this.groupTreeShow;
            let _self = this;
            this.$$lib_$(document).bind("click",function(e){
                let target  = _self.$$lib_$(e.target);
                if(target.closest(".noHide").length == 0 && _self.groupTreeShow){
                    _self.groupTreeShow = false;
                }
                e.stopPropagation();
            })
        },

        //模块权限树选择
        checkChange2(node, selfChecked, childChecked) {
            var checkedKeys = this.$refs.modulesTree2.getCheckedKeys();
            var checkedNodes = this.$refs.modulesTree2.getCheckedNodes();

            let moduleNameList = [];
            checkedNodes.forEach(function(item){
                moduleNameList.push(item.displayName)
            });
            this.saveForm.groupIds = checkedKeys;
            //this.saveForm.groupNameStrs = moduleNameList.join(',');
            this.$set(this.saveForm,'groupNameStrs',moduleNameList.join(','))

        },




    }
}
