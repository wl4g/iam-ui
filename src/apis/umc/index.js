/**
 * 用户模块
 * @type {Object}
 */
export default [

    //contact
    {
        name: '联系人列表',
        method: 'contactList',
        path: ':14048/umc-admin/contact/list',
        type: 'post'
    },
    {
        name: '保存',
        method: 'saveContact',
        path: ':14048/umc-admin/contact/save',
        type: 'json'
    },
    {
        name: '分组列表',
        method: 'groupList',
        path: ':14048/umc-admin/contact/groupList',
        type: 'post'
    },
    {
        name: '联系人详情',
        method: 'contactDetail',
        path: ':14048/umc-admin/contact/detail',
        type: 'post'
    },
    {
        name: '逻辑删除联系人',
        method: 'delContact',
        path: ':14048/umc-admin/contact/del',
        type: 'post'
    },


    //group
    {
        name: '联系人分组列表',
        method: 'contactGroupList',
        path: ':14048/umc-admin/contactGroup/list',
        type: 'post'
    },
    {
        name: '保存联系人分组',
        method: 'saveContactGroup',
        path: ':14048/umc-admin/contactGroup/save',
        type: 'post'
    },
    {
        name: '删除联系人分组',
        method: 'delContactGroup',
        path: ':14048/umc-admin/contactGroup/del',
        type: 'post'
    },
    {
        name: '所有联系人分组',
        method: 'allContactGroup',
        path: ':14048/umc-admin/contactGroup/all',
        type: 'post'
    },

    //collector
    {
        name: '采集点列表',
        method: 'collectorList',
        path: ':14048/umc-admin/collector/list',
        type: 'post'
    },
    {
        name: '保存采集点',
        method: 'saveCollector',
        path: ':14048/umc-admin/collector/save',
        type: 'post'
    },
    {
        name: '保存采集点',
        method: 'collectorDetail',
        path: ':14048/umc-admin/collector/detail',
        type: 'post'
    },
    {
        name: '删除采集点',
        method: 'delCollector',
        path: ':14048/umc-admin/collector/del',
        type: 'post'
    },

    //template
    {
        name: '模版列表',
        method: 'templatList',
        path: ':14048/umc-admin/template/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveTemplat',
        path: ':14048/umc-admin/template/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'templatDetail',
        path: ':14048/umc-admin/template/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delTemplat',
        path: ':14048/umc-admin/template/del',
        type: 'post'
    },
    {
        name: '根据类别获取列表',
        method: 'getTemplateByClassify',
        path: ':14048/umc-admin/template/getByClassify',
        type: 'post'
    },


    //record
    {
        name: '记录列表',
        method: 'recordList',
        path: ':14048/umc-admin/record/list',
        type: 'post'
    },
    {
        name: '记录详情',
        method: 'recordDetail',
        path: ':14048/umc-admin/record/detail',
        type: 'post'
    },


    //metric
    {
        name: '模版列表',
        method: 'metricList',
        path: ':14048/umc-admin/metric/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveMetric',
        path: ':14048/umc-admin/metric/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'metricDetail',
        path: ':14048/umc-admin/metric/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delMetric',
        path: ':14048/umc-admin/metric/del',
        type: 'post'
    },
    {
        name: '模版列表',
        method: 'getMetricByClassify',
        path: ':14048/umc-admin/metric/getByClassify',
        type: 'post'
    },

    {
        name: '记录列表',
        method: 'notificationList',
        path: ':14048/umc-admin/notification/list',
        type: 'post'
    },
    {
        name: '记录详情',
        method: 'notificationDetail',
        path: ':14048/umc-admin/notification/detail',
        type: 'post'
    },

    //config
    {
        name: '模版列表',
        method: 'configList',
        path: ':14048/umc-admin/config/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveConfig',
        path: ':14048/umc-admin/config/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'configDetail',
        path: ':14048/umc-admin/config/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delConfig',
        path: ':14048/umc-admin/config/del',
        type: 'post'
    },









]
