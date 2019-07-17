/**
 * Created by sailengsi on 2017/5/11.
 */
import { Scm } from 'views/'
import { Srm } from 'views/'
import { Ci } from 'views/'


export default [
    {
        path: 'task',
        name: '部署',
        icon: 'window-restore',
        component: Ci.Task
    },
    {
        path: 'project',
        name: '项目配置',
        icon: 'window-restore',
        component: Ci.Project
    },
    {
        path: 'dependency',
        name: '依赖',
        icon: 'window-restore',
        component: Ci.Dependency
    },
    {
        path: 'trigger',
        name: '触发器',
        icon: 'window-restore',
        component: Ci.Trigger
    },





]
