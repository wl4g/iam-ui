/**
 * Created by sailengsi on 2017/5/11.
 */
import { Share } from 'views/'


export default [
    {	path: 'dict',
        name: 'Dict',
        icon: 'window-restore',
        component: Share.Dict
    }, {
        path: 'managemant',
        name: 'Group',
        icon: 'window-restore',
        component: Share.Managemant
    }, {
        path: 'instanceman',
        name: 'Instance',
        icon: 'window-restore',
        component: Share.Instanceman
    },

]
