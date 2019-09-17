/**
 * 用户模块
 * @type {Object}
 */
import {
  store
} from '../../utils/'
let applicationCache = store.get("application_cache");
let baseUrl = '';
let hostname = window.location.protocol + "//" + window.location.hostname;
if(applicationCache && applicationCache != 'null' && applicationCache['share-manager']
    &&applicationCache['share-manager']['intranetBaseUri']){
  baseUrl = applicationCache['share-manager']['intranetBaseUri'];
  console.debug("get base url success !!!  url="+baseUrl);
}else{
  baseUrl = hostname+":14051/share-manager";
  console.debug("get base url fail ,use default!!!  url="+baseUrl);
}

export default [
  {
    name: '节点增加',
    method: 'insert',
    path: baseUrl+'/appGroup/insert',
    type: 'json'
  },
  {
    name: '节点列表',
    method: 'list',
    path: baseUrl+'/appGroup/list',
    type: 'post'
  },
  {
    name: '查询节点',
    method: 'select',
    path: baseUrl+'/appGroup/select',
    type: 'post'
  },
  {
    name: '删除应用组',
    method: 'deleteenv',
    path: baseUrl+'/appGroup/delete_env',
    type: 'post'
  },
  {
    name: '删除节点',
    method: 'deleteInstance',
    path: baseUrl+'/appGroup/deleteInstance',
    type: 'post'
  },
  {
    name: '修改应用组',
    method: 'update',
    path: baseUrl+'/appGroup/update',
    type: 'post'
  },
  {
    name: '添加节点',
    method: 'insertInstance',
    path: baseUrl+'/appGroup/insertInstance',
    type: 'json'
  },
  {
    name: '修改节点',
    method: 'updateInstance',
    path: baseUrl+'/appGroup/updateInstance',
    type: 'post'
  },
  {
    name: '获取分组名称',
    method: 'grouplist',
    path: baseUrl+'/appGroup/group_list',
    type: 'post'
  },
  {
    name: '获取环境名称列表',
    method: 'envirlist',
    path: baseUrl+'/appGroup/envir_list',
    type: 'post'
  },
  {
    name: '获取实例名称列表',
    method: 'instancelist',
    path: baseUrl+'/appGroup/instance_list',
    type: 'json'
  }
]
