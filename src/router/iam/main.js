/**
 * Created by sailengsi on 2017/5/11.
 */
import { Iam } from 'views/'


export default [
    {
        path: 'online',
        name: 'Online',
        icon: '',
        component: Iam.Online,
        permission: 'iam:online',
    },
    {
        path: 'user',
        name: 'User',
        icon: '',
        component: Iam.User,
        permission: 'iam:user',
    },
    {
        path: 'menu',
        name: 'Menu',
        icon: '',
        component: Iam.Menu,
        permission: 'iam:menu',
    },
    {
        path: 'group',
        name: 'Group',
        icon: '',
        component: Iam.Group,
        permission: 'iam:group',
    },
    {
        path: 'role',
        name: 'Role',
        icon: '',
        component: Iam.Role,
        permission: 'iam:role',
    },






]
