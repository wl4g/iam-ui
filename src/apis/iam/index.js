import global from "../../common/global_variable";

export default [
    //user
    {
        name: '用户列表',
        method: 'userList',
        path: '/user/list',
        type: 'post',
        sys: global.iam
    },
    {
        name: '保存用户',
        method: 'saveUser',
        path: '/user/save',
        type: 'json',
        sys: global.iam
    },
    {
        name: '用户详情',
        method: 'userDetail',
        path: '/user/detail',
        type: 'post',
        sys: global.iam
    },
    {
        name: '删除用户',
        method: 'delUser',
        path: '/user/del',
        type: 'post',
        sys: global.iam
    },
    {
        name: 'loginCheck',
        method: 'loginCheck',
        path: '/login/check',
        type: 'post',
        sys: global.iam
    },


    //menu
    {
        name: 'menu树列表',
        method: 'getMenuTree',
        path: '/menu/tree',
        type: 'post',
        sys: global.iam
    },
    {
        name: '保存menu',
        method: 'saveMenu',
        path: '/menu/save',
        type: 'json',
        sys: global.iam
    },
    {
        name: '删除menu',
        method: 'delMenu',
        path: '/menu/del',
        type: 'post',
        sys: global.iam
    },
    {
        name: '获取用户menu列表',
        method: 'getMenuList',
        path: '/menu/list',
        type: 'post',
        sys: global.iam
    },




    //role
    {
        name: '角色列表',
        method: 'getRoles',
        path: '/role/getRolesByUserGroups',
        type: 'post',
        sys: global.iam
    },
    {
        name: '角色列表',
        method: 'roleList',
        path: '/role/list',
        type: 'post',
        sys: global.iam
    },
    {
        name: '保存角色',
        method: 'saveRole',
        path: '/role/save',
        type: 'json',
        sys: global.iam
    },
    {
        name: '删除角色',
        method: 'delRole',
        path: '/role/del',
        type: 'post',
        sys: global.iam
    },
    {
        name: '角色详情',
        method: 'roleDetail',
        path: '/role/detail',
        type: 'post',
        sys: global.iam
    },


    //group
    {
        name: '获取分组树',
        method: 'getGroupsTree',
        path: '/group/getGroupsTree',
        type: 'post',
        sys: global.iam
    },
    {
        name: '保存Group',
        method: 'saveGroup',
        path: '/group/save',
        type: 'json',
        sys: global.iam
    },
    {
        name: '删除Group',
        method: 'delGroup',
        path: '/group/del',
        type: 'post',
        sys: global.iam
    },
    {
        name: 'Group详情',
        method: 'groupDetail',
        path: '/group/detail',
        type: 'post',
        sys: global.iam
    },


    //online
    {
        name: 'onlineList',
        method: 'onlineList',
        path: '/mgr/v1/getSessions',
        type: 'post',
        sys: global.iam
    },
    {
        name: 'getIamServer',
        method: 'getIamServer',
        path: '/mgr/v1/findIamServers',
        type: 'post',
        sys: global.iam
    },
    {
        name: 'destroySessions',
        method: 'destroySessions',
        path: '/mgr/v1/destroySessions',
        type: 'post',
        sys: global.iam
    },

    // Cluster Config Informcation
    {
        name: '所有application',
        method: 'clusterConfigInfo',//applicationInfo ==> clusterConfigInfo
        path: '/clusterConfig/info',
        type: 'post',
        sys: global.iam,
        usedefault: true,
    },

    {
        name: 'applylocale',
        method: 'applylocale',
        path: '/login/applylocale',
        type: 'post',
        sys: global.iam
    },

    {
        name: 'logout',
        method: 'logout',
        path: '/logout',
        type: 'post',
        sys: global.iam
    },







]
