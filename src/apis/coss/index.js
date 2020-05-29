import global from "../../common/global_variable";

export default [
    //bucket
    {
        name: 'listBuckets',
        method: 'listBuckets',
        path: '/webservice/listBuckets',
        type: 'post',
        sys: global.coss
    },{
        name: 'createBucket',
        method: 'createBucket',
        path: '/webservice/createBucket',
        type: 'post',
        sys: global.coss
    },{
        name: 'deleteBucket',
        method: 'deleteBucket',
        path: '/webservice/deleteBucket',
        type: 'post',
        sys: global.coss
    },{
        name: 'getBucketIndex',
        method: 'getBucketIndex',
        path: '/webservice/getBucketIndex',
        type: 'post',
        sys: global.coss
    },{
        name: 'getACLs',
        method: 'getACLs',
        path: '/webservice/getACLs',
        type: 'post',
        sys: global.coss
    },{
        name: 'getCossProviders',
        method: 'getCossProviders',
        path: '/webservice/getCossProviders',
        type: 'post',
        sys: global.coss
    },




    //objects
    {
        name: 'listObjects',
        method: 'listObjects',
        path: '/webservice/listObjects',
        type: 'post',
        sys: global.coss
    },{
        name: 'deleteObject',
        method: 'deleteObject',
        path: '/webservice/deleteObject',
        type: 'post',
        sys: global.coss
    },{
        name: 'getObjectAcl',
        method: 'getObjectAcl',
        path: '/webservice/getObjectAcl',
        type: 'post',
        sys: global.coss
    },{
        name: 'setObjectAcl',
        method: 'setObjectAcl',
        path: '/webservice/setObjectAcl',
        type: 'post',
        sys: global.coss
    },{
        name: 'getObject',
        method: 'getObject',
        path: '/webservice/getObject',
        type: 'post',
        sys: global.coss
    },{
        name: 'createDir',
        method: 'createDir',
        path: '/webservice/createDir',
        type: 'post',
        sys: global.coss
    },{
        name: 'putObjectMetaData',
        method: 'putObjectMetaData',
        path: '/webservice/putObjectMetaData',
        type: 'json',
        sys: global.coss
    },






]
