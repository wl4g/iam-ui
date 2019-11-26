/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/home',
  name: 'HOME',
  icon: '',
  component: Home,Content,
  redirect: '/home/overview',
  children:Main,
  permission: 'home'
}
