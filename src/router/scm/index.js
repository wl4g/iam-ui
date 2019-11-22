/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/scm',
  name: 'SCM',
  icon: '',
  component: Home,Content,
  redirect: '/scm/configuration',
  children:Main,
  permission: 'scm',
}
