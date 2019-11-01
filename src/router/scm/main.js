/**
 * Created by sailengsi on 2017/5/11.
 */
import { Scm } from 'views/'


export default [
    {
        path: 'configuration',
        name: 'Configurations',
        icon: 'window-restore',
        component: Scm.Configuration,
        permission: 'scm:configuration',
    },{
        path: 'historic',
        name: 'Historical Versions',
        icon: 'window-restore',
        component: Scm.Historic,
        permission: 'scm:historic',
    }, {
        path: 'track',
        name: 'Push Tracks',
        icon: 'window-restore',
        component: Scm.Track,
        permission: 'scm:track',
    },
]
