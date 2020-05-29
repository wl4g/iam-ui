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
        name: '获取pipelines给下拉框使用',
        method: 'getPipelineForSelect',
        path: '/task/getForSelect',
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
        name: '获取Detail日志',
        method: 'taskHisReadDetailLog',
        path: '/taskHis/readDetailLog',
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
        method: 'getProjectBySelect',
        path: '/project/getBySelect',
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
    {
        name: '获取分支列表',
        method: 'getProjectByAppClusterId',
        path: '/project/getByAppClusterId',
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

    //analysis
    {
        name: 'analysis列表',
        method: 'analysisList',
        path: '/analysis/list',
        type: 'post',
        sys: global.ci
    },

    //pcm
    {
        name: 'pm获取用户列表',
        method: 'getUsers',
        path: '/pcm/getUsers',
        type: 'post',
        sys: global.ci
    },
    {
        name: 'pm获取项目列表',
        method: 'getProjects',
        path: '/pcm/getProjects',
        type: 'post',
        sys: global.ci
    },
    {
        name: 'pm获取问题列表',
        method: 'getIssues',
        path: '/pcm/getIssues',
        type: 'post',
        sys: global.ci
    },
    {
        name: 'pcm列表',
        method: 'pcmList',
        path: '/pcm/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存pcm',
        method: 'savePcm',
        path: '/pcm/save',
        type: 'post',
        sys: global.ci
    },
    {
        name: 'pcm详情',
        method: 'pcmDetail',
        path: '/pcm/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除pcm',
        method: 'delPcm',
        path: '/pcm/del',
        type: 'post',
        sys: global.ci
    },
    {
        name: '所有pcm',
        method: 'pcmAll',
        path: '/pcm/all',
        type: 'post',
        sys: global.ci
    },


    //orchestration
    {
        name: 'orchestration列表',
        method: 'orchestrationList',
        path: '/orchestration/list',
        type: 'post',
        sys: global.ci
    },
    {
        name: '保存orchestration',
        method: 'saveOrchestration',
        path: '/orchestration/save',
        type: 'json',
        sys: global.ci
    },
    {
        name: 'orchestration详情',
        method: 'orchestrationDetail',
        path: '/orchestration/detail',
        type: 'post',
        sys: global.ci
    },
    {
        name: '删除orchestration',
        method: 'delOrchestration',
        path: '/orchestration/del',
        type: 'post',
        sys: global.ci
    },
    {
        name: '运行orchestration',
        method: 'runOrchestration',
        path: '/orchestration/run',
        type: 'post',
        sys: global.ci
    },

]
