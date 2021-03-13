import {transDate, getDay} from 'utils/'

export default {
    name: 'host',
    data() {
        return {
            //查询条件
            searchParams: {
                hostId: '',
                name: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                hostId: '',
                name: '',
                vpnTunnelType: '',
                openvpnTunnelId: '',
                pptpTunnelId: '',
                ipv4: '',
                ipv6: '',
                hwaddr: '',
                netmask: '',
                broadcast: '',
                getway: '',

            },

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            tableData: [],

            openvpns: [],
            pptps: [],
            hosts: [],

            // 表单规则
            rules: {
                name: [
                    {required: true, message: 'Please Input name', trigger: 'blur'},
                    {min: 1, max: 30, message: 'length between 1 to 30', trigger: 'blur'}
                ],
            },
            loading: false
        }
    },

    mounted() {
        this.allHost();
    },

    activated() {
        if (this.$route.query.id) {
            this.searchParams.hostId = this.$route.query.id;
        }
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

        addData() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = 'Add Host Netcard information';
        },

        // 获取列表数据
        getData() {
            this.loading = true;
            this.$$api_erm_netcardList({
                data: {
                    name: this.searchParams.name,
                    hostId: this.searchParams.hostId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: json => {
                    this.loading = false;
                    this.total = json.data.total;
                    this.tableData = json.data.records;
                },
                errFn: () => {
                    this.loading = false;
                }
            })
        },

        cleanSaveForm() {
            this.saveForm = {
                id: '',
                hostId: '',
                name: '',
                vpnTunnelType: '',
                openvpnTunnelId: '',
                pptpTunnelId: '',
                ipv4: '',
                ipv6: '',
                hwaddr: '',
                netmask: '',
                broadcast: '',
                getway: '',
            };
        },

        saveData() {
            this.dialogLoading = true;
            this.saveForm.hostId = this.searchParams.hostId;
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    this.$$api_erm_saveNetcard({
                        data: this.saveForm,
                        fn: json => {
                            this.dialogLoading = false;
                            this.dialogVisible = false;
                            this.getData();
                            this.cleanSaveForm();
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

        editData(row) {
            if (!row.id) {
                return;
            }
            this.cleanSaveForm();
            this.$$api_erm_netcardDetail({
                data: {
                    id: row.id,
                },
                fn: json => {
                    this.saveForm = json.data;
                    this.saveForm.vpnTunnelType = json.data.vpnTunnelType.toString();
                },
            });
            this.dialogVisible = true;
            this.dialogTitle = 'Configure Host NetCard';
        },

        getHostTunnelByType() {
            this.$$api_erm_getHostTunnel({
                data: {},
                fn: json => {
                    this.saveForm = json.data;
                    if (json.data.openvpn) {
                        this.openvpns = json.data.openvpn;
                    }
                    if (json.data.pptp) {
                        this.pptps = json.data.pptp;
                    }
                },
            });
        },

        allHost() {
            this.$$api_erm_allHost({
                data: {},
                fn: json => {
                    if (json.data) {
                        this.hosts = json.data;
                    }
                },
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
                this.$$api_erm_delNetcard({
                    data: {
                        id: row.id,
                    },
                    fn: json => {
                        this.$message({
                            message: 'Success',
                            type: 'success'
                        });
                        this.getData();
                    },
                })
            }).catch(() => {
                //do nothing
            });
        },

        back() {
            this.$router.push({path: this.permitutil.getRoutePathByPermission('cmdb:host')})
        }


    }
}
