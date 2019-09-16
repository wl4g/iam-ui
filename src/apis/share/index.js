/**
 * @type {Object}
 */
import {
    store
} from '../../utils/'

let baseUrl = store.get("application_cache");
if(baseUrl||baseUrl==undefined||baseUrl=="null"||baseUrl==null||baseUrl==''){
    baseUrl = "http://localhost:14051/share-manager";
    console.info("get base url fail ,use default!!!  url="+baseUrl);
}else{
    console.info("get base url success !!!  url="+baseUrl);
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
        path: baseUrl+'/application/info',
        type: 'post'
    },

]
