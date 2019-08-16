/**
 * Created by sailengsi on 2017/5/11.
 */
import { Share } from 'views/'


export default [
    {
        path: 'managemant',
        name: 'Cluster',
        icon: 'window-restore',
        component: Share.Managemant
    }, {
        path: 'instanceman',
        name: 'Instance',
        icon: 'window-restore',
        component: Share.Instanceman
    },{	path: 'dict',
        name: 'Dictionaries',
        icon: 'window-restore',
        component: Share.Dict
    },
]
