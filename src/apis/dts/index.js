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
        type: 'json',
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
    },{
        name: 'getDatabaseForSelect',
        method: 'getDatabaseForSelect',
        path: '/gen/datasource/getForSelect',
        type: 'post',
        sysModule: global.dts
    },{
        name: 'testConnectDb',
        method: 'testConnectDb',
        path: '/gen/datasource/testConnectDb',
        type: 'json',
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
        type: 'json',
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
    },{
        name: 'generate',
        method: 'generate',
        path: '/gen/configure/generate',
        type: 'post',
        sysModule: global.dts
    },{
        name: 'loadTables',
        method: 'loadTables',
        path: '/gen/configure/loadTables',
        type: 'post',
        sysModule: global.dts
    },{
        name: 'loadMetadata',
        method: 'loadMetadata',
        path: '/gen/configure/loadMetadata',
        type: 'post',
        sysModule: global.dts
    },{
        name: 'setTableEnable',
        method: 'setTableEnable',
        path: '/gen/configure/setEnable',
        type: 'post',
        sysModule: global.dts
    },{
        name: 'getAttrTypes',
        method: 'getAttrTypes',
        path: '/gen/configure/getAttrTypes',
        type: 'post',
        sysModule: global.dts
    },{
        name: 'synchronizeTable',
        method: 'synchronizeTable',
        path: '/gen/configure/synchronizeTable',
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
        type: 'json',
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
        name: 'getConfigOption',
        method: 'getConfigOption',
        path: '/gen/project/getConfigOption',
        type: 'post',
        sysModule: global.dts
    },

]
