/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '节点增加',
    method: 'envconfigsave',
    path: ':14051/share-admin/appGroup/envconfig_save',
    type: 'json'
  },
  {
    name: '节点列表',
    method: 'groupenvlist',
    path: ':14051/share-admin/appGroup/group_envlist',
    type: 'post'
  },
  {
    name: '查询节点',
    method: 'envlist',
    path: ':14051/share-admin/appGroup/env_list',
    type: 'post'
  },
  {
    name: '删除应用组',
    method: 'delete',
    path: ':14051/share-admin/appGroup/delete',
    type: 'post'
  },
  {
    name: '删除节点',
    method: 'deleteInstance',
    path: ':14051/share-admin/appGroup/deleteInstance',
    type: 'post'
  },
  {
    name: '修改应用组',
    method: 'update',
    path: ':14051/share-admin/appGroup/update',
    type: 'post'
  },
  {
    name: '添加节点',
    method: 'insertInstance',
    path: ':14051/share-admin/appGroup/insertInstance',
    type: 'json'
  },
  {
    name: '修改节点',
    method: 'updateInstance',
    path: ':14051/share-admin/appGroup/updateInstance',
    type: 'post'
  },
  {
    name: '获取分组名称',
    method: 'grouplist',
    path: ':14051/share-admin/appGroup/group_list',
    type: 'post'
  },
  {
    name: '获取环境名称列表',
    method: 'envirlist',
    path: ':14051/share-admin/appGroup/envir_list',
    type: 'post'
  }
]
