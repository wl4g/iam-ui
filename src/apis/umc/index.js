/**
 * 用户模块
 * @type {Object}
 */
export default [

    //contact
    {
        name: '联系人列表',
        method: 'contactList',
        path: '/umc-admin/contact/list',
        type: 'post'
    },
    {
        name: '保存',
        method: 'saveContact',
        path: '/umc-admin/contact/save',
        type: 'json'
    },
    {
        name: '分组列表',
        method: 'groupList',
        path: '/umc-admin/contact/groupList',
        type: 'post'
    },
    {
        name: '联系人详情',
        method: 'contactDetail',
        path: '/umc-admin/contact/detail',
        type: 'post'
    },
    {
        name: '逻辑删除联系人',
        method: 'delContact',
        path: '/umc-admin/contact/del',
        type: 'post'
    },

    //group
    {
        name: '联系人分组列表',
        method: 'contactGroupList',
        path: '/umc-admin/contactGroup/list',
        type: 'post'
    },
    {
        name: '保存联系人分组',
        method: 'saveContactGroup',
        path: '/umc-admin/contactGroup/save',
        type: 'post'
    },
    {
        name: '删除联系人分组',
        method: 'delContactGroup',
        path: '/umc-admin/contactGroup/del',
        type: 'post'
    },











]
