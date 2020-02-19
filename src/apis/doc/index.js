import global from "../../common/global_variable";

export default [
    //doc file
    {
        name: 'docList',
        method: 'docList',
        path: '/doc/list',
        type: 'post',
        sys: global.doc
    },{
        name: 'saveDoc',
        method: 'saveDoc',
        path: '/doc/save',
        type: 'json',
        sys: global.doc
    },{
        name: 'saveUpload',
        method: 'saveUpload',
        path: '/doc/saveUpload',
        type: 'json',
        sys: global.doc
    },{
        name: 'docDetail',
        method: 'docDetail',
        path: '/doc/detail',
        type: 'post',
        sys: global.doc
    },{
        name: 'delDoc',
        method: 'delDoc',
        path: '/doc/del',
        type: 'post',
        sys: global.doc
    },{
        name: 'getHistoryByDocCode',
        method: 'getHistoryByDocCode',
        path: '/doc/getHistoryByDocCode',
        type: 'post',
        sys: global.doc
    },{
        name: 'fileCompareWith',
        method: 'fileCompareWith',
        path: '/doc/compareWith',
        type: 'post',
        sys: global.doc
    },{
        name: 'shareDoc',
        method: 'shareDoc',
        path: '/doc/shareDoc',
        type: 'post',
        sys: global.doc
    },

    {
        name: 'allLabel',
        method: 'allLabel',
        path: '/label/allLabel',
        type: 'post',
        sys: global.doc
    },{
        name: 'labelList',
        method: 'labelList',
        path: '/label/list',
        type: 'post',
        sys: global.doc
    },{
        name: 'saveLabel',
        method: 'saveLabel',
        path: '/label/save',
        type: 'post',
        sys: global.doc
    },{
        name: 'labelDetail',
        method: 'labelDetail',
        path: '/label/detail',
        type: 'post',
        sys: global.doc
    },{
        name: 'delLabel',
        method: 'delLabel',
        path: '/label/del',
        type: 'post',
        sys: global.doc
    },

    //share
    {
        name: 'shareList',
        method: 'shareList',
        path: '/share/list',
        type: 'post',
        sys: global.doc
    },






]
