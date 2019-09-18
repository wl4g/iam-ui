/**
 * Created by sailengsi on 2017/5/11.
 */
import { Umc } from 'views/'

export default [
    {
        path: 'sbamonitor',
        name: 'SBA Monitor',
        icon: 'window-restore',
        component: Umc.Sbamonitor
    },
    {
        path: 'biztraffic',
        name: 'Biz Traffic',
        icon: 'window-restore',
        component: Umc.Biztraffic
    },
/*    {
        path: 'notification',
        name: 'Notification Logs',
        icon: 'window-restore',
        component: Umc.Notification
    },*/
    {
        path: 'record',
        name: 'Alarm Logs',
        icon: 'window-restore',
        component: Umc.Record
    },
    {
        path: 'config',
        name: 'Alarm Config',
        icon: 'window-restore',
        component: Umc.Config
    },
    {
        path: 'templat',
        name: 'Alarm Template',
        icon: 'window-restore',
        component: Umc.Templat
    },
    {
        path: 'metrictemplate',
        name: 'Metric Template',
        icon: 'window-restore',
        component: Umc.MetricTemplate
    },
]
