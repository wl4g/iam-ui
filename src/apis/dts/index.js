import global from "../../common/global_variable";

export default [

    //gen database
    {
        name: 'databaseList',
        method: 'databaseList',
        path: '/gen/datasource/list',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'saveDatabase',
        method: 'saveDatabase',
        path: '/gen/datasource/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.udc
    },
    {
        name: 'databaseDetail',
        method: 'databaseDetail',
        path: '/gen/datasource/detail',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'delDatabase',
        method: 'delDatabase',
        path: '/gen/datasource/del',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'getDatabaseForSelect',
        method: 'getDatabaseForSelect',
        path: '/gen/datasource/loadDatasources',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'testConnectDb',
        method: 'testConnectDb',
        path: '/gen/datasource/testConnectDb',
        type: 'post',
        dataType: 'json',
        sysModule: global.udc
    },

    //gen config
    {
        name: 'genConfigList',
        method: 'genConfigList',
        path: '/gen/configure/list',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'saveGenConfig',
        method: 'saveGenConfig',
        path: '/gen/configure/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.udc
    },
    {
        name: 'genConfigDetail',
        method: 'genConfigDetail',
        path: '/gen/configure/detail',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'delGenConfig',
        method: 'delGenConfig',
        path: '/gen/configure/del',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'generate',
        method: 'generate',
        path: '/gen/configure/generate',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'findTables',
        method: 'findTables',
        path: '/gen/configure/findTables',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'loadGenColumns',
        method: 'loadGenColumns',
        path: '/gen/configure/loadGenColumns',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'setTableEnable',
        method: 'setTableEnable',
        path: '/gen/configure/setGenTableStatus',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'getAttrTypes',
        method: 'getAttrTypes',
        path: '/gen/configure/getAttrTypes',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'syncGenTableConfig',
        method: 'syncGenTableConfig',
        path: '/gen/configure/syncGenTableConfig',
        type: 'post',
        sysModule: global.udc
    },

    //gen/project
    {
        name: 'projectList',
        method: 'projectList',
        path: '/gen/project/list',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'saveProject',
        method: 'saveProject',
        path: '/gen/project/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.udc
    },
    {
        name: 'projectDetail',
        method: 'projectDetail',
        path: '/gen/project/detail',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'delProject',
        method: 'delProject',
        path: '/gen/project/del',
        type: 'post',
        sysModule: global.udc
    },
    {
        name: 'extraOptions',
        method: 'extraOptions',
        path: '/gen/project/extraOptions',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'getGenProviderSet',
        method: 'getGenProviderSet',
        path: '/gen/project/getGenProviderSet',
        type: 'post',
        sysModule: global.udc
    }, {
        name: 'tableExtraOptions',
        method: 'tableExtraOptions',
        path: '/gen/configure/tableExtraOptions',
        type: 'post',
        sysModule: global.udc
    },

]
