/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/share',
  name: 'SETTING',
  icon: '/static/images/menu/CI_on.png',
  component: Home,Content,
  redirect: '/share/dict',
  children:Main,
  permission: 'share',
}
