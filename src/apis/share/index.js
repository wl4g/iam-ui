import global from "../../common/global_variable";

let baseUrl = global.getBaseUrl(global.shareBaseUrlKey,global.shareDefaultPath);

export default [
    //dict
    {
        name: '字典列表',
        method: 'dictList',
        path: baseUrl+'/dict/list',
        type: 'post'
    },
    {
        name: '保存字典',
        method: 'saveDict',
        path: baseUrl+'/dict/save',
        type: 'post'
    },
    {
        name: '字典详情',
        method: 'dictDetail',
        path: baseUrl+'/dict/detail',
        type: 'post'
    },
    {
        name: '删除字典',
        method: 'delDict',
        path: baseUrl+'/dict/del',
        type: 'post'
    },
    {
        name: '所有字典类型',
        method: 'allDictType',
        path: baseUrl+'/dict/allType',
        type: 'post'
    },
    {
        name: '字典详情',
        method: 'getDictByType',
        path: baseUrl+'/dict/getByType',
        type: 'post'
    },
    {
        name: '获取字典缓存',
        method: 'dictCache',
        path: baseUrl+'/dict/getInit',
        type: 'post'
    },
    //host
    {
        name: '所有host',
        method: 'hostList',
        path: baseUrl+'/host/list',
        type: 'post'
    },
    // Application informcation
    {
        name: '所有application',
        method: 'applicationInfo',
        path: window.IAM.Core.getIamBaseUri() + '/application/info',
        type: 'post'
    },


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
        name: '所有分组列表',
        method: 'groupList',
        path: baseUrl+'/contactGroup/groupList',
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

    //cluster
    {
        name: '集群列表',
        method: 'clusterList',
        path: baseUrl+'/cluster/list',
        type: 'post'
    },
    {
        name: '保存集群',
        method: 'saveCluster',
        path: baseUrl+'/cluster/save',
        type: 'json'
    },
    {
        name: '逻辑删除集群',
        method: 'delCluster',
        path: baseUrl+'/cluster/del',
        type: 'post'
    },
    {
        name: '集群详情',
        method: 'clusterDetail',
        path: baseUrl+'/cluster/detail',
        type: 'post'
    },


    {
        name: '所有集群',
        method: 'clusters',
        path: baseUrl+'/cluster/clusters',
        type: 'post'
    },
    {
        name: '实例列表',
        method: 'instances',
        path: baseUrl+'/cluster/instances',
        type: 'post'
    },






]
