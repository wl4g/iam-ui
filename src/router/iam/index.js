/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/iam',
  name: 'IAM',
  icon: '/static/images/menu/IAM_on.png',
  component: Home,Content,
  redirect: '/iam/online',
  children:Main,
  permission: 'iam',

}
