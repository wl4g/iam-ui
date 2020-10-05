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
        type: 'json',
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
    },{
        name: 'createAndDownloadTemplate',
        method: 'createAndDownloadTemplate',
        path: '/host/createAndDownloadTemplate',
        type: 'get',
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
        name: '获取控制台日志',
        method: 'getlog',
        path: '/console/consoleLog',
        type: 'json',
        async : false,
        sys: global.erm
    },


    //host netcard
    {
        name: 'netcardList',
        method: 'netcardList',
        path: '/netcard/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveNetcard',
        method: 'saveNetcard',
        path: '/netcard/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'netcardDetail',
        method: 'netcardDetail',
        path: '/netcard/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delNetcard',
        method: 'delNetcard',
        path: '/netcard/del',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'getHostTunnel',
        method: 'getHostTunnel',
        path: '/netcard/getHostTunnel',
        type: 'post',
        sys: global.erm
    },

    //idc
    {
        name: 'idcList',
        method: 'idcList',
        path: '/idc/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveIdc',
        method: 'saveIdc',
        path: '/idc/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'idcDetail',
        method: 'idcDetail',
        path: '/idc/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delIdc',
        method: 'delIdc',
        path: '/idc/del',
        type: 'post',
        sys: global.erm
    },{
        name: 'getIdcForSelect',
        method: 'getIdcForSelect',
        path: '/idc/getForSelect',
        type: 'post',
        sys: global.erm
    },

    //ssh
    {
        name: 'sshList',
        method: 'sshList',
        path: '/ssh/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveSsh',
        method: 'saveSsh',
        path: '/ssh/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'sshDetail',
        method: 'sshDetail',
        path: '/ssh/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delSsh',
        method: 'delSsh',
        path: '/ssh/del',
        type: 'post',
        sys: global.erm
    },{
        name: 'getSshForSelect',
        method: 'getSshForSelect',
        path: '/ssh/getForSelect',
        type: 'post',
        sys: global.erm
    },
    {
        name: '连接测试',
        method: 'connectTest',
        path: '/ssh/connectTest',
        type: 'post',
        sys: global.erm
    },
    {
        name: '生成sshkey',
        method: 'generateSshKeyPair',
        path: '/ssh/generateSshKeyPair',
        type: 'post',
        sys: global.erm
    },

    //docker cluster
    {
        name: 'dockerClusterList',
        method: 'dockerClusterList',
        path: '/dockerCluster/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveDockerCluster',
        method: 'saveDockerCluster',
        path: '/dockerCluster/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'dockerClusterDetail',
        method: 'dockerClusterDetail',
        path: '/dockerCluster/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delDockerCluster',
        method: 'delDockerCluster',
        path: '/dockerCluster/del',
        type: 'post',
        sys: global.erm
    },{
        name: 'getDockerForSelect',
        method: 'getDockerForSelect',
        path: '/dockerCluster/getForSelect',
        type: 'post',
        sys: global.erm
    },

    //k8s cluster
    {
        name: 'k8sClusterList',
        method: 'k8sClusterList',
        path: '/k8sCluster/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveK8sCluster',
        method: 'saveK8sCluster',
        path: '/k8sCluster/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'k8sClusterDetail',
        method: 'k8sClusterDetail',
        path: '/k8sCluster/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delK8sCluster',
        method: 'delK8sCluster',
        path: '/k8sCluster/del',
        type: 'post',
        sys: global.erm
    },{
        name: 'getK8sForSelect',
        method: 'getK8sForSelect',
        path: '/k8sCluster/getForSelect',
        type: 'post',
        sys: global.erm
    },

    //instance
    {
        name: 'instanceList',
        method: 'instanceList',
        path: '/instance/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveInstance',
        method: 'saveInstance',
        path: '/instance/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'instanceDetail',
        method: 'instanceDetail',
        path: '/instance/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delInstance',
        method: 'delInstance',
        path: '/instance/del',
        type: 'post',
        sys: global.erm
    },


    //dockerRepository
    {
        name: 'dockerRepositoryList',
        method: 'dockerRepositoryList',
        path: '/dockerRepository/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveDockerRepository',
        method: 'saveDockerRepository',
        path: '/dockerRepository/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'dockerRepositoryDetail',
        method: 'dockerRepositoryDetail',
        path: '/dockerRepository/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delDockerRepository',
        method: 'delDockerRepository',
        path: '/dockerRepository/del',
        type: 'post',
        sys: global.erm
    },{
        name: 'getDockerRepositoryForSelect',
        method: 'getDockerRepositoryForSelect',
        path: '/dockerRepository/getForSelect',
        type: 'post',
        sys: global.erm
    },{
        name: 'getRepositoryProjects',
        method: 'getRepositoryProjects',
        path: '/dockerRepository/getRepositoryProjects',
        type: 'post',
        sys: global.erm
    },


    //dnsPrivateDomain
    {
        name: 'dnsPrivateDomainList',
        method: 'dnsPrivateDomainList',
        path: '/dnsPrivateDomain/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveDnsPrivateDomain',
        method: 'saveDnsPrivateDomain',
        path: '/dnsPrivateDomain/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'dnsPrivateDomainDetail',
        method: 'dnsPrivateDomainDetail',
        path: '/dnsPrivateDomain/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delDnsPrivateDomain',
        method: 'delDnsPrivateDomain',
        path: '/dnsPrivateDomain/del',
        type: 'post',
        sys: global.erm
    },

    //dnsPrivateResolution
    {
        name: 'dnsPrivateResolutionList',
        method: 'dnsPrivateResolutionList',
        path: '/dnsPrivateResolution/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveDnsPrivateResolution',
        method: 'saveDnsPrivateResolution',
        path: '/dnsPrivateResolution/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'dnsPrivateResolutionDetail',
        method: 'dnsPrivateResolutionDetail',
        path: '/dnsPrivateResolution/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delDnsPrivateResolution',
        method: 'delDnsPrivateResolution',
        path: '/dnsPrivateResolution/del',
        type: 'post',
        sys: global.erm
    },

    //dnsPrivateBlacklist
    {
        name: 'dnsPrivateBlacklistList',
        method: 'dnsPrivateBlacklistList',
        path: '/dnsPrivateBlacklist/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveDnsPrivateBlacklist',
        method: 'saveDnsPrivateBlacklist',
        path: '/dnsPrivateBlacklist/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'dnsPrivateBlacklistDetail',
        method: 'dnsPrivateBlacklistDetail',
        path: '/dnsPrivateBlacklist/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delDnsPrivateBlacklist',
        method: 'delDnsPrivateBlacklist',
        path: '/dnsPrivateBlacklist/del',
        type: 'post',
        sys: global.erm
    },

    //dnsPublicDomain
    {
        name: 'dnsPublicDomainList',
        method: 'dnsPublicDomainList',
        path: '/dnsPublicDomain/list',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'saveDnsPublicDomain',
        method: 'saveDnsPublicDomain',
        path: '/dnsPublicDomain/save',
        type: 'json',
        sys: global.erm
    },
    {
        name: 'dnsPublicDomainDetail',
        method: 'dnsPublicDomainDetail',
        path: '/dnsPublicDomain/detail',
        type: 'post',
        sys: global.erm
    },
    {
        name: 'delDnsPublicDomain',
        method: 'delDnsPublicDomain',
        path: '/dnsPublicDomain/del',
        type: 'post',
        sys: global.erm
    },



]
