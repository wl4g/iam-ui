/**
 * Created by sailengsi on 2017/5/11.
 */
import children from "../../views/umc/index"

export default [
    {
        path: 'sbamonitor',
        name: 'SBA Monitor',
        icon: '',
        component: children.Sbamonitor,
        permission: 'umc:sbamonitor',
    },
    {
        path: 'biztraffic',
        name: 'Biz Traffic',
        icon: '',
        component: children.Biztraffic,
        permission: 'umc:biztraffic',
    },
/*    {
        path: 'notification',
        name: 'Notification Logs',
        icon: '',
        component: Umc.Notification
    },*/
    {
        path: 'record',
        name: 'Alarm Logs',
        icon: '',
        component: children.Record,
        permission: 'umc:record',
    },
    {
        path: 'config',
        name: 'Alarm Config',
        icon: '',
        component: children.Config,
        permission: 'umc:config',
    },
    {
        path: 'templat',
        name: 'Alarm Template',
        icon: '',
        component: children.Templat,
        permission: 'umc:templat',
    },
    {
        path: 'metrictemplate',
        name: 'Metric Template',
        icon: '',
        component: children.MetricTemplate,
        permission: 'umc:metrictemplate',
    },
]
