import { transDate, getDay } from 'utils/'
import fa from "element-ui/src/locale/lang/fa";
import { store as utilstore } from "../../../utils";

export default {
    name: 'project',
    data() {
        return {
            isEdit: false,
            saveLoading: false,
            //弹窗表单
            saveForm: {
                id: '',
                projectName: '',
                datasourceId: '',
                organName: '',
                providerSet: '',
                packageName: '',
                version: '',
                author: '',
                since: '',
                copyright: '',
                remark: '',
                extraOptions: [],
                organType: '',
            },
            // 表单规则
            rules: {
                projectName: [
                    { required: true, message: 'Project name is requires', trigger: 'change' },
                    {
                        validator: function (rule, value, callback) {
                            if (/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(value)) {
                                callback(); // Pass
                            } else {
                                callback(new Error("Project name can only be a combination of upper and lower case letters and numbers, The initial letter can only be a letter and the total length is greater than 1"));
                            }
                        },
                        trigger: "change"
                    }
                ],
                organType: [
                    { required: true, message: 'Organ type is requires. e.g: com|io|org|cn', trigger: 'change' },
                    {
                        validator: function (rule, value, callback) {
                            if (/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(value)) {
                                callback(); // Pass
                            } else {
                                callback(new Error("Organ type can only be a combination of upper and lower case letters and numbers, The initial letter can only be a letter and the total length is greater than 1"));
                            }
                        },
                        trigger: "change"
                    }
                ],
                organName: [
                    { required: true, message: 'Organ name is requires. e.g: mycompany', trigger: 'change' },
                    {
                        validator: function (rule, value, callback) {
                            if (/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(value)) {
                                callback(); // Pass
                            } else {
                                callback(new Error("Organ name can only be a combination of upper and lower case letters and numbers, The initial letter can only be a letter and the total length is greater than 1"));
                            }
                        },
                        trigger: "change"
                    }
                ],
                version: [
                    { required: true, message: 'Verion is requires', trigger: 'change' },
                ],
                packageName: [
                    { required: true, message: 'Source file package path is requires', trigger: 'change' },
                ],
                author: [
                    { required: true, message: 'Authors is requires', trigger: 'change' },
                ],
                providerSet: [
                    { required: true, message: 'Generators group is requires', trigger: 'change' },
                ],
                selectedValue: [
                    { required: true, message: 'At least one configuration item must be selected', trigger: 'change' },
                ],
            },
            loading: false,
            datasources: []
        }
    },

    activated() {
        this.cleanSaveForm();
        this.getDatasources();
        const id = this.$route.query.id;
        this.saveForm.id = id;
        if (id) {//edit
            this.isEdit = true;
            this.editData();
        } else {//add
            this.isEdit = false;
        }

    },

    mounted() {
        //this.getData();
    },

    methods: {
        cleanSaveForm() {
            this.saveForm = {
                id: '',
                projectName: 'myproject',
                datasourceId: '',
                organName: 'mycompany',
                packageName: '',
                providerSet: '',
                version: '0.0.1-SNAPSHOT',
                author: this.getUsername(),
                since: 'v1.0',
                copyright: '/*\n' +
                    ' * Copyright 2017 ~ 2025 the original author or authors. <wanglsir@gmail.com, 983708408@qq.com>\n' +
                    ' *\n' +
                    ' * Licensed under the Apache License, Version 2.0 (the "License");\n' +
                    ' * you may not use this file except in compliance with the License.\n' +
                    ' * You may obtain a copy of the License at\n' +
                    ' *\n' +
                    ' *      http://www.apache.org/licenses/LICENSE-2.0\n' +
                    ' *\n' +
                    ' * Unless required by applicable law or agreed to in writing, software\n' +
                    ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
                    ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
                    ' * See the License for the specific language governing permissions and\n' +
                    ' * limitations under the License.\n' +
                    ' */',
                remark: '',
                extraOptions: [],
                organType: 'com',
            };
        },

        saveData() {
            this.dialogLoading = true;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.dealPackageName();
                    this.$$api_dts_saveProject({
                        data: this.saveForm,
                        fn: data => {
                            this.back();
                            this.saveLoading = false;
                        },
                        errFn: () => {
                            this.saveLoading = false;
                        }
                    });
                } else {
                    this.saveLoading = false;
                }
            });
        },

        getDatasources() {
            this.$$api_dts_getDatabaseForSelect({
                data: {},
                fn: data => {
                    this.datasources = data.data;
                    if (data.data && data.data[0] && !this.saveForm.datasourceId) {
                        this.saveForm.datasourceId = data.data[0].id;
                    }
                }
            });
        },

        dealPackageName() {
            this.saveForm.packageName = this.saveForm.organType + '.' + this.saveForm.organName + '.' + this.saveForm.projectName;
        },

        editData() {
            this.$$api_dts_projectDetail({
                data: {
                    id: this.saveForm.id,
                },
                fn: data => {
                    if (!data.data.extraOptions || !data.data.extraOptions) {
                        data.data.extraOptions = [];
                    }
                    if (data.data.organType && data.data.organName && data.data.projectName) {
                        data.data.packageName = data.data.organType + '.' + data.data.organName + '.' + data.data.projectName;
                    }
                    this.saveForm = data.data;

                    this.getConfigOption();
                },
            });
            this.dialogVisible = true;
            this.dialogTitle = 'Edit';
        },

        getUsername() {
            return utilstore.get('userinfo.username')
        },

        back() {
            this.$router.push({ path: '/dts/project' })
        },

        getConfigOption() {
            console.info("into getConfigOption")
            this.$$api_dts_getConfigOption({
                data: {
                    providerSet: this.saveForm.providerSet,
                },
                fn: data => {
                    this.mergeConfigOption(data.data, this.saveForm.extraOptions);
                    this.saveForm.extraOptions = data.data;
                },
            })
        },

        mergeConfigOption(extraOptions, oldExtraOptions) {
            for (let i in extraOptions) {
                let oldSelectedValue = this.getOptionsByProviderAndName(oldExtraOptions, extraOptions[i].provider, extraOptions[i].name);
                if (oldSelectedValue) {
                    extraOptions[i].selectedValue = oldSelectedValue;
                } else {
                    extraOptions[i].selectedValue = extraOptions[i].values[0];
                }
            }
        },

        getOptionsByProviderAndName(oldExtraOptions, provider, name) {
            for (let i in oldExtraOptions) {
                if (oldExtraOptions[i].provider == provider && oldExtraOptions[i].name == name) {
                    return oldExtraOptions[i].selectedValue;
                }
            }
            return null;
        }

    }
}
