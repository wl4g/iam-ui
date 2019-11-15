import global from '../../common/global_variable.js'

export default [

    //task
    {
        name: '任务列表',
        method: 'taskList',
        path: '/task/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存任务',
        method: 'saveTask',
        path: '/task/save',
        type: 'json',
        sys: global.ci
    },
    {
        name: '任务详情',
        method: 'taskDetail',
        path: '/task/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除任务',
        method: 'delTask',
        path: '/task/del',
        type: 'post',
        sys: global.ci
    },
    {
        name: '根据appClusterId获取任务',
        method: 'getTasksByAppClusterId',
        path: '/task/getListByAppClusterId',
        type: 'post',
        sys: global.ci
    },
    {
        name: '创建任务',
        method: 'runTask',
        path: '/task/create',
        type: 'post',
        sys: global.ci
    },

    {
        name: '获取依赖',
        method: 'getTaskBuildCommands',
        path: '/task/getDependencys',
        type: 'post',
        sys: global.ci
    },






    //taskhis
    {
        name: '任务列表',
        method: 'taskHisList',
        path: '/taskHis/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '创建任务',
        method: 'createTaskHis',
        path: '/taskHis/create',
        type: 'post',
        sys: global.ci
    },
    {
        name: '任务详情',
        method: 'taskHisDetail',
        path: '/taskHis/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '回滚',
        method: 'rollbackTaskHis',
        path: '/taskHis/rollback',
        type: 'post',
        sys: global.ci
    },
    {
        name: '获取日志',
        method: 'taskHisReadLog',
        path: '/taskHis/readLog',
        type: 'post',
        sys: global.ci
    },
    {
        name: '停止任务',
        method: 'stopTask',
        path: '/taskHis/stopTask',
        type: 'post',
        sys: global.ci
    },


    //project
    {
        name: '项目列表',
        method: 'projectList',
        path: '/project/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存项目',
        method: 'saveProject',
        path: '/project/save',
        type: 'json',
        sys: global.ci
    },
    {
        name: '项目详情',
        method: 'projectDetail',
        path: '/project/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除项目',
        method: 'delProject',
        path: '/project/del',
        type: 'post',
        sys: global.ci
    },
    {
        name: '所有项目',
        method: 'allProject',
        path: '/project/all',
        type: 'post',
        sys: global.ci
    },
    {
        name: '解锁项目',
        method: 'unlock',
        path: '/project/unlock',
        type: 'post',
        sys: global.ci
    },
    {
        name: '获取分支列表',
        method: 'getBranchs',
        path: '/project/getBranchs',
        type: 'post',
        sys: global.ci
    },


    //dependency
    {
        name: '依赖列表',
        method: 'dependencyList',
        path: '/dependency/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存依赖',
        method: 'saveDependency',
        path: '/dependency/save',
        type: 'post',
        sys: global.ci
    },
    {
        name: '依赖详情',
        method: 'dependencyDetail',
        path: '/dependency/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除依赖',
        method: 'delDependency',
        path: '/dependency/del',
        type: 'post',
        sys: global.ci
    },

    //trigger
    {
        name: '触发器列表',
        method: 'triggerList',
        path: '/trigger/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存触发器',
        method: 'saveTrigger',
        path: '/trigger/save',
        type: 'post',
        sys: global.ci
    },
    {
        name: '触发器详情',
        method: 'triggerDetail',
        path: '/trigger/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除触发器',
        method: 'delTrigger',
        path: '/trigger/del',
        type: 'post',
        sys: global.ci
    },
    {
        name: '校验cron',
        method: 'checkCron',
        path: '/trigger/cronNextExecTime',
        type: 'post',
        sys: global.ci
    },


    //vcs
    {
        name: 'vcs列表',
        method: 'vcsList',
        path: '/vcs/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存vcs',
        method: 'saveVcs',
        path: '/vcs/save',
        type: 'post',
        sys: global.ci
    },
    {
        name: 'vcs详情',
        method: 'vcsDetail',
        path: '/vcs/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除vcs',
        method: 'delVcs',
        path: '/vcs/del',
        type: 'post',
        sys: global.ci
    },
    {
        name: '所有vcs',
        method: 'vcsAll',
        path: '/vcs/all',
        type: 'post',
        sys: global.ci
    },
    {
        name: 'vcsProjects',
        method: 'vcsProjects',
        path: '/project/vcsProjects',
        type: 'post',
        sys: global.ci
    },

]
