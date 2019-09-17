/**
 * @type {Object}
 */
import {
    store
} from '../../utils/'
let applicationCache = store.get("application_cache");
let baseUrl = '';
let hostname = window.location.protocol + "//" + window.location.hostname;
if(applicationCache && applicationCache != 'null' && applicationCache['share-manager']
    &&applicationCache['share-manager']['intranetBaseUri']){
    baseUrl = applicationCache['share-manager']['intranetBaseUri'];
    console.debug("get base url success !!!  url="+baseUrl);
}else{
    baseUrl = hostname+":14051/share-manager";
    console.debug("get base url fail ,use default!!!  url="+baseUrl);
}

let iamBaseURI = store.get("iamBaseURI");
if(!iamBaseURI || iamBaseURI == "null" || iamBaseURI == null||iamBaseURI==''){
    iamBaseURI = hostname + ":14040/iam-server";
    console.debug("get base url fail ,use default!!!  url="+iamBaseURI);
}else{
    console.debug("get base url success !!!  url="+iamBaseURI);
}

export default [
    //dict
    {
        name: '字典列表',
        method: 'dictList',
        path: baseUrl+'/dict/list',
        type: 'post'
    },
    {
        name: '保存字典',
        method: 'saveDict',
        path: baseUrl+'/dict/save',
        type: 'post'
    },
    {
        name: '字典详情',
        method: 'dictDetail',
        path: baseUrl+'/dict/detail',
        type: 'post'
    },
    {
        name: '删除字典',
        method: 'delDict',
        path: baseUrl+'/dict/del',
        type: 'post'
    },
    {
        name: '所有字典类型',
        method: 'allDictType',
        path: baseUrl+'/dict/allType',
        type: 'post'
    },
    {
        name: '字典详情',
        method: 'getDictByType',
        path: baseUrl+'/dict/getByType',
        type: 'post'
    },
    {
        name: '获取字典缓存',
        method: 'dictCache',
        path: baseUrl+'/dict/cache',
        type: 'post'
    },
    //host
    {
        name: '所有host',
        method: 'allHost',
        path: baseUrl+'/host/all',
        type: 'post'
    },


    //application
    {
        name: '所有application',
        method: 'applicationInfo',
        path: iamBaseURI+'/application/info',
        type: 'post'
    },

]
