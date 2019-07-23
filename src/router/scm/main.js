/**
 * Created by sailengsi on 2017/5/11.
 */
import { Scm } from 'views/'


export default [
    {
        path: 'configuration',
        name: 'Configuration',
        icon: 'bar-chart',
        component: Scm.Configuration
    }, {
        path: 'monitor',
        name: 'SBA Monitor',
        icon: 'reorder',
        component: Scm.Monitor
    }, {
        path: 'historic',
        name: 'Version',
        icon: 'window-restore',
        component: Scm.Historic
    }, {
        path: 'track',
        name: 'History',
        icon: 'window-restore',
        component: Scm.Track
    }, {
        path: 'managemant',
        name: 'Group',
        icon: 'window-restore',
        component: Scm.Managemant
    }, {
        path: 'instanceman',
        name: 'Instance',
        icon: 'window-restore',
        component: Scm.Instanceman
    },



]
