import loginEvents from "./modeles/loginEvents.vue"
import adminEvents from "./modeles/adminEvents.vue"
import config from "./modeles/config.vue"
export default {
    name: 'Events',
    components:{
        loginEvents,adminEvents,config
    },
    data() {
        return {
            activeName:'loginEvents',
            currentTabComponent:loginEvents,
            tabsData:[
                {
                    labelName:'Login Events',
                    name:'loginEvents',
                },
                {
                    labelName:'Admin Events',
                    name:'adminEvents',
                },
                {
                    labelName:'Config',
                    name:'config',
                },
            ]
        
        }
    },

    activated() {

    },

    mounted() {
    },

    methods: {
        handleClick(tab, event) {
            this.currentTabComponent=tab.name;
        }
    }
}