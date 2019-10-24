/**
 * Created by sailengsi on 2017/5/11.
 */
import { Share } from 'views/'
export default [
    {
        path: 'cluster',
        name: 'ClusterNew',
        icon: 'window-restore',
        component: Share.Cluster
    }, {
        path: 'managemant',
        name: 'Cluster',
        icon: 'window-restore',
        component: Share.Managemant
    }, {
        path: 'instance',
        name: 'Instance',
        icon: 'window-restore',
        component: Share.Instance
    },{	path: 'dict',
        name: 'Dictionaries',
        icon: 'window-restore',
        component: Share.Dict
    },
    {
        path: 'contact',
        name: 'Alarm Contact',
        icon: 'window-restore',
        component: Share.Contact
    },
]
