/**
 * Created by sailengsi on 2017/5/11.
 */
import { Ci } from 'views/'


export default [
    {
        path: 'task',
        name: 'Deploy',
        icon: 'window-restore',
        component: Ci.Task
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
        name: 'Trigger',
        icon: 'window-restore',
        component: Ci.Trigger
    },





]
