/**
 * Created by sailengsi on 2017/5/11.
 */
import { Ci } from 'views/'


export default [
    {
        path: 'task',
        name: 'Pipeline',
        icon: 'window-restore',
        component: Ci.Task
    },
    {
        path: 'trigger',
        name: 'Schedule',
        icon: 'window-restore',
        component: Ci.Trigger
    },
    {
        path: 'taskhis',
        name: 'Changes',
        icon: 'window-restore',
        component: Ci.TaskHistory
    },
    {
        path: 'project',
        name: 'Projects',
        icon: 'window-restore',
        component: Ci.Project
    },


]
