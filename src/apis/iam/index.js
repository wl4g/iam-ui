import global from "../../common/global_variable";

let baseUrl = global.getBaseUrl(global.iamBaseUrlKey,global.iamDefaultPath);

export default [
    //user
    {
        name: '用户列表',
        method: 'userList',
        path: baseUrl+'/user/list',
        type: 'post'
    },
    {
        name: '保存用户',
        method: 'saveUser',
        path: baseUrl+'/user/save',
        type: 'json'
    },
    {
        name: '用户详情',
        method: 'userDetail',
        path: baseUrl+'/user/detail',
        type: 'post'
    },
    {
        name: '删除用户',
        method: 'delUser',
        path: baseUrl+'/user/del',
        type: 'post'
    },
    {
        name: 'loginCheck',
        method: 'loginCheck',
        path: baseUrl+'/login/check',
        type: 'post'
    },


    //menu
    {
        name: 'menu树列表',
        method: 'getMenuTree',
        path: baseUrl+'/menu/getMenuTree',
        type: 'post'
    },
    {
        name: '保存menu',
        method: 'saveMenu',
        path: baseUrl+'/menu/save',
        type: 'json'
    },
    {
        name: '删除menu',
        method: 'delMenu',
        path: baseUrl+'/menu/del',
        type: 'post'
    },
    {
        name: '获取用户menu列表',
        method: 'getMenuList',
        path: baseUrl+'/menu/getMenuList',
        type: 'post'
    },




    //role
    {
        name: '角色列表',
        method: 'getRoles',
        path: baseUrl+'/role/getRolesByUserGroups',
        type: 'post'
    },
    {
        name: '角色列表',
        method: 'roleList',
        path: baseUrl+'/role/list',
        type: 'post'
    },
    {
        name: '保存角色',
        method: 'saveRole',
        path: baseUrl+'/role/save',
        type: 'json'
    },
    {
        name: '删除角色',
        method: 'delRole',
        path: baseUrl+'/role/del',
        type: 'post'
    },
    {
        name: '角色详情',
        method: 'roleDetail',
        path: baseUrl+'/role/detail',
        type: 'post'
    },


    //group
    {
        name: '获取分组树',
        method: 'getGroupsTree',
        path: baseUrl+'/group/getGroupsTree',
        type: 'post'
    },
    {
        name: '保存Group',
        method: 'saveGroup',
        path: baseUrl+'/group/save',
        type: 'json'
    },
    {
        name: '删除Group',
        method: 'delGroup',
        path: baseUrl+'/group/del',
        type: 'post'
    },
    {
        name: 'Group详情',
        method: 'groupDetail',
        path: baseUrl+'/group/detail',
        type: 'post'
    },


    //online
    {
        name: 'onlineList',
        method: 'onlineList',
        path: baseUrl+'/mgr/v1/getSessions',
        type: 'post'
    },
    {
        name: 'getIamServer',
        method: 'getIamServer',
        path: baseUrl+'/mgr/v1/getIamServer',
        type: 'post'
    },



]
