import global from "../../common/global_variable";

let baseUrl = global.getBaseUrl(global.umcBaseUrlKey,global.umcDefaultPath);

alert("umc base url"+baseUrl);

export default [

    //collector
    {
        name: '采集点列表',
        method: 'collectorList',
        path: baseUrl+'/collector/list',
        type: 'post'
    },
    {
        name: '保存采集点',
        method: 'saveCollector',
        path: baseUrl+'/collector/save',
        type: 'post'
    },
    {
        name: '保存采集点',
        method: 'collectorDetail',
        path: baseUrl+'/collector/detail',
        type: 'post'
    },
    {
        name: '删除采集点',
        method: 'delCollector',
        path: baseUrl+'/collector/del',
        type: 'post'
    },

    //template
    {
        name: '模版列表',
        method: 'templatList',
        path: baseUrl+'/template/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveTemplat',
        path: baseUrl+'/template/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'templatDetail',
        path: baseUrl+'/template/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delTemplat',
        path: baseUrl+'/template/del',
        type: 'post'
    },
    {
        name: '根据类别获取列表',
        method: 'getTemplateByClassify',
        path: baseUrl+'/template/getByClassify',
        type: 'post'
    },


    //record
    {
        name: '记录列表',
        method: 'recordList',
        path: baseUrl+'/record/list',
        type: 'post'
    },
    {
        name: '记录详情',
        method: 'recordDetail',
        path: baseUrl+'/record/detail',
        type: 'post'
    },


    //metric
    {
        name: '模版列表',
        method: 'metricList',
        path: baseUrl+'/metric/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveMetric',
        path: baseUrl+'/metric/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'metricDetail',
        path: baseUrl+'/metric/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delMetric',
        path: baseUrl+'/metric/del',
        type: 'post'
    },
    {
        name: '模版列表',
        method: 'getMetricByClassify',
        path: baseUrl+'/metric/getByClassify',
        type: 'post'
    },

    {
        name: '记录列表',
        method: 'notificationList',
        path: baseUrl+'/notification/list',
        type: 'post'
    },
    {
        name: '记录详情',
        method: 'notificationDetail',
        path: baseUrl+'/notification/detail',
        type: 'post'
    },

    //config
    {
        name: '模版列表',
        method: 'configList',
        path: baseUrl+'/config/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveConfig',
        path: baseUrl+'/config/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'configDetail',
        path: baseUrl+'/config/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delConfig',
        path: baseUrl+'/config/del',
        type: 'post'
    },









]
