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
    path: '/share-admin/appGroup/group_list',
    type: 'post'
  },
  {
    name: '获取版本详情',
    method: 'configselect',
    path: '/scm/configGuration/config-select.json',
    type: 'post'
  },
  {
    name: '校验配置',
    method: 'configcheck',
    path: '/scm/configGuration/config-check.json',
    type: 'post'
  },
  {
    name: '获取分组名称',
    method: 'getlog',
    path: '/srm/console/consoleLog',
    type: 'json',
    async : false
  },
  {
    name: '获取分组名称',
    method: 'statistics',
    path: '/srm/statistics/statisticsLog',
    type: 'json'
  },
  {
    name: '根据type获取字典',
    method: 'getByType',
    path: '/scm/dict/getByType?type=app_ns_type',
    type: 'json'
  }
]
