/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '修改版本',
    method: 'update',
    path: '/scm/configGuration/update',
    type: 'post'
  },
  {
    name: '修改配置',
    method: 'updateguration',
    path: '/scm/configGuration/updateGuration',
    type: 'post'
  },
  {
    name: '删除配置项',
    method: 'deleteVersiondetail',
    path: '/scm/configGuration/deleteVersionDetail',
    type: 'post'
  },
  {
    name: '查询版本',
    method: 'select',
    path: '/scm/configGuration/select',
    type: 'post'
  },
  {
    name: '添加版本',
    method: 'configset',
    path: '/scm/configGuration/config-set.json',
    type: 'json'
  },
  {
    name: '获取版本列表',
    method: 'lists',
    path: '/scm/configGuration/config-list.json',
    type: 'post'
  },
  {
    name: '获取分组名称',
    method: 'grouplists',
    path: '/scm/appGroup/group_list',
    type: 'post'
  },
  {
    name: '获取版本列表',
    method: 'versionlist',
    path: '/scm/history/version-list.json',
    type: 'post'
  },
  {
    name: '删除版本',
    method: 'versiondelete',
    path: '/scm/history/version-delete.json',
    type: 'json'
  },
  {
    name: '修改版本',
    method: 'versionupdate',
    path: '/scm/history/version-update.json',
    type: 'json'
  }
]
