import {
    cache
} from 'utils/'

// Default dict theme(if necessary)
let defaultTheme = "primary";

export default {
    //==========判断是否拥有该权限==========
    isHasPermission: function (permission) {
        if (!permission) {//type can not be null
            return false;
        }
        let menus = cache.get("deepChildRoutes");
        let menu = menus.find(n => {
            return n.permission == permission;
        });
        if(menu){
            return true;
        }else{
            return false;
        }
    },

}
