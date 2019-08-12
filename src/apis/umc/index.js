/**
 * 用户模块
 * @type {Object}
 */
export default [

    //contact
    {
        name: '联系人列表',
        method: 'contactList',
        path: '/umc-admin/contact/list',
        type: 'post'
    },
    {
        name: '保存',
        method: 'saveContact',
        path: '/umc-admin/contact/save',
        type: 'json'
    },
    {
        name: '分组列表',
        method: 'groupList',
        path: '/umc-admin/contact/groupList',
        type: 'post'
    },
    {
        name: '联系人详情',
        method: 'contactDetail',
        path: '/umc-admin/contact/detail',
        type: 'post'
    },
    {
        name: '逻辑删除联系人',
        method: 'delContact',
        path: '/umc-admin/contact/del',
        type: 'post'
    },

    //group
    {
        name: '联系人分组列表',
        method: 'contactGroupList',
        path: '/umc-admin/contactGroup/list',
        type: 'post'
    },
    {
        name: '保存联系人分组',
        method: 'saveContactGroup',
        path: '/umc-admin/contactGroup/save',
        type: 'post'
    },
    {
        name: '删除联系人分组',
        method: 'delContactGroup',
        path: '/umc-admin/contactGroup/del',
        type: 'post'
    },

    //collector
    {
        name: '采集点列表',
        method: 'collectorList',
        path: '/umc-admin/collector/list',
        type: 'post'
    },
    {
        name: '保存采集点',
        method: 'saveCollector',
        path: '/umc-admin/collector/save',
        type: 'post'
    },
    {
        name: '保存采集点',
        method: 'collectorDetail',
        path: '/umc-admin/collector/detail',
        type: 'post'
    },
    {
        name: '删除采集点',
        method: 'delCollector',
        path: '/umc-admin/collector/del',
        type: 'post'
    },

    //template
    {
        name: '模版列表',
        method: 'templatList',
        path: '/umc-admin/template/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveTemplat',
        path: '/umc-admin/template/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'templatDetail',
        path: '/umc-admin/template/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delTemplat',
        path: '/umc-admin/template/del',
        type: 'post'
    },



    //host
    {
        name: '所有host',
        method: 'allHost',
        path: '/umc-admin/host/all',
        type: 'post'
    },

    //record
    {
        name: '记录列表',
        method: 'recordList',
        path: '/umc-admin/record/list',
        type: 'post'
    },
    {
        name: '记录详情',
        method: 'recordDetail',
        path: '/umc-admin/record/detail',
        type: 'post'
    },


    //metric
    {
        name: '模版列表',
        method: 'metricList',
        path: '/umc-admin/metric/list',
        type: 'post'
    },
    {
        name: '保存模板',
        method: 'saveMetric',
        path: '/umc-admin/metric/save',
        type: 'json'
    },
    {
        name: '模版详情',
        method: 'metricDetail',
        path: '/umc-admin/metric/detail',
        type: 'post'
    },
    {
        name: '删除模板',
        method: 'delMetric',
        path: '/umc-admin/metric/del',
        type: 'post'
    },

    {
        name: '记录列表',
        method: 'notificationList',
        path: '/umc-admin/notification/list',
        type: 'post'
    },
    {
        name: '记录详情',
        method: 'notificationDetail',
        path: '/umc-admin/notification/detail',
        type: 'post'
    },










]
