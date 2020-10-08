import global from "../../common/global_variable";

export default [
    //bucket
    {
        name: 'listBuckets',
        method: 'listBuckets',
        path: '/webservice/listBuckets',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'createBucket',
        method: 'createBucket',
        path: '/webservice/createBucket',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'deleteBucket',
        method: 'deleteBucket',
        path: '/webservice/deleteBucket',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'getBucketIndex',
        method: 'getBucketIndex',
        path: '/webservice/getBucketIndex',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'getBucketAcl',
        method: 'getBucketAcl',
        path: '/webservice/getBucketAcl',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'setBucketAcl',
        method: 'setBucketAcl',
        path: '/webservice/setBucketAcl',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'resetBucketAcl',
        method: 'resetBucketAcl',
        path: '/webservice/resetBucketAcl',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'getACLs',
        method: 'getACLs',
        path: '/webservice/getACLs',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'getCossProviders',
        method: 'getCossProviders',
        path: '/webservice/getCossProviders',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'listBucketsWithProvider',
        method: 'listBucketsWithProvider',
        path: '/webservice/listBucketsWithProvider',
        type: 'post',
        sysModule: global.coss
    },




    //objects
    {
        name: 'listObjects',
        method: 'listObjects',
        path: '/webservice/listObjects',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'deleteObject',
        method: 'deleteObject',
        path: '/webservice/deleteObject',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'getObjectAcl',
        method: 'getObjectAcl',
        path: '/webservice/getObjectAcl',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'setObjectAcl',
        method: 'setObjectAcl',
        path: '/webservice/setObjectAcl',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'getObject',
        method: 'getObject',
        path: '/webservice/getObject',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'createDir',
        method: 'createDir',
        path: '/webservice/createDir',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'putObjectMetaData',
        method: 'putObjectMetaData',
        path: '/webservice/putObjectMetaData',
        type: 'json',
        sysModule: global.coss
    },{
        name: 'copyObject',
        method: 'copyObject',
        path: '/webservice/copyObject',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'moveObject',
        method: 'moveObject',
        path: '/webservice/moveObject',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'shareObject',
        method: 'shareObject',
        path: '/webservice/shareObject',
        type: 'post',
        sysModule: global.coss
    },{
        name: 'selectObjectContent',
        method: 'selectObjectContent',
        path: '/webservice/selectObjectContent',
        type: 'post',
        sysModule: global.coss
    },






]
