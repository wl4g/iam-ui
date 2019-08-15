/**
 * Created by sailengsi on 2017/5/11.
 */
import { Scm } from 'views/'


export default [
    {
        path: 'configuration',
        name: 'Configurations',
        icon: 'bar-chart',
        component: Scm.Configuration
    },{
        path: 'historic',
        name: 'Historical Versions',
        icon: 'window-restore',
        component: Scm.Historic
    }, {
        path: 'track',
        name: 'Push Tracks',
        icon: 'window-restore',
        component: Scm.Track
    },
]
