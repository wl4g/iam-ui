/**
 * Created by sailengsi on 2017/5/11.
 */

import children from "../../views/iam/index"

export default [
    {
        path: 'online',
        name: 'Online',
        icon: '',
        component: children.Online,
        permission: 'iam:online',
    },
    {
        path: 'user',
        name: 'User',
        icon: '',
        component: children.User,
        permission: 'iam:user',
    },
    {
        path: 'menu',
        name: 'Menu',
        icon: '',
        component: children.Menu,
        permission: 'iam:menu',
    },
    {
        path: 'group',
        name: 'Group',
        icon: '',
        component: children.Group,
        permission: 'iam:group',
    },
    {
        path: 'role',
        name: 'Role',
        icon: '',
        component: children.Role,
        permission: 'iam:role',
    },






]
