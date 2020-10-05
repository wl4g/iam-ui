import { getDay, transDate } from 'utils/'
import Sortable from 'sortablejs'

export default {
    name: 'tableedit',
    data() {
        return {
            isEdit: false,
            clickNext: false,
            //查询条件
            searchParams: {
                name: '',
            },
            //弹窗表单
            saveForm: {
                id: '',
                projectId: '',
                tableName: '',
                entityName: '',
                comments: '',
                parentTableName: '',
                parentTableFkName: '',
                dataSourceName: '',
                tplCategory: '',
                packageName: '',
                moduleName: '',
                subModuleName: '',
                functionName: '',
                functionNameSimple: '',
                functionAuthor: '',
                genBaseDir: '',
                options: '',
                status: '',
                genTableColumns: [],
                optionObj: {},
                remark: '',
            },
            tableData: [],
            tables: [],
            dictTypes: [],
            attrTypes: [],
            filterSysTable: true,
            // 表单规则
            rules: {
                tableName: [
                    { required: true, message: 'You must select a table', trigger: 'change' },
                ],
                entityName: [
                    { required: true, message: 'Entity name is require', trigger: 'change' },
                ],
                functionAuthor: [
                    { required: true, message: 'Function author is require', trigger: 'change' },
                ],
                functionName: [
                    { required: true, message: 'Function name is require', trigger: 'change' },
                ],
                functionNameSimple: [
                    { required: true, message: 'Function simple name is require', trigger: 'change' },
                ],
                moduleName: [
                    { required: true, message: 'Module name is require', trigger: 'change' },
                ],
            },
            loading: true,
            activeName: 'first',
            isdeleteWithLogicalAble: false,
        }
    },

    activated() {
        this.cleanSaveForm();
        const id = this.$route.query.id;
        const projectId = this.$route.query.projectId;
        this.saveForm.id = id;
        this.saveForm.projectId = projectId;

        this.getAttrTypes(projectId);
        this.getTables();
        if (id) {//edit
            this.isEdit = true;
            this.clickNext = true;
            this.editData();
        } else {//add
            this.isEdit = false;
        }

    },

    mounted() {
        //this.getData();
        this.allDictType();
    },

    methods: {
        cleanSaveForm() {
            this.isEdit = false;
            this.clickNext = false;
            this.activeName = 'first';
            this.saveForm = {
                id: '',
                projectId: '',
                tableName: '',
                entityName: '',
                comments: '',
                parentTableName: '',
                parentTableFkName: '',
                dataSourceName: '',
                tplCategory: '',
                packageName: '',
                moduleName: '',
                subModuleName: '',
                functionName: '',
                functionNameSimple: '',
                functionAuthor: '',
                genBaseDir: '',
                options: '',
                status: '',
                genTableColumns: [],
                optionObj: {},
                remark: '',
            };
        },

        getTables() {
            if (!this.saveForm.projectId) {
                return;
            }
            this.$$api_dts_loadTables({
                data: { projectId: this.saveForm.projectId },
                fn: data => {
                    this.tables = data.data;
                }
            });
        },

        getFilterTables() {
            if (this.filterSysTable) {
                return this.tables.filter(item => {
                    //console.info(b);
                    return item.tableName.indexOf('sys_') < 0;
                })
            } else {
                return this.tables;
            }
        },

        setSort() {
            //const anchor = this.$el.querySelector("#pipe_step"+id);
            const el = this.$refs['dragTable'].$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                setData: function (dataTransfer) {
                    dataTransfer.setData('Text', '')
                },
                handle: ".handle-rank",
                onEnd: evt => {
                    const targetRow = this.saveForm.genTableColumns.splice(evt.oldIndex, 1)[0];
                    this.saveForm.genTableColumns.splice(evt.newIndex, 0, targetRow);

                    //打开注释可以看下顺序是否正确
                    /*for(let i in this.saveForm.genTableColumns){
                        console.info(this.saveForm.genTableColumns[i].columnName);
                    }*/
                }
            })
        },

        afterSelectTable() {
            this.$refs['selectTableForm'].validate((valid) => {
                if (valid) {
                    this.clickNext = true;
                    this.loadMetadata();
                }
            });
        },

        nextStep() {
            if (this.activeName == 'first') {
                this.activeName = 'second';
            } else if (this.activeName == 'second') {
                this.activeName = 'third';
            } else if (this.activeName == 'third') {

            }
        },

        loadMetadata() {
            this.$$api_dts_loadMetadata({
                data: {
                    projectId: this.saveForm.projectId,
                    tableName: this.saveForm.tableName,
                },
                fn: data => {
                    if (data.data && !data.data.genTableColumns) {
                        data.data.genTableColumns = [];
                    }
                    this.isColumnNamehadDelFlag(data.data.genTableColumns);
                    if (data.data && data.data.options) {
                        const o = JSON.parse(data.data.options);
                        if (o) {
                            data.data.optionObj = o;
                        } else {
                            data.data.optionObj = {
                                tableDeleteType: this.getDefaultDelFlag(),
                                tableEditType: 'editOnDialog',
                                isExportExcel: false,
                            };
                        }
                    } else {
                        data.data.optionObj = {
                            tableDeleteType: this.getDefaultDelFlag(),
                            tableEditType: 'editOnDialog',
                            isExportExcel: false,
                        };
                    }
                    if (!data.data.status) {
                        data.data.status = '1';
                    }
                    data.data.projectId = this.saveForm.projectId;
                    this.saveForm = data.data;
                    this.$nextTick(() => {
                        this.setSort()
                    });

                    if (data.status == 'warningTip' && data.message) {
                        this.$alert(data.message, '温馨提示', {
                            confirmButtonText: '确定',
                            dangerouslyUseHTMLString: true,
                            callback: action => {
                                // this.$message({
                                //     type: 'info',
                                //     message: `action: ${action}`
                                // });
                            }
                        });
                    }
                },
            });
        },

        getDefaultDelFlag() {
            if (this.isdeleteWithLogicalAble) {
                return "deleteWithLogical";
            } else {
                return "deleteWithPhysical";
            }
        },

        isColumnNamehadDelFlag(genTableColumns) {
            for (let i in genTableColumns) {
                if (genTableColumns[i].columnName == 'del_flag') {
                    this.isdeleteWithLogicalAble = true;
                    return;
                }
            }
            this.isdeleteWithLogicalAble = false;
        },

        saveData() {
            this.dialogLoading = true;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {

                    if (this.saveForm.optionObj) {
                        this.saveForm.options = JSON.stringify(this.saveForm.optionObj);
                    }

                    this.$$api_dts_saveGenConfig({
                        data: this.saveForm,
                        fn: data => {
                            this.back();
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                        }
                    });
                } else {
                    this.dialogLoading = false;
                }
            });
        },
        editData() {
            this.$$api_dts_genConfigDetail({
                data: {
                    tableId: this.saveForm.id,
                },
                fn: data => {
                    if (data.data && !data.data.genTableColumns) {
                        data.data.genTableColumns = [];
                    }
                    this.isColumnNamehadDelFlag(data.data.genTableColumns);
                    if (data.data && data.data.options) {
                        const o = JSON.parse(data.data.options);
                        if (o) {
                            data.data.optionObj = o;
                        } else {
                            data.data.optionObj = {
                                tableDeleteType: this.getDefaultDelFlag(),
                                tableEditType: 'editOnDialog',
                                isExportExcel: false,
                            };
                        }
                    } else {
                        data.data.optionObj = {
                            tableDeleteType: this.getDefaultDelFlag(),
                            tableEditType: 'editOnDialog',
                            isExportExcel: false,
                        };
                    }
                    this.saveForm = data.data;
                    this.$nextTick(() => {
                        this.setSort()
                    });

                    if (data.status == 'warningTip' && data.message) {
                        this.$alert(data.message, '温馨提示', {
                            confirmButtonText: '确定',
                            dangerouslyUseHTMLString: true,
                            callback: action => {
                                // this.$message({
                                //     type: 'info',
                                //     message: `action: ${action}`
                                // });
                            }
                        });
                    }
                },
            });
            this.dialogVisible = true;
            this.dialogTitle = 'Edit';
        },
        // 获取列表数据
        allDictType() {
            this.$$api_iam_allDictType({
                data: {},
                fn: data => {
                    this.dictTypes = data.data.list;
                }
            })
        },
        // 获取AttrTypes
        getAttrTypes() {
            this.$$api_dts_getAttrTypes({
                data: { projectId: this.saveForm.projectId },
                fn: data => {
                    this.attrTypes = data.data;
                }
            })
        },
        getSimpleAttrType: function (attrType) {
            let i = attrType.lastIndexOf('.');
            if (i >= 0) {
                return attrType.substring(i + 1);
            } else {
                return attrType;
            }
        },
        back() {
            this.$router.push({ path: '/dts/table', query: { id: this.saveForm.projectId } })
        }
    }
}
