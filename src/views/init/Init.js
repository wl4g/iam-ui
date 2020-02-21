import {store} from "../../utils";
import promise from "../login/promise";
import router from '../../router/index.js'
import webView from '@/views/webview.vue'
import Layout from 'layout/routeview/Home.vue'
import Content  from 'layout/routeview/Content.vue'


// 路由懒加载
const loadView = (view) => {
    // '@/views/home/overview/Overview.vue'
    try {
        return require(`@/views${view}.vue`)
    }catch(err){
        console.error('No found routing page vue file path of: ' + view)
    }
};

// 按parentId转换成树结构列表
function transformTreeData(list) {
    list.forEach(item => {
        // 过滤按钮类型
        if (item.type == '3') {
            return
        }

        if (item.parentId && item.parentId != 0) {
            let child = item;
            let parent = list.find(n => {
                return n.id === child.parentId;
            });

            while (parent) {
                if (!parent.children) {
                    parent.children = []
                }
                if (!parent.children.includes(child)) {
                    parent.children.push(child);
                    parent.children.sort(function (a, b) {
                        return a.sort - b.sort
                    });
                }

                if (parent.parentId != undefined || parent.parentId != null) {
                    child = parent;
                    var parentId = parent.parentId;
                    parent = null;
                    parent = list.find(n => {
                        return n.id === parentId;
                    });
                } else {
                    parent = null
                }
            }
        }
    });
    return list
}

export default {
    name: 'Init',
    data() {
        return {
            fullscreenLoading: false,
        }
    },

    mounted() {
        if(this.checkHostname()){
            this.afterLogin();
        }
    },

    activated() {
        //this.afterLogin();
    },

    methods: {
        checkHostname(){
            let hostname = location.hostname;
            let isIp = window.Common.Util.isIp(hostname);
            if (hostname == 'localhost' || isIp){
                this.$alert('请使用域名作为请求地址，禁止使用localhost或ip,详情请看:\nhttps://github.com/wl4g/super-devops/blob/master/README_CN.md\n或者\nhttps://gitee.com/wl4g/super-devops/blob/master/README_CN.md', '错误', {
                    confirmButtonText: '确定'
                });
                return false;
            }else{
                return true;
            }
        },
        afterLogin(){
            this.$$api_iam_getMenuList({
                data: {},
                fn: data => {
                    store.set("menu_cache",data.data.data);
                    promise.buildRoleRoute(this);

                    let list = data.data.data;
                    let res = transformTreeData(list.slice());

                    // 设置动态路由对象
                    (function setAsyncRouter(list) {
                        list.forEach(item => {
                            // 处理静态路由
                            if (item.type == '1') {
                                // 头部一级菜单
                                if (item.level == '1') {
                                    item.path = item.routePath;
                                    if (!item.path) {
                                        item.path = '/' + item.permission
                                    }

                                    // 默认指向第一个子菜单
                                    if (item.children && item.children.length) {
                                        item.redirect = item.children[0].routePath
                                    }

                                    item.component = Layout;
                                } else {
                                    item.path = item.routePath;

                                    // 二级菜单下有子菜单
                                    if (item.children && item.children.length) {
                                        item.component = Content;
                                    } else {
                                        // 二级菜单没有子菜单
                                        let routePath = loadView(item.pageLocation);
                                        item.component = routePath;
                                    }
                                }
                            } else if (item.type == '2') {            // 处理动态路由
                                item.path = item.routePath ? item.routePath : 'webview' + item.name;
                                item.component = webView;
                                item.meta = {
                                    linkhref: item.pageLocation
                                }
                            }
                        })
                    })(res);

                    // 筛选出一级菜单
                    let highLevel = res.filter(n => {
                        return n.parentId == 0;
                    });

                    // 一级菜单按sort排序
                    highLevel = highLevel.sort(function (a, b) {
                        return a.sort - b.sort
                    });

                    // 特殊处理newpipeline页面
                    highLevel.forEach(n => {
                        if(n.permission === 'ci'){
                            n.children.push({
                                path: '/ci/newpipeline',
                                component: require("@/views/ci/newpipeline/NewPipeline.vue"),
                                name: 'newpipeline',
                                icon: '',
                                hidden: true
                            })
                            n.children.push({
                                path: '/ci/taskhisdetail',
                                component: require("@/views/ci/taskhisdetail/TaskHisDetail.vue"),
                                name: 'taskhisdetail',
                                icon: '',
                                hidden: true
                            })
                        }
                        if(n.permission === 'doc'){
                            n.children.push({
                                path: '/doc/diff',
                                component: require("@/views/doc/diff/Diff.vue"),
                                name: 'docDiff',
                                icon: '',
                                hidden: true
                            })
                            n.children.push({
                                path: '/doc/mdEdit',
                                component: require("@/views/doc/mdedit/MdEdit.vue"),
                                name: 'mdEdit',
                                icon: '',
                                hidden: true
                            })
                        }
                    });

                    router.addRoutes(highLevel);
                    this.$store.commit('update_routList',{routList: highLevel});

                    if (this.$route.redirectedFrom && this.$route.redirectedFrom != '/') {
                        // jump 跳转刷新前页面
                        this.$router.push({path: this.$route.redirectedFrom});
                        this.getCache();
                    } else {
                        //jump to first not hidden page
                        for (let i = 0; i < highLevel.length; i++) {
                            if (highLevel[i].hidden != true) {
                                let children = highLevel[i].children;
                                if (children) {
                                    for (let k = 0; k < children.length; j++) {
                                        if (children[k].hidden != true) {
                                            this.getCache();
                                            this.$router.push(children[k].path);
                                            //this.fullscreenLoading = false;
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                errFn: (data) => {
                    if(data&&data.message){
                        this.$message.error(data.message);
                    }else{
                        this.$message.error('get mune fail');
                    }
                    this.fullscreenLoading = false;
                }
            })
        },

        getCache (){
            let that = this;

            //applications
            that.$$api_iam_clusterConfigInfo({
                fn: data => {
                    store.set("application_cache",data.data);
                    console.info("get cluster config success");
                },
                errFn: () => {
                    //console.info("get application cache fail");
                    //try again
                    that.$$api_iam_clusterConfigInfo({
                        fn: data => {
                            //console.info(data.data)
                            store.set("application_cache",data.data.list);
                            //console.info(store.get("application_cache"));
                            console.info("get cluster config success");
                        },
                    });
                },
            });

            //dict
            that.$$api_iam_dictCache({
                fn: data => {
                    //console.info(data.data)
                    store.set("dicts_cache",data.data);
                    //console.info(store.get("dicts_cache"));
                    console.info("get dict success");
                },
                errFn: () => {
                    //console.info("get dict cache fail");
                    //try again
                    that.$$api_iam_dictCache({
                        fn: data => {
                            //console.info(data.data)
                            store.set("dicts_cache",data.data);
                            //console.info(store.get("dicts_cache"));
                            console.info("get dict success");
                        },
                    });
                },
            })

            //share sys auth
            this.$$api_share_generateSshKeyPair({
                data: {},
                fn: data => {

                },
                errFn: () => {

                }
            })
        },


    },
}


