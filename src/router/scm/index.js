/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/scm',
  name: 'SCM',
  icon: '/static/images/menu/IM_on.png',
  component: Home,Content,
  redirect: '/scm/configuration',
  children:Main,
  permission: 'scm',
}
