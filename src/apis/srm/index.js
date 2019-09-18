import {store} from "../../utils";

/**
 * 用户模块
 * @type {Object}
 */
let applicationCache = store.get("application_cache");
let baseUrl = '';
let hostname = window.location.protocol + "//" + window.location.hostname;
if(applicationCache && applicationCache != 'null' && applicationCache['srm-manager']
    &&applicationCache['srm-manager']['extranetBaseUri']){
  baseUrl = applicationCache['srm-manager']['extranetBaseUri'];
  console.debug("get base url success !!!  url="+baseUrl);
}else{
  baseUrl = hostname+":15050/srm-manager";
  console.debug("get base url fail ,use default!!!  url="+baseUrl);
}

export default [
  {
    name: '获取控制台日志',
    method: 'getlog',
    path: baseUrl+'/console/consoleLog',
    type: 'json',
    async : false
  },

]
