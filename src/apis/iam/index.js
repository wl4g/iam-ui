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







    //role
    {
        name: '用户列表',
        method: 'getRoles',
        path: baseUrl+'/role/getRoles',
        type: 'post'
    },


    //group
    {
        name: '获取分组树',
        method: 'getGroupsTree',
        path: baseUrl+'/group/getGroupsTree',
        type: 'post'
    },



]
