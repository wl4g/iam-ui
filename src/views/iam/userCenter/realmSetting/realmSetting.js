import general from "./modeles/general.vue"
import keys from "./modeles/keys.vue"
import login from "./modeles/login.vue"
import clientRegistration from "./modeles/clientRegistration.vue"
import tokens from "./modeles/tokens.vue"
import cache from "./modeles/cache.vue"
import themes from "./modeles/themes.vue"
export default {
    name: 'realmSetting',
    components:{
        general,keys,login,themes,cache,tokens,clientRegistration
    },
    data() {
        return {
            activeName:'general',
            currentTabComponent:general,
            tabsData:[
                {
                    labelName:'General',
                    name:'general',
                },
                {
                    labelName:'Login',
                    name:'login',
                },
                {
                    labelName:'Keys',
                    name:'keys',
                },
                {
                    labelName:'Themes',
                    name:'themes',
                },
                {
                    labelName:'Cache',
                    name: "cache"
                },
                {
                    labelName:'Tokens',
                    name:'tokens',
                },
                {
                    labelName:'Client Registration',
                    name:'clientRegistration',
                },
            ]
        
        }
    },

    activated() {

    },

    mounted() {
        console.info('1111')
    },

    methods: {
        handleClick(tab, event) {
            this.currentTabComponent=tab.name;
        }
    }
}