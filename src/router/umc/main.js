/**
 * Created by sailengsi on 2017/5/11.
 */
import { Umc } from 'views/'

export default [
    {
        path: 'sbamonitor',
        name: 'SBA Monitor',
        icon: '',
        component: Umc.Sbamonitor,
        permission: 'umc:sbamonitor',
    },
    {
        path: 'biztraffic',
        name: 'Biz Traffic',
        icon: '',
        component: Umc.Biztraffic,
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
        component: Umc.Record,
        permission: 'umc:record',
    },
    {
        path: 'config',
        name: 'Alarm Config',
        icon: '',
        component: Umc.Config,
        permission: 'umc:config',
    },
    {
        path: 'templat',
        name: 'Alarm Template',
        icon: '',
        component: Umc.Templat,
        permission: 'umc:templat',
    },
    {
        path: 'metrictemplate',
        name: 'Metric Template',
        icon: '',
        component: Umc.MetricTemplate,
        permission: 'umc:metrictemplate',
    },
]
