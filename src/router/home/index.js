/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'

export default {
  path: '/home',
  name: 'HOME',
  icon: '',
  component: Home,
  redirect: '/home/overview',
  //children:Main,
  permission: 'home'
}
