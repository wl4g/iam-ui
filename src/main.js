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
import 'element-ui/lib/theme-chalk/index.css'
import dictstore from "./store/global/dictstore";
import promise from "./views/login/promise";
import i18n from './i18n/i18n'

// mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

//vue-clipboard2
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI,{
    size: 'mini'
});
Vue.config.productionTip = false;
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
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
    console.debug('路由全局勾子：beforeEach')
    next()
})


