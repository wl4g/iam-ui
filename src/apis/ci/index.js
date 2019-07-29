/**
 * 用户模块
 * @type {Object}
 */
export default [

    //task
    {
        name: '任务列表',
        method: 'taskList',
        path: '/ci-server/task/list',
        type: 'post'
    },
    {
        name: '保存任务',
        method: 'saveTask',
        path: '/ci-server/task/save',
        type: 'post'
    },
    {
        name: '任务详情',
        method: 'taskDetail',
        path: '/ci-server/task/detail',
        type: 'post'
    },
    {
        name: '删除任务',
        method: 'delTask',
        path: '/ci-server/task/del',
        type: 'post'
    },
    {
        name: '根据appGroupId获取任务',
        method: 'getTasksByAppGroupId',
        path: '/ci-server/task/getListByAppGroupId',
        type: 'post'
    },
    {
        name: '创建任务',
        method: 'runTask',
        path: '/ci-server/task/create',
        type: 'post'
    },






    //taskhis
    {
        name: '任务列表',
        method: 'taskHisList',
        path: '/ci-server/taskHis/list',
        type: 'post'
    },
    {
        name: '创建任务',
        method: 'createTaskHis',
        path: '/ci-server/taskHis/create',
        type: 'post'
    },
    {
        name: '任务详情',
        method: 'taskHisDetail',
        path: '/ci-server/taskHis/detail',
        type: 'post'
    },
    {
        name: '回滚',
        method: 'rollbackTaskHis',
        path: '/ci-server/taskHis/rollback',
        type: 'post'
    },

    //project
    {
        name: '项目列表',
        method: 'projectList',
        path: '/ci-server/project/list',
        type: 'post'
    },
    {
        name: '保存项目',
        method: 'saveProject',
        path: '/ci-server/project/save',
        type: 'json'
    },
    {
        name: '项目详情',
        method: 'projectDetail',
        path: '/ci-server/project/detail',
        type: 'post'
    },
    {
        name: '删除项目',
        method: 'delProject',
        path: '/ci-server/project/del',
        type: 'post'
    },
    {
        name: '所有项目',
        method: 'allProject',
        path: '/ci-server/project/all',
        type: 'post'
    },
    {
        name: '解锁项目',
        method: 'unlock',
        path: '/ci-server/project/unlock',
        type: 'post'
    },
    {
        name: '获取分支列表',
        method: 'getBranchs',
        path: '/ci-server/project/getBranchs',
        type: 'post'
    },


    //dependency
    {
        name: '依赖列表',
        method: 'dependencyList',
        path: '/ci-server/dependency/list',
        type: 'post'
    },
    {
        name: '保存依赖',
        method: 'saveDependency',
        path: '/ci-server/dependency/save',
        type: 'post'
    },
    {
        name: '依赖详情',
        method: 'dependencyDetail',
        path: '/ci-server/dependency/detail',
        type: 'post'
    },
    {
        name: '删除依赖',
        method: 'delDependency',
        path: '/ci-server/dependency/del',
        type: 'post'
    },

    //trigger
    {
        name: '触发器列表',
        method: 'triggerList',
        path: '/ci-server/trigger/list',
        type: 'post'
    },
    {
        name: '保存触发器',
        method: 'saveTrigger',
        path: '/ci-server/trigger/save',
        type: 'post'
    },
    {
        name: '触发器详情',
        method: 'triggerDetail',
        path: '/ci-server/trigger/detail',
        type: 'post'
    },
    {
        name: '删除触发器',
        method: 'delTrigger',
        path: '/ci-server/trigger/del',
        type: 'post'
    },
    {
        name: '校验cron',
        method: 'checkCron',
        path: '/ci-server/trigger/cronNextExecTime',
        type: 'post'
    },

]
