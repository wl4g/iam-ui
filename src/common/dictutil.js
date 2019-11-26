import {
    store as stor
} from 'utils/'

//config
let defaultLabel = "- -";
let defaultTheme = "primary";

export default {


    //==========字典共用方法==========
    getDictListByType: function (type) {
        if (!type) {//type can not be null
            return [];
        }
        let dicts_cache = stor.get("dicts_cache");
        if (!dicts_cache) {
            return [];
        }
        let dictGroup = dicts_cache.dictList[type];
        console.info(dictGroup);
        return dictGroup;
    },

    getDictLabelByTypeAndValue: function (type, value) {
        if (!type || !value) {//type can not be null
            return defaultLabel;
        }
        let dicts_cache = stor.get("dicts_cache");
        if (!dicts_cache) {
            return defaultLabel;
        }
        let dictGroup = dicts_cache.dictMap[type];
        if (!dictGroup) {
            return defaultLabel;
        }
        let dict = dictGroup[value];
        if (!dict) {
            return defaultLabel;
        }
        return dict.label;
    },

    getDictThemesByTypeAndValue: function (type, value) {
        //defalut return primary theme , because the default theme is ugly
        if (!type || !value) {//type can not be null
            return defaultTheme;
        }
        let dicts_cache = stor.get("dicts_cache");
        if (!dicts_cache) {
            return defaultTheme;
        }
        let dictGroup = dicts_cache.dictMap[type];
        if (!dictGroup) {
            return defaultTheme;
        }
        let dict = dictGroup[value];
        if (!dict) {
            return defaultTheme;
        }
        return dict.themes;
    },


}
