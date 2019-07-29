/**
 * Created by sailengsi on 2017/5/11.
 */
import { Ci } from 'views/'


export default [
    {
        path: 'task',
        name: 'Task',
        icon: 'window-restore',
        component: Ci.Task
    },
    {
        path: 'taskhis',
        name: 'History',
        icon: 'window-restore',
        component: Ci.TaskHistory
    },
    {
        path: 'trigger',
        name: 'Scheduler',
        icon: 'window-restore',
        component: Ci.Trigger
    },
    {
        path: 'project',
        name: 'Projects',
        icon: 'window-restore',
        component: Ci.Project
    },


]
