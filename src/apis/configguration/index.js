import global from "../../common/global_variable";

let baseUrl = global.getBaseUrl(global.scmBaseUrlKey,global.scmDefaultPath);

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
    name: '获取版本详情',
    method: 'configselect',
    path: baseUrl+'/configGuration/config-select.json',
    type: 'post'
  },
  {
    name: '校验配置格式',
    method: 'configcheck',
    path: baseUrl+'/configGuration/config-check.json',
    type: 'post'
  },

]
