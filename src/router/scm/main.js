/**
 * Created by sailengsi on 2017/5/11.
 */
import children from "../../views/scm/index"

export default [
    {
        path: 'configuration',
        name: 'Configuration',
        icon: '',
        component: children.Configuration,
        permission: 'scm:configuration',
    },{
        path: 'historic',
        name: 'Historical Versions',
        icon: '',
        component: children.Historic,
        permission: 'scm:historic',
    }, {
        path: 'track',
        name: 'Push Tracks',
        icon: '',
        component: children.Track,
        permission: 'scm:track',
    },
]
