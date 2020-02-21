/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'


export default {
  path: '/ci',
  name: 'CI/CD',
  icon: '',
  component: Home,
  redirect: '/ci/task',
  // children:Main,
  permission: 'ci'
}
