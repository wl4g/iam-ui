import global from "../../common/global_variable";

export default [

    //host
    {
        name: 'allHost',
        method: 'allHost',
        path: '/host/allHost',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'hostList',
        method: 'hostList',
        path: '/host/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveHost',
        method: 'saveHost',
        path: '/host/save',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'hostDetail',
        method: 'hostDetail',
        path: '/host/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delHost',
        method: 'delHost',
        path: '/host/del',
        type: 'post',
        sys: global.erm
    },


    //cluster
    {
        name: '集群列表',
        method: 'clusterList',
        path: '/cluster/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: '保存集群',
        method: 'saveCluster',
        path: '/cluster/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: '逻辑删除集群',
        method: 'delCluster',
        path: '/cluster/del',
        type: 'post',
        sys: global.erm
    },
    {
        name: '集群详情',
        method: 'clusterDetail',
        path: '/cluster/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: '所有集群',
        method: 'clusters',
        path: '/cluster/clusters',
        type: 'post',
        sys: global.erm
    },
    {
        name: '实例列表',
        method: 'instances',
        path: '/cluster/instances',
        type: 'post',
        sys: global.erm
    },
    {
        name: '连接测试',
        method: 'connectTest',
        path: '/cluster/connectTest',
        type: 'post',
        sys: global.erm
    },
    {
        name: '生成sshkey',
        method: 'generateSshKeyPair',
        path: '/cluster/generateSshKeyPair',
        type: 'post',
        sys: global.erm
    },

    {
        name: '获取控制台日志',
        method: 'getlog',
        path: '/console/consoleLog',
        type: 'json',
        async : false,
        sys: global.erm
    },







]
