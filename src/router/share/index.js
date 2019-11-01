/**
 * Created by maolunhuang 
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/share',
  name: 'Settings',
  icon: 'inbox',
  component: Home,Content,
  redirect: '/share/dict',
  children:Main,
  permission: 'share',
}