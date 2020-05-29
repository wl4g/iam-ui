import global from '../../common/global_variable.js'

export default [
    //vcs
    {
        name: 'vcs列表',
        method: 'vcsList',
        path: '/vcs/list',
        type: 'post',
        sys: global.vcs
    },
    {
        name: '保存vcs',
        method: 'saveVcs',
        path: '/vcs/save',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'vcs详情',
        method: 'vcsDetail',
        path: '/vcs/detail',
        type: 'post',
        sys: global.vcs
    },
    {
        name: '删除vcs',
        method: 'delVcs',
        path: '/vcs/del',
        type: 'post',
        sys: global.vcs
    },
    {
        name: '所有vcs',
        method: 'vcsAll',
        path: '/vcs/all',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'vcsProjects',
        method: 'vcsProjects',
        path: '/project/vcsProjects',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'getGroups',
        method: 'getGroups',
        path: '/vcs/getGroups',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'getProjects',
        method: 'getProjects',
        path: '/vcs/getProjects',
        type: 'post',
        sys: global.vcs
    },

    {
        name: 'getProjectById',
        method: 'getProjectById',
        path: '/vcs/getProjectById',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'getBranchs',
        method: 'getBranchs',
        path: '/vcs/getBranchs',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'getTags',
        method: 'getTags',
        path: '/vcs/getTags',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'createBranch',
        method: 'createBranch',
        path: '/vcs/createBranch',
        type: 'post',
        sys: global.vcs
    },
    {
        name: 'createTag',
        method: 'createTag',
        path: '/vcs/createTag',
        type: 'post',
        sys: global.vcs
    },



]
