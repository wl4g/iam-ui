import global from "../../common/global_variable";

//let baseUrl = global.getBaseUrl(global.scmBaseUrlKey,global.scmDefaultPath);

export default [
  {
    name: '修改版本',
    method: 'update',
    path: '/configGuration/update',
    type: 'post',
    sysModule: global.scm
  },
  {
    name: '修改配置',
    method: 'updateguration',
    path: '/configGuration/updateGuration',
    type: 'post',
    sysModule: global.scm
  },
  {
    name: '删除配置项',
    method: 'deleteVersiondetail',
    path: '/configGuration/deleteVersionDetail',
    type: 'post',
    sysModule: global.scm
  },
  {
    name: '查询版本',
    method: 'select',
    path: '/configGuration/select',
    type: 'post',
    sysModule: global.scm
  },
  {
    name: '添加版本',
    method: 'configset',
    path: '/configGuration/config-set.json',
    type: 'json',
    sysModule: global.scm
  },
  {
    name: '获取版本列表',
    method: 'lists',
    path: '/configGuration/config-list.json',
    type: 'post',
    sysModule: global.scm
  },
  {
    name: '获取版本详情',
    method: 'configselect',
    path: '/configGuration/config-select.json',
    type: 'post',
    sysModule: global.scm
  },
  {
    name: '校验配置格式',
    method: 'configcheck',
    path: '/configGuration/config-check.json',
    type: 'post',
    sysModule: global.scm
  },

]
