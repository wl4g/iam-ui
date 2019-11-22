/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/umc',
  name: 'UMC',
  icon: '/static/images/menu/UMC_on.png',
  component: Home,Content,
  redirect: '/umc/sbamonitor',
  children:Main,
  permission: 'umc',
}
