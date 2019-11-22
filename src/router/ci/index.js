/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/ci',
  name: 'CI/CD',
  icon: '',
  component: Home,Content,
  redirect: '/ci/task',
  children:Main,
  permission: 'ci'
}
