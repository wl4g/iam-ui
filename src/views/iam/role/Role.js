import {getDay, transDate} from 'utils/'

export default {
    name: 'role',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
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
            },

            isEdit: false,

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            //rolesData
            menuData:[],

            defaultProps: {
                children: 'children',
                label: 'displayName',
            },
            treeShow: false,



        }
    },

    mounted() {
        this.getData();
        this.getMenus();

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
            this.isEdit = false;
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = '新增';
        },

        // 获取列表数据
        getData() {
            this.$$api_iam_list({
                data: {
                    name: this.searchParams.name,
                    displayName: this.searchParams.displayName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.total = data.data.page.total;
                        this.tableData = data.data.list;
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
            };
        },


        save() {
            if(this.saveForm.oldPassword!=this.saveForm.password || this.saveForm.oldPassword==''){//need update password
                this.saveDataWithPassword();
            }else{//needn't update password
                this.saveData();
            }
        },

        saveDataWithPassword(){
            let loginAccount = this.saveForm.userName;
            this.$$api_iam_loginCheck({
                data: {
                    principal: loginAccount,
                    verifyType: 'VerifyWithSimpleGraph',
                },
                fn: data => {
                    if (data.data&&data.data.checkGeneral&&data.data.checkGeneral.secret) {
                        let secret = data.data.checkGeneral.secret;
                        let password = window.IAM.Crypto.rivestShamirAdleman(secret,this.saveForm.password);
                        this.saveData(password);
                    }
                },
                errFn: data => {
                    this.dialogLoading = false;
                    this.$alert('访问失败，请稍后重试！', '错误', {
                        confirmButtonText: '确定',
                    });
                }
            });
        },

        saveData(password) {
            //this.dialogLoading = true;
            this.saveForm.password = password;
            this.$$api_iam_saveUser({
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
            this.cleanSaveForm();
            this.isEdit = true;
            if (!row.id) {
                return;
            }
            this.$$api_iam_userDetail({
                data: {
                    userId: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        console.info(data.data.data);
                        this.saveForm = data.data.data;
                        this.saveForm.oldPassword = this.saveForm.password;

                        if(this.$refs.modulesTree && this.saveForm.groupIds instanceof Array){
                            this.$refs.modulesTree.setCheckedKeys(this.saveForm.groupIds);
                            this.checkChange();
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
            this.$$api_iam_delUser({
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

        //模块权限树选择
        checkChange(node, selfChecked, childChecked) {
            var checkedKeys = this.$refs.modulesTree.getCheckedKeys();
            var checkedNodes = this.$refs.modulesTree.getCheckedNodes();

            let moduleNameList = [];
            checkedNodes.forEach(function(item){
                moduleNameList.push(item.displayName)
            });
            this.saveForm.menuIds = checkedKeys;
            this.$set(this.saveForm,'menuNameStrs',moduleNameList.join(','))

        },


    }
}
