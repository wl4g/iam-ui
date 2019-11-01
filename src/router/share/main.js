/**
 * Created by sailengsi on 2017/5/11.
 */
import {Share} from 'views/'

export default [
    {
        path: 'cluster',
        name: 'Cluster',
        icon: 'window-restore',
        component: Share.Cluster,
        permission: 'share:cluster',

    }, {
        path: 'dict',
        name: 'Dictionaries',
        icon: 'window-restore',
        component: Share.Dict,
        permission: 'share:dict',
    }, {
        path: 'contact',
        name: 'Alarm Contact',
        icon: 'window-restore',
        component: Share.Contact,
        permission: 'share:contact',
    },
]
