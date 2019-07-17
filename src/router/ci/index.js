/**
 * Created by maolunhuang 
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/ci',
  name: 'Ci',
  icon: 'inbox',
  component: Home,Content,
  redirect: '/ci/task',
  children:Main,
}