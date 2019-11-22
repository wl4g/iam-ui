/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/srm',
  name: 'SRM',
  icon: '/static/images/menu/SRM_on.png',
  component: Home,Content,
  redirect: '/srm/console',
  children:Main,
  permission: 'srm',
}
