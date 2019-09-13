/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { Login } from 'views/'
import Umc from './umc/'
import Scm from './scm/'
import Ci from './ci/'
import Iam from './iam/'
import Srm from './srm/'
import Share from './share/'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      hidden: true,
      redirect (to) {
        return 'login'
      }
    }, {
      path: '/login',
      name: '登录',
      hidden: true,
      component: Login
    },
    //Function,
    Umc,
    Srm,
    Ci,
    Scm,
    Iam,
    Share,
  ]
})
