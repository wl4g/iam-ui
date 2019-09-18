/**
 * @type {Object}
 */
import {
    store
} from '../../utils/'
let applicationCache = store.get("application_cache");
let hostname = window.location.protocol + "//" + window.location.hostname;
let baseUrl = hostname+":14051/share-manager";
if(applicationCache && applicationCache['share-manager'] && applicationCache['share-manager']['extranetBaseUri']){
    baseUrl = applicationCache['share-manager']['extranetBaseUri'];
} else {
    console.warn("Fallback using default history url for : "+baseUrl);
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
    // Application informcation
    {
        name: '所有application',
        method: 'applicationInfo',
        path: window.IAM.Core.getIamBaseUri() + '/application/info',
        type: 'post'
    },

]
