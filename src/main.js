// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'register/'
import store from 'store/'
import dictutil from './common/dictutil'
import globalVariable from './common/global_variable.js'
Vue.prototype.dictutil = dictutil;
Vue.prototype.GLOBAL = globalVariable;

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import dictstore from "./store/global/dictstore";
import promise from "./views/login/promise";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    beforeCreate () {
        console.debug('根组件：beforeCreate')
    },
    created () {
        console.debug('根组件：created')
    },
    beforeMount () {
        console.debug('根组件：beforeMount')
    },
    mounted () {
        console.debug('根组件：mounted')
        promise.buildRoleRoute(this);
    }
});


router.beforeEach((to, from, next) => {
    console.info('路由全局勾子：beforeEach')
    next()
})


