import global from "../../common/global_variable";

export default [

    //gen database
    {
        name: 'databaseList',
        method: 'databaseList',
        path: '/gen/datasource/list',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'saveDatabase',
        method: 'saveDatabase',
        path: '/gen/datasource/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.dts
    },
    {
        name: 'databaseDetail',
        method: 'databaseDetail',
        path: '/gen/datasource/detail',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'delDatabase',
        method: 'delDatabase',
        path: '/gen/datasource/del',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'getDatabaseForSelect',
        method: 'getDatabaseForSelect',
        path: '/gen/datasource/loadDatasources',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'testConnectDb',
        method: 'testConnectDb',
        path: '/gen/datasource/testConnectDb',
        type: 'post',
        dataType: 'json',
        sysModule: global.dts
    },

    //gen config
    {
        name: 'genConfigList',
        method: 'genConfigList',
        path: '/gen/configure/list',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'saveGenConfig',
        method: 'saveGenConfig',
        path: '/gen/configure/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.dts
    },
    {
        name: 'genConfigDetail',
        method: 'genConfigDetail',
        path: '/gen/configure/detail',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'delGenConfig',
        method: 'delGenConfig',
        path: '/gen/configure/del',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'generate',
        method: 'generate',
        path: '/gen/configure/generate',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'findTables',
        method: 'findTables',
        path: '/gen/configure/findTables',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'loadGenColumns',
        method: 'loadGenColumns',
        path: '/gen/configure/loadGenColumns',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'setTableEnable',
        method: 'setTableEnable',
        path: '/gen/configure/setGenTableStatus',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'getAttrTypes',
        method: 'getAttrTypes',
        path: '/gen/configure/getAttrTypes',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'syncGenTableConfig',
        method: 'syncGenTableConfig',
        path: '/gen/configure/syncGenTableConfig',
        type: 'post',
        sysModule: global.dts
    },

    //gen/project
    {
        name: 'projectList',
        method: 'projectList',
        path: '/gen/project/list',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'saveProject',
        method: 'saveProject',
        path: '/gen/project/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.dts
    },
    {
        name: 'projectDetail',
        method: 'projectDetail',
        path: '/gen/project/detail',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'delProject',
        method: 'delProject',
        path: '/gen/project/del',
        type: 'post',
        sysModule: global.dts
    },
    {
        name: 'extraOptions',
        method: 'extraOptions',
        path: '/gen/project/extraOptions',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'getGenProviderSet',
        method: 'getGenProviderSet',
        path: '/gen/project/getGenProviderSet',
        type: 'post',
        sysModule: global.dts
    }, {
        name: 'tableExtraOptions',
        method: 'tableExtraOptions',
        path: '/gen/configure/tableExtraOptions',
        type: 'post',
        sysModule: global.dts
    },

]
