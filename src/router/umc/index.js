/**
 * Created by maolunhuang 
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/umc',
  name: 'UMC',
  icon: 'inbox',
  component: Home,Content,
  redirect: '/umc/sbamonitor',
  children:Main,
}