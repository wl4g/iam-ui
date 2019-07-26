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
        name: 'Task History',
        icon: 'window-restore',
        component: Ci.TaskHistory
    },
    {
        path: 'project',
        name: 'Project',
        icon: 'window-restore',
        component: Ci.Project
    },
    {
        path: 'dependency',
        name: 'Dependency',
        icon: 'window-restore',
        component: Ci.Dependency
    },
    {
        path: 'trigger',
        name: 'Scheduler',
        icon: 'window-restore',
        component: Ci.Trigger
    },





]
