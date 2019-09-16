import {store} from "../../utils";

/**
 * 用户模块
 * @type {Object}
 */
let baseUrl = store.get("application_cache");
if(baseUrl||baseUrl==undefined||baseUrl=="null"||baseUrl==null||baseUrl==''){
  baseUrl = "http://localhost:15050/srm-manager";//
  console.info("get base url fail ,use default!!!  url="+baseUrl);
}else{
  console.info("get base url success !!!  url="+baseUrl);
}

export default [
  {
    name: '获取控制台日志',
    method: 'getlog',
    path: '/srm/console/consoleLog',
    type: 'json',
    async : false
  },

]
