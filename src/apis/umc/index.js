/**
 * 用户模块
 * @type {Object}
 */
import {
    store
} from '../../utils/'

let baseUrl = store.get("application_cache");
if(baseUrl||baseUrl==undefined||baseUrl=="null"||baseUrl==null||baseUrl==''){
    baseUrl = "http://localhost:14048/umc-manager";
    console.info("get base url fail ,use default!!!  url="+baseUrl);
}else{
    console.info("get base url success !!!  url="+baseUrl);
}

export default [

    //contact
    {
        name: '联系人列表',
        method: 'contactList',
        path: baseUrl+'/contact/list',
        type: 'post'
    },
    {
        name: '保存',
        method: 'saveContact',
        path: baseUrl+'/contact/save',
        type: 'json'
    },
    {
        name: '分组列表',
        method: 'groupList',
        path: baseUrl+'/contact/groupList',
        type: 'post'
    },
    {
        name: '联系人详情',
        method: 'contactDetail',
        path: baseUrl+'/contact/detail',
        type: 'post'
    },
    {
        name: '逻辑删除联系人',
        method: 'delContact',
        path: baseUrl+'/contact/del',
        type: 'post'
    },


    //group
    {
        name: '联系人分组列表',
        method: 'contactGroupList',
        path: baseUrl+'/contactGroup/list',
        type: 'post'
    },
    {
        name: '保存联系人分组',
        method: 'saveContactGroup',
        path: baseUrl+'/contactGroup/save',
        type: 'post'
    },
    {
        name: '删除联系人分组',
        method: 'delContactGroup',
        path: baseUrl+'/contactGroup/del',
        type: 'post'
    },
    {
        name: '所有联系人分组',
        method: 'allContactGroup',
        path: baseUrl+'/contactGroup/all',
        type: 'post'
    },

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
