/**
 * 用户模块
 * @type {Object}
 */
import {
  store
} from '../../utils/'

let baseUrl = store.get("application_cache");
if(baseUrl||baseUrl==undefined||baseUrl=="null"||baseUrl==null||baseUrl==''){
  baseUrl = "http://localhost:14051/share-manager";
  console.info("get base url fail ,use default!!!  url="+baseUrl);
}else{
  console.info("get base url success !!!  url="+baseUrl);
}

export default [
  {
    name: '节点增加',
    method: 'envconfigsave',
    path: baseUrl+'/appGroup/envconfig_save',
    type: 'json'
  },
  {
    name: '节点列表',
    method: 'groupenvlist',
    path: baseUrl+'/appGroup/group_envlist',
    type: 'post'
  },
  {
    name: '查询节点',
    method: 'envlist',
    path: baseUrl+'/appGroup/env_list',
    type: 'post'
  },
  {
    name: '删除应用组',
    method: 'delete',
    path: baseUrl+'/appGroup/delete',
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
  }
]
