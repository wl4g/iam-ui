<template>
</template><template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane
                v-for="(item, index) in tabsData"
                :key="item.name"
                :label="item.labelName"
                :name="item.name"
            >
                <keep-alive>
                    <component :is="currentTabComponent"></component>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import initalAccessToken from "./cilentRegModeles/initalAccessToken.vue"
export default ({
    name:"clientRegistration",
    components:{
        initalAccessToken
    },
    data(){
        return{
            activeName:'initalAccessToken',
            currentTabComponent:initalAccessToken,
            tabsData:[
                {
                    labelName:'Inital Access Token',
                    name:'initalAccessToken',
                },
                {
                    labelName:'Client Registration Polices',
                    name:'clientRegistrationPolices',
                }
            ]
        }
    },
    methods:{
        handleClick(tab, event) {
            this.currentTabComponent=tab.name;
        }
    }
})
</script>
