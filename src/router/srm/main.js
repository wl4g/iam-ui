/**
 * Created by sailengsi on 2017/5/11.
 */
import children from "../../views/srm/index"

export default [
    {
        path: 'console',
        name: 'Log Console',
        icon: '',
        component: children.Console,
        permission: 'srm:console',
    },


]
