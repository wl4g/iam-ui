import global from "../../common/global_variable";

//let baseUrl = global.getBaseUrl(global.shareBaseUrlKey,global.shareDefaultPath);

export default [
    //dict
    {
        name: '字典列表',
        method: 'dictList',
        path: '/dict/list',
        type: 'post',
        sys: global.share
    },
    {
        name: '保存字典',
        method: 'saveDict',
        path: '/dict/save',
        type: 'post',
        sys: global.share
    },
    {
        name: '字典详情',
        method: 'dictDetail',
        path: '/dict/detail',
        type: 'post',
        sys: global.share
    },
    {
        name: '删除字典',
        method: 'delDict',
        path: '/dict/del',
        type: 'post',
        sys: global.share
    },
    {
        name: '所有字典类型',
        method: 'allDictType',
        path: '/dict/allType',
        type: 'post',
        sys: global.share
    },
    {
        name: '字典详情',
        method: 'getDictByType',
        path: '/dict/getByType',
        type: 'post',
        sys: global.share
    },
    {
        name: '获取字典缓存',
        method: 'dictCache',
        path: '/dict/getInit',
        type: 'post',
        sys: global.share
    },
    //host
    {
        name: '所有host',
        method: 'allHost',
        path: '/host/allHost',
        type: 'post',
        sys: global.share
    },
    {
        name: 'hostList',
        method: 'hostList',
        path: '/host/list',
        type: 'post',
        sys: global.share
    },

    //contact
    {
        name: '联系人列表',
        method: 'contactList',
        path: '/contact/list',
        type: 'post',
        sys: global.share
    },
    {
        name: '保存',
        method: 'saveContact',
        path: '/contact/save',
        type: 'json',
        sys: global.share
    },
    {
        name: '联系人详情',
        method: 'contactDetail',
        path: '/contact/detail',
        type: 'post',
        sys: global.share
    },
    {
        name: '逻辑删除联系人',
        method: 'delContact',
        path: '/contact/del',
        type: 'post',
        sys: global.share
    },


    //group
    {
        name: '联系人分组列表',
        method: 'contactGroupList',
        path: '/contactGroup/list',
        type: 'post',
        sys: global.share
    },
    {
        name: '所有分组列表',
        method: 'groupList',
        path: '/contactGroup/groupList',
        type: 'post',
        sys: global.share
    },
    {
        name: '保存联系人分组',
        method: 'saveContactGroup',
        path: '/contactGroup/save',
        type: 'post',
        sys: global.share
    },
    {
        name: '删除联系人分组',
        method: 'delContactGroup',
        path: '/contactGroup/del',
        type: 'post',
        sys: global.share
    },

    //cluster
    {
        name: '集群列表',
        method: 'clusterList',
        path: '/cluster/list',
        type: 'post',
        sys: global.share
    },
    {
        name: '保存集群',
        method: 'saveCluster',
        path: '/cluster/save',
        type: 'json',
        sys: global.share
    },
    {
        name: '逻辑删除集群',
        method: 'delCluster',
        path: '/cluster/del',
        type: 'post',
        sys: global.share
    },
    {
        name: '集群详情',
        method: 'clusterDetail',
        path: '/cluster/detail',
        type: 'post',
        sys: global.share
    },


    {
        name: '所有集群',
        method: 'clusters',
        path: '/cluster/clusters',
        type: 'post',
        sys: global.share
    },
    {
        name: '实例列表',
        method: 'instances',
        path: '/cluster/instances',
        type: 'post',
        sys: global.share
    },






]
