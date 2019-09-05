/**
 * @type {Object}
 */
export default [

    //dict
    {
        name: '字典列表',
        method: 'dictList',
        path: '/share-admin/dict/list',
        type: 'post'
    },
    {
        name: '保存字典',
        method: 'saveDict',
        path: '/share-admin/dict/save',
        type: 'post'
    },
    {
        name: '字典详情',
        method: 'dictDetail',
        path: '/share-admin/dict/detail',
        type: 'post'
    },
    {
        name: '删除字典',
        method: 'delDict',
        path: '/share-admin/dict/del',
        type: 'post'
    },
    {
        name: '所有字典类型',
        method: 'allDictType',
        path: '/share-admin/dict/allType',
        type: 'post'
    },
    {
        name: '字典详情',
        method: 'getDictByType',
        path: '/share-admin/dict/getByType',
        type: 'post'
    },
    {
        name: '获取字典缓存',
        method: 'dictCache',
        path: '/share-admin/dict/cache',
        type: 'post'
    },


    //host
    {
        name: '所有host',
        method: 'allHost',
        path: '/share-admin/host/all',
        type: 'post'
    },




]
