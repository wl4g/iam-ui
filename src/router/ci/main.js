/**
 * Created by sailengsi on 2017/5/11.
 */
import { Ci } from 'views/'


export default [
    {
        path: 'task',
        name: 'Pipeline',
        icon: '',
        component: Ci.Task,
        permission: 'ci:task',
    },
    {
        path: 'trigger',
        name: 'Schedule',
        icon: '',
        component: Ci.Trigger,
        permission: 'ci:trigger',
    },
    {
        path: 'taskhis',
        name: 'Changes',
        icon: '',
        component: Ci.TaskHistory,
        permission: 'ci:taskhis',
    },
    {
        path: 'project',
        name: 'Projects',
        icon: '',
        component: Ci.Project,
        permission: 'ci:project',
    },
    {
        path: 'vcs',
        name: 'Vcs',
        icon: '',
        component: Ci.Vcs,
        permission: 'ci:vcs',
    },


]
