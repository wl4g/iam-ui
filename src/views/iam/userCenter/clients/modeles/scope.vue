<template>
<div>
    <div>grafana Scope Mappings</div>
    <el-row :gutter="20" class="grid">
        <el-col :span="3">
            <div class="grid-content1">Realm Cache
                <el-tooltip placement="top">
                    <div slot="content">*********</div>
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content">
                <slider-switch :isChecked.sync="enabled" ></slider-switch>
            </div>
        </el-col>
    </el-row>  
    <el-row :gutter="20" class="grid">
        <el-col :span="3">
            <div class="grid-content1">Realm Roles
                <el-tooltip placement="top">
                    <div slot="content">*********</div>
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </div>
        </el-col>
        <el-col :span="5">
            <div>
                <div>
                    Available Roles
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div class="check_Box">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <el-button type="primary" :disabled="checkedCities.length>0?false:true">
                        Add selected 》
                    </el-button>
                </div>
            </div>
        </el-col>
        <el-col :span="5">
            <div>
                <div>
                    Assigned Roles
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div class="check_Box">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <el-button type="primary" :disabled="checkedCities.length>0?false:true">
                        Add selected 》
                    </el-button>
                </div>
            </div>
        </el-col>
        <el-col :span="5">
            <div>
                <div>
                    Assigned Roles
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div class="check_Box" disabled>
                    
                </div>
            </div>
        </el-col>
    </el-row>  
</div>
</template>

<script>
export default {
    data(){
        return{
            checkedCities: [],
            cities: ['admnin', 'creat-realm', 'default-roles-master', 'GrafanRole','admnin', 'creat-realm', 'default-roles-master', 'GrafanRole'],
            isIndeterminate: true,
            enabled:0
        }
    },
    methods:{
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        console.info(value)
      }
    }
}
</script>

<style lang="">
.grid-content1{
    text-align: right;
}
.grid{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.check_Box{
    border: 1px #c1c1c1 solid;
    height: 100px;
}
.check_Box .el-checkbox-group{
    display: flex;
    flex-direction: column;
    padding-left: 3%;
    height: 100px;
    overflow-y:scroll ;
}
.check_Box >>> .el-checkbox-group .el-checkbox__inner {
    border-radius: 0;
    background-color:#A8A8A8;
  }

</style>