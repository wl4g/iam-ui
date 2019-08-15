// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'register/'
import store from 'store/'

import {
    store as stor
} from 'utils/'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import dictstore from "./store/global/dictstore";

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.config.devtools = true;


//==========字典共用方法==========
/*
* 尝试过提取到一个文件中，但是出现'this.$$api_share_allDictType'这种方法无法调用的问题，所以暂时先放在这里
* */
Vue.prototype.getDictListByType = function (type) {
    if (!type) {//type can not be null
        return [];
    }
    let dicts_cache = stor.get("dicts_cache");
    if(!dicts_cache){
        return [];
    }
    let dictGroup = dicts_cache.dictList[type];
    return dictGroup;
};

Vue.prototype.getDictLabelByTypeAndValue = function (type, value) {
    if (!type || !value) {//type can not be null
        return;
    }
    let dicts_cache = stor.get("dicts_cache");
    if(!dicts_cache){
        return value;
    }
    let dictGroup = dicts_cache.dictMap[type];
    if(!dictGroup){
        return value;
    }
    let dict = dictGroup[value];
    if (!dict) {
        return value;
    }
    return dict.themes;
}

Vue.prototype.getDictThemesByTypeAndValue = function (type, value) {
    if (!type || !value) {//type can not be null
        return;
    }
    let dicts_cache = stor.get("dicts_cache");
    if(!dicts_cache){
        return value;
    }
    let dictGroup = dicts_cache.dictMap[type];
    if(!dictGroup){
        return value;
    }
    let dict = dictGroup[value];
    if (!dict) {
        return value;
    }
    return dict.themes;
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
})


//function
//dict

