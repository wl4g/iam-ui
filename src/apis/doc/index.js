import global from "../../common/global_variable";

import enterpriseApi from "./enterpriseApi"
import enterpriseDocument from "./enterpriseDocument"
import enterpriseGroup from "./enterpriseGroup"
import enterpriseProject from "./enterpriseProject"
import enterpriseProjectVersion from "./enterpriseProjectVersion"
import enterpriseTeam from "./enterpriseTeam"

export default [
    //doc file
    {
        name: 'docList',
        method: 'docList',
        path: '/doc/list',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'saveDoc',
        method: 'saveDoc',
        path: '/doc/save',
        type: 'post',
        dataType: 'json',
        sysModule: global.doc
    }, {
        name: 'saveUpload',
        method: 'saveUpload',
        path: '/doc/saveUpload',
        type: 'post',
        dataType: 'json',
        sysModule: global.doc
    }, {
        name: 'docDetail',
        method: 'docDetail',
        path: '/doc/detail',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'delDoc',
        method: 'delDoc',
        path: '/doc/del',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'getHistoryByDocCode',
        method: 'getHistoryByDocCode',
        path: '/doc/getHistoryByDocCode',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'fileCompareWith',
        method: 'fileCompareWith',
        path: '/doc/compareWith',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'shareDoc',
        method: 'shareDoc',
        path: '/doc/shareDoc',
        type: 'post',
        sysModule: global.doc
    },

    {
        name: 'allLabel',
        method: 'allLabel',
        path: '/label/allLabel',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'labelList',
        method: 'labelList',
        path: '/label/list',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'saveLabel',
        method: 'saveLabel',
        path: '/label/save',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'labelDetail',
        method: 'labelDetail',
        path: '/label/detail',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'delLabel',
        method: 'delLabel',
        path: '/label/del',
        type: 'post',
        sysModule: global.doc
    },

    //share
    {
        name: 'shareList',
        method: 'shareList',
        path: '/share/list',
        type: 'post',
        sysModule: global.doc
    }, {
        name: 'cancelShare',
        method: 'cancelShare',
        path: '/share/cancelShare',
        type: 'post',
        sysModule: global.doc
    },


].concat(enterpriseApi).concat(enterpriseGroup)
    .concat(enterpriseDocument).concat(enterpriseProject)
    .concat(enterpriseProjectVersion).concat(enterpriseTeam)
