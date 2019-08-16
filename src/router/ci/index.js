/**
 * Created by maolunhuang 
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/ci',
  name: 'CI/CD',
  icon: 'inbox',
  component: Home,Content,
  redirect: '/ci/taskhis',
  children:Main,
}