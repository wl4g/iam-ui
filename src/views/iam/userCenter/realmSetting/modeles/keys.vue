<template>
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
import active from "./keyModeles/active.vue"
export default ({
    name:"keys",
    components:{
        active
    },
    data(){
        return{
            activeName:'active',
            currentTabComponent:active,
            tabsData:[
                {
                    labelName:'Active',
                    name:'active',
                },
                {
                    labelName:'Passive',
                    name:'Passive',
                },
                {
                    labelName:'Disable',
                    name:'Disable',
                },
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
