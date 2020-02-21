/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'

export default {
  path: '/scm',
  name: 'SCM',
  icon: '',
  component: Home,
  redirect: '/scm/configuration',
  //children:Main,
  permission: 'scm',
}
