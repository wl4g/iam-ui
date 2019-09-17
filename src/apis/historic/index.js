import {store} from "../../utils";

/**
 * 用户模块
 * @type {Object}
 */
let applicationCache = store.get("application_cache");
let baseUrl = '';
let hostname = window.location.protocol + "//" + window.location.hostname;
if(applicationCache && applicationCache != 'null' && applicationCache['scm-server']
    &&applicationCache['scm-server']['intranetBaseUri']){
  baseUrl = applicationCache['scm-server']['intranetBaseUri'];
  console.debug("get base url success !!!  url="+baseUrl);
}else{
  baseUrl = hostname+":14043/scm-server";
  console.debug("get base url fail ,use default!!!  url="+baseUrl);
}


export default [
  {
    name: '修改版本',
    method: 'update',
    path: baseUrl+'/configGuration/update',
    type: 'post'
  },
  {
    name: '修改配置',
    method: 'updateguration',
    path: baseUrl+'/configGuration/updateGuration',
    type: 'post'
  },
  {
    name: '删除配置项',
    method: 'deleteVersiondetail',
    path: baseUrl+'/configGuration/deleteVersionDetail',
    type: 'post'
  },
  {
    name: '查询版本',
    method: 'select',
    path: baseUrl+'/configGuration/select',
    type: 'post'
  },
  {
    name: '添加版本',
    method: 'configset',
    path: baseUrl+'/configGuration/config-set.json',
    type: 'json'
  },
  {
    name: '获取版本列表',
    method: 'lists',
    path: baseUrl+'/configGuration/config-list.json',
    type: 'post'
  },
  {
    name: '获取版本列表',
    method: 'versionlist',
    path: baseUrl+'/history/version-list.json',
    type: 'post'
  },
  {
    name: '删除版本',
    method: 'versiondelete',
    path: baseUrl+'/history/version-delete.json',
    type: 'json'
  },
  {
    name: '修改版本',
    method: 'versionupdate',
    path: baseUrl+'/history/version-update.json',
    type: 'json'
  }
]
