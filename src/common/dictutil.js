import {
    store as stor
} from 'utils/'

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
            return;
        }
        let dicts_cache = stor.get("dicts_cache");
        if (!dicts_cache) {
            return value;
        }
        let dictGroup = dicts_cache.dictMap[type];
        if (!dictGroup) {
            return value;
        }
        let dict = dictGroup[value];
        if (!dict) {
            return value;
        }
        return dict.themes;
    },

    getDictThemesByTypeAndValue: function (type, value) {
        if (!type || !value) {//type can not be null
            return;
        }
        let dicts_cache = stor.get("dicts_cache");
        if (!dicts_cache) {
            return value;
        }
        let dictGroup = dicts_cache.dictMap[type];
        if (!dictGroup) {
            return value;
        }
        let dict = dictGroup[value];
        if (!dict) {
            return value;
        }
        return dict.themes;
    },


}