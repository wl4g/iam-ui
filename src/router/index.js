/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { Login } from 'views/'
import { Init } from 'views/'
import Home from './home/'
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
      name: 'Login',
      hidden: true,
      redirect(to) {
        return 'login'
      }
    }, {
      path: '/login',
      name: '登录',
      hidden: true,
      component: Login
    }, {
      path: '/init',
      name: '初始化',
      hidden: true,
      component: Init
    },
    //Function,
    Home,
    Umc,
    Srm,
    Ci,
    Scm,
    Iam,
    Share,
  ]
})
