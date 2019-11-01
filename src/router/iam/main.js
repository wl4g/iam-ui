/**
 * Created by sailengsi on 2017/5/11.
 */
import { Iam } from 'views/'


export default [
    {
        path: 'online',
        name: 'Online',
        icon: 'window-restore',
        component: Iam.Online,
        permission: 'iam:online',
    },
    {
        path: 'user',
        name: 'User',
        icon: 'window-restore',
        component: Iam.User,
        permission: 'iam:user',
    },
    {
        path: 'menu',
        name: 'Menu',
        icon: 'window-restore',
        component: Iam.Menu,
        permission: 'iam:menu',
    },
    {
        path: 'group',
        name: 'Group',
        icon: 'window-restore',
        component: Iam.Group,
        permission: 'iam:group',
    },
    {
        path: 'role',
        name: 'Role',
        icon: 'window-restore',
        component: Iam.Role,
        permission: 'iam:role',
    },






]
