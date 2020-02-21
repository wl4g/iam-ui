/**
 * Created by sailengsi on 2017/5/11.
 */
import children from "../../views/share/index"

export default [
    {
        path: 'cluster',
        name: 'Cluster',
        icon: '',
        component: children.Cluster,
        permission: 'share:cluster',

    }, {
        path: 'dict',
        name: 'Dictionaries',
        icon: '',
        component: children.Dict,
        permission: 'share:dict',
    }, {
        path: 'contact',
        name: 'Alarm Contact',
        icon: '',
        component: children.Contact,
        permission: 'share:contact',
    },{
        path: 'host',
        name: 'Host',
        icon: '',
        component: children.Host,
        permission: 'share:host',

    }
]
