/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/share',
  name: 'SETTING',
  icon: '',
  component: Home,Content,
  redirect: '/share/dict',
  children:Main,
  permission: 'share',
}
