import settings from "./modeles/settings.vue"
import credentials from "./modeles/credentials.vue"
import keys from "./modeles/keys.vue"
import roles from "./modeles/roles.vue"
import clientScopes from "./modeles/clientScopes.vue"
import mappers from "./modeles/mappers.vue"
import scoped from "./modeles/scope.vue"
export default{
    name:"clients",
    components:{
        settings,credentials,keys,roles,clientScopes,mappers,scoped
    },
    data(){
        return {
            isShow:false,
            //查询条件
            searchParams: {
                key: '',
            },
            total:'',
            tableData:[],
            activeName:'settings',
            currentTabComponent:settings,
            tabsData:[
                {
                    labelName:'Settings',
                    name:'settings',
                },
                {
                    labelName:'Credentials',
                    name:'credentials',
                },
                {
                    labelName:'Keys',
                    name:'keys',
                },
                {
                    labelName:'Roles',
                    name:'roles',
                },
                {
                    labelName:'Client Scopes',
                    name:'clientScopes',
                },
                {
                    labelName:'Mappers',
                    name:'mappers',
                },
                {
                    labelName:'Scpoed',
                    name:'scoped',
                },
            ]
        
        }
    },
    
    methods: {
        handleClick(tab, event) {
            this.currentTabComponent=tab.name;
        },
        addData(){
            this.isShow = !this.isShow
        }
    }
}