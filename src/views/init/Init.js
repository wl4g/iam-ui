import {store} from "../../utils";
import promise from "../login/promise";

export default {
    name: 'Init',
    data() {
        return {
            fullscreenLoading: false,

        }
    },

    mounted() {
        /*this.fullscreenLoading = true;
        setTimeout(() => {
            this.fullscreenLoading = false;
        }, 3000);*/

        /*setTimeout(() => {
            //Do nothing , just wait 3 second
            this.afterLogin();
        }, 3000);*/
        this.fullscreenLoading = true;
        this.afterLogin();

    },

    methods: {

        afterLogin(){
            this.getCache();

            this.$$api_iam_getMenuList({
                data: {},
                fn: data => {
                    console.info(data);
                    store.set("menu_cache",data.data.data);
                    promise.buildRoleRoute(this);

                    let routList = this.$router.options.routes;
                    //jump to first not hidden page
                    for(let i = 0; i<routList.length;i++){
                        if(routList[i].hidden!=true){
                            let children = routList[i].children;
                            if(children){
                                for(let j = 0; j<children.length;j++){
                                    if(children[j].hidden!=true) {
                                        this.$router.push(routList[i].path+'/'+children[j].path);
                                        this.fullscreenLoading = false;
                                        return;
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
                    //console.info(data.data)
                    store.set("application_cache",data.data);
                    //console.info(store.get("application_cache"));
                    //console.info(store.get("application_cache")['umc-manager']);
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
            that.$$api_share_dictCache({
                fn: data => {
                    //console.info(data.data)
                    store.set("dicts_cache",data.data);
                    //console.info(store.get("dicts_cache"));
                    console.info("get dict success");
                },
                errFn: () => {
                    //console.info("get dict cache fail");
                    //try again
                    that.$$api_share_dictCache({
                        fn: data => {
                            //console.info(data.data)
                            store.set("dicts_cache",data.data);
                            //console.info(store.get("dicts_cache"));
                            console.info("get dict success");
                        },
                    });
                },
            })
        },


    },
}


