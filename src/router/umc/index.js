/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'

export default {
  path: '/umc',
  name: 'UMC',
  icon: '',
  component: Home,
  redirect: '/umc/sbamonitor',
  //children:Main,
  permission: 'umc',
}
