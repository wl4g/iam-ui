/**
 * Created by maolunhuang
 */

import { Home , Content } from 'layout/'
import Main  from './main'

export default {
  path: '/iam',
  name: 'IAM',
  icon: '',
  component: Home,Content,
  redirect: '/iam/online',
  children:Main,
  permission: 'iam',

}
