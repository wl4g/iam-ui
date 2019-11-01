/**
 * Created by sailengsi on 2017/5/11.
 */
import { Ci } from 'views/'


export default [
    {
        path: 'task',
        name: 'Pipeline',
        icon: 'window-restore',
        component: Ci.Task,
        permission: 'ci:task',
    },
    {
        path: 'trigger',
        name: 'Schedule',
        icon: 'window-restore',
        component: Ci.Trigger,
        permission: 'ci:trigger',
    },
    {
        path: 'taskhis',
        name: 'Changes',
        icon: 'window-restore',
        component: Ci.TaskHistory,
        permission: 'ci:taskhis',
    },
    {
        path: 'project',
        name: 'Projects',
        icon: 'window-restore',
        component: Ci.Project,
        permission: 'ci:project',
    },


]
