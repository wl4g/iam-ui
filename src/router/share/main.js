/**
 * Created by sailengsi on 2017/5/11.
 */
import {Share} from 'views/'

export default [
    {
        path: 'cluster',
        name: 'Cluster',
        icon: 'window-restore',
        component: Share.Cluster

    }, {
        path: 'dict',
        name: 'Dictionaries',
        icon: 'window-restore',
        component: Share.Dict
    }, {
        path: 'contact',
        name: 'Alarm Contact',
        icon: 'window-restore',
        component: Share.Contact
    },
]
