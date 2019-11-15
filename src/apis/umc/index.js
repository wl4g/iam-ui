import global from "../../common/global_variable";

//let baseUrl = global.getBaseUrl(global.umcBaseUrlKey,global.umcDefaultPath);

export default [

    //template
    {
        name: '模版列表',
        method: 'templatList',
        path: '/template/list',
        type: 'post',
        sys: global.umc
    },
    {
        name: '保存模板',
        method: 'saveTemplat',
        path: '/template/save',
        type: 'json',
        sys: global.umc
    },
    {
        name: '模版详情',
        method: 'templatDetail',
        path: '/template/detail',
        type: 'post',
        sys: global.umc
    },
    {
        name: '删除模板',
        method: 'delTemplat',
        path: '/template/del',
        type: 'post',
        sys: global.umc
    },
    {
        name: '根据类别获取列表',
        method: 'getTemplateByClassify',
        path: '/template/getByClassify',
        type: 'post',
        sys: global.umc
    },


    //record
    {
        name: '记录列表',
        method: 'recordList',
        path: '/record/list',
        type: 'post',
        sys: global.umc
    },
    {
        name: '记录详情',
        method: 'recordDetail',
        path: '/record/detail',
        type: 'post',
        sys: global.umc
    },


    //metric
    {
        name: '模版列表',
        method: 'metricList',
        path: '/metric/list',
        type: 'post',
        sys: global.umc
    },
    {
        name: '保存模板',
        method: 'saveMetric',
        path: '/metric/save',
        type: 'json',
        sys: global.umc
    },
    {
        name: '模版详情',
        method: 'metricDetail',
        path: '/metric/detail',
        type: 'post',
        sys: global.umc
    },
    {
        name: '删除模板',
        method: 'delMetric',
        path: '/metric/del',
        type: 'post',
        sys: global.umc
    },
    {
        name: '模版列表',
        method: 'getMetricByClassify',
        path: '/metric/getByClassify',
        type: 'post',
        sys: global.umc
    },

    {
        name: '记录列表',
        method: 'notificationList',
        path: '/notification/list',
        type: 'post',
        sys: global.umc
    },
    {
        name: '记录详情',
        method: 'notificationDetail',
        path: '/notification/detail',
        type: 'post',
        sys: global.umc
    },

    //config
    {
        name: '模版列表',
        method: 'configList',
        path: '/config/list',
        type: 'post',
        sys: global.umc
    },
    {
        name: '保存模板',
        method: 'saveConfig',
        path: '/config/save',
        type: 'json',
        sys: global.umc
    },
    {
        name: '模版详情',
        method: 'configDetail',
        path: '/config/detail',
        type: 'post',
        sys: global.umc
    },
    {
        name: '删除模板',
        method: 'delConfig',
        path: '/config/del',
        type: 'post',
        sys: global.umc
    },









]
