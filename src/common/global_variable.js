import {store} from "../utils";

export default {
    ci:{
        cluster: 'ci-server',//这个必须和数据表app_cluster的name字段对应
        twoDomain: 'ci',//默认二级域名
        defaultContextPath: '/ci-server',//默认项目上下文路径
        defaultPort: '14046',//默认端口
    },
    scm: {
        cluster: 'scm-server',
        twoDomain: 'scm',
        defaultContextPath: '/scm-server',
        defaultPort: '14043',
    },
    srm: {
        cluster: 'srm-manager',
        twoDomain: 'srm',
        defaultContextPath: '/srm-manager',
        defaultPort: '15050',
    },
    umc: {
        cluster: 'umc-manager',
        twoDomain: 'umc',
        defaultContextPath: '/umc-manager',
        defaultPort: '14048',
    },
    share: {
        cluster: 'share-manager',
        twoDomain: 'share',
        defaultContextPath: '/share-manager',
        defaultPort: '14051',
    },
    iam: {
        cluster: 'iam-server',
        twoDomain: 'iam',
        defaultContextPath: '/iam-server',
        defaultPort: '14040',
    },

    getBaseUrl: function(app) {
        if(!app){
            return;
        }
        let hostname = location.hostname;
        let protocol = location.protocol;
        let baseUrl = '';
        //get from store , if found , user it
        let applicationCache = store.get("application_cache");
        if(applicationCache && applicationCache != 'null' && applicationCache[app.cluster] &&applicationCache[app.cluster]['extranetBaseUri']){//found from store
            baseUrl = applicationCache[app.cluster]['extranetBaseUri'];
            //console.debug("user cache Url , url = "+ baseUrl);
        }else{//user default
            let isIp = window.Common.Util.isIp(hostname);
            if (hostname == 'localhost' || isIp) {//if localhost
                baseUrl = protocol + "//" +hostname+":"+ app.defaultPort + app.defaultContextPath;
                //console.debug("user localhost Url , url = "+ baseUrl);
            } else {
                var topDomainName = hostname.split('.').slice(-2).join('.');
                if(hostname.indexOf("com.cn") > 0){
                    topDomainName = hostname.split('.').slice(-3).join('.');
                }
                baseUrl = protocol +"//"+app.twoDomain +"."+ topDomainName + app.defaultContextPath;
                //console.debug("user default Url , url = "+ baseUrl);
            }
        }
        return baseUrl;
    }

}