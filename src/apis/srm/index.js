import global from "../../common/global_variable";

let baseUrl = global.getBaseUrl(global.srmBaseUrlKey,global.srmDefaultPath);

export default [
  {
    name: '获取控制台日志',
    method: 'getlog',
    path: baseUrl+'/console/consoleLog',
    type: 'json',
    async : false
  },

]
