import {store} from "../utils";

export default {

    ciBaseUrlKey:'ci-server',
    scmBaseUrlKey:'scm-server',
    srmBaseUrlKey:'srm-manager',
    umcBaseUrlKey:'umc-manager',
    shareBaseUrlKey:'share-manager',
    iamBaseUrlKey:'iam-server',

    ciDefaultPath:':14046/ci-server',
    scmDefaultPath:':14043/scm-server',
    srmDefaultPath:':15050/srm-manager',
    umcDefaultPath:':14048/umc-manager',
    shareDefaultPath:':14051/share-manager',
    iamDefaultPath:':14040/iam-server',

    getBaseUrl: function (key,defaultPath) {
        let applicationCache = store.get("application_cache");
        let baseUrl = '';
        let hostname = window.location.protocol + "//" + window.location.hostname;
        if(applicationCache && applicationCache != 'null' && applicationCache[key] &&applicationCache[key]['extranetBaseUri']){
            baseUrl = applicationCache[key]['extranetBaseUri'];
            console.debug("get base url from server success !!!  url="+baseUrl);
        }else{
            baseUrl = hostname+defaultPath;
            console.debug("get base url from server fail ,use default!!!  url="+baseUrl);
        }
        return baseUrl;
    }

}