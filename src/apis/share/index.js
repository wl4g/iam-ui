import global from "../../common/global_variable";

//let baseUrl = global.getBaseUrl(global.shareBaseUrlKey,global.shareDefaultPath);

export default [

    //host
    {
        name: 'allHost',
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
    {
        name: 'saveHost',
        method: 'saveHost',
        path: '/host/save',
        type: 'post',
        sys: global.share
    },
    {
        name: 'hostDetail',
        method: 'hostDetail',
        path: '/host/detail',
        type: 'post',
        sys: global.share
    },
    {
        name: 'delHost',
        method: 'delHost',
        path: '/host/del',
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
    {
        name: '连接测试',
        method: 'connectTest',
        path: '/cluster/connectTest',
        type: 'post',
        sys: global.share
    },
    {
        name: '生成sshkey',
        method: 'generateSshKeyPair',
        path: '/cluster/generateSshKeyPair',
        type: 'post',
        sys: global.share
    },







]
