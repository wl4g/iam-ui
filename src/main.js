// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'register/'
import store from 'store/'
import dictutil from './common/dictutil'
Vue.prototype.dictutil = dictutil;

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import dictstore from "./store/global/dictstore";

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
})
