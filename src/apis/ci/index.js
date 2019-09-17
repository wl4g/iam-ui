/**
 * 用户模块
 * @type {Object}
 */
import {
    store
} from '../../utils/'
let applicationCache = store.get("application_cache");
let baseUrl = '';
let hostname = window.location.protocol + "//" + window.location.hostname;
if(applicationCache && applicationCache != 'null' && applicationCache['ci-server']
    &&applicationCache['ci-server']['intranetBaseUri']){
    baseUrl = applicationCache['ci-server']['intranetBaseUri'];
    console.debug("get base url success !!!  url="+baseUrl);
}else{
    baseUrl = hostname+":14046/ci-server";
    console.debug("get base url fail ,use default!!!  url="+baseUrl);
}

export default [

    //task
    {
        name: '任务列表',
        method: 'taskList',
        path: baseUrl+'/task/list',
        type: 'post'
    },
    {
        name: '保存任务',
        method: 'saveTask',
        path: baseUrl+'/task/save',
        type: 'post'
    },
    {
        name: '任务详情',
        method: 'taskDetail',
        path: baseUrl+'/task/detail',
        type: 'post'
    },
    {
        name: '删除任务',
        method: 'delTask',
        path: baseUrl+'/task/del',
        type: 'post'
    },
    {
        name: '根据appClusterId获取任务',
        method: 'getTasksByAppClusterId',
        path: baseUrl+'/task/getListByAppClusterId',
        type: 'post'
    },
    {
        name: '创建任务',
        method: 'runTask',
        path: baseUrl+'/task/create',
        type: 'post'
    },






    //taskhis
    {
        name: '任务列表',
        method: 'taskHisList',
        path: baseUrl+'/taskHis/list',
        type: 'post'
    },
    {
        name: '创建任务',
        method: 'createTaskHis',
        path: baseUrl+'/taskHis/create',
        type: 'post'
    },
    {
        name: '任务详情',
        method: 'taskHisDetail',
        path: baseUrl+'/taskHis/detail',
        type: 'post'
    },
    {
        name: '回滚',
        method: 'rollbackTaskHis',
        path: baseUrl+'/taskHis/rollback',
        type: 'post'
    },

    //project
    {
        name: '项目列表',
        method: 'projectList',
        path: baseUrl+'/project/list',
        type: 'post'
    },
    {
        name: '保存项目',
        method: 'saveProject',
        path: baseUrl+'/project/save',
        type: 'json'
    },
    {
        name: '项目详情',
        method: 'projectDetail',
        path: baseUrl+'/project/detail',
        type: 'post'
    },
    {
        name: '删除项目',
        method: 'delProject',
        path: baseUrl+'/project/del',
        type: 'post'
    },
    {
        name: '所有项目',
        method: 'allProject',
        path: baseUrl+'/project/all',
        type: 'post'
    },
    {
        name: '解锁项目',
        method: 'unlock',
        path: baseUrl+'/project/unlock',
        type: 'post'
    },
    {
        name: '获取分支列表',
        method: 'getBranchs',
        path: baseUrl+'/project/getBranchs',
        type: 'post'
    },


    //dependency
    {
        name: '依赖列表',
        method: 'dependencyList',
        path: baseUrl+'/dependency/list',
        type: 'post'
    },
    {
        name: '保存依赖',
        method: 'saveDependency',
        path: baseUrl+'/dependency/save',
        type: 'post'
    },
    {
        name: '依赖详情',
        method: 'dependencyDetail',
        path: baseUrl+'/dependency/detail',
        type: 'post'
    },
    {
        name: '删除依赖',
        method: 'delDependency',
        path: baseUrl+'/dependency/del',
        type: 'post'
    },

    //trigger
    {
        name: '触发器列表',
        method: 'triggerList',
        path: baseUrl+'/trigger/list',
        type: 'post'
    },
    {
        name: '保存触发器',
        method: 'saveTrigger',
        path: baseUrl+'/trigger/save',
        type: 'post'
    },
    {
        name: '触发器详情',
        method: 'triggerDetail',
        path: baseUrl+'/trigger/detail',
        type: 'post'
    },
    {
        name: '删除触发器',
        method: 'delTrigger',
        path: baseUrl+'/trigger/del',
        type: 'post'
    },
    {
        name: '校验cron',
        method: 'checkCron',
        path: baseUrl+'/trigger/cronNextExecTime',
        type: 'post'
    },

]
