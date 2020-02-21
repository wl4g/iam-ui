/**
 * Created by sailengsi on 2017/5/11.
 */
//import { Ci } from 'views/'
import children from "../../views/ci/index"

export default [
    {
        path: 'task',
        name: 'Pipeline',
        icon: '',
        component: children.Task,
        permission: 'ci:task',
    },
    {
        path: 'trigger',
        name: 'Schedule',
        icon: '',
        component: children.Trigger,
        permission: 'ci:trigger',
    },
    {
        path: 'taskhis',
        name: 'Changes',
        icon: '',
        component: children.TaskHistory,
        permission: 'ci:taskhis',
    },
    {
        path: 'project',
        name: 'Projects',
        icon: '',
        component: children.Project,
        permission: 'ci:project',
    },
    {
        path: 'vcs',
        name: 'Vcs',
        icon: '',
        component: children.Vcs,
        permission: 'ci:vcs',
    },


    {
        path: 'taskhisdetail',
        name: 'TaskHisDetail',
        icon: '',
        component: children.TaskHisDetail,
    },
    {
        path: 'analysis',
        name: 'Analysis',
        icon: '',
        component: children.AnalysisHis,
        permission: 'ci:analysis',
    },
    {
        path: 'newpipeline',
        name: 'newpipeline',
        icon: '',
        component: children.NewPipeline,
        permission: 'ci:NewPipeline',
    },

]
