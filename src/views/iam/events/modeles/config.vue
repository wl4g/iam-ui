<template>
    <div>
        <div class="title">
            Events Config
        </div>
        <div>
            <el-row :gutter="20" class="grid">
                <el-col :span="3">
                    <div class="grid-content1">Events Listeners
                        <el-tooltip placement="top">
                            <div slot="content">*********</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-select v-model="value1" multiple placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row> 
        </div>
        <div class="title">
            Login Event Settings
        </div>
        <div>
            <el-row :gutter="20" class="grid">
                <el-col :span="3">
                    <div class="grid-content1">Save Events
                        <el-tooltip placement="top">
                            <div slot="content">*********</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <slider-switch :isChecked.sync="show" ></slider-switch>
                    </div>
                </el-col>
            </el-row> 
        </div>
        <div class="title">
            Admin Event Settings
        </div>
        <div>
            <el-row :gutter="20" class="grid">
                <el-col :span="3">
                    <div class="grid-content1">Save Events
                        <el-tooltip placement="top">
                            <div slot="content">*********</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <slider-switch :isChecked.sync="show" ></slider-switch>
                    </div>
                </el-col>
            </el-row> 
        </div>
        <div>
            <el-row :gutter="20" class="grid">
                <el-col :span="3"> </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
                        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
                    </div>
                </el-col>
            </el-row> 
            
        </div>
        
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value1: [],
            show:true,
            sliderDisable:false,
            options: [
                {
                    value: '选项1',
                    label: 'jboss-logging'
                }, 
                {
                    value: '选项2',
                    label: 'jboss-logging1'
                }, 
                {
                    value: '选项3',
                    label: 'jboss-logging2'
                }, 
                {
                    value: '选项4',
                    label: 'jboss-logging3'
                }, 
                {
                    value: '选项5',
                    label: 'jboss-logging4'
                }
            ],
            enabled:true,
            checked:false
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
.title{
    font-size: 20px;
    padding: 1vw 0;
}
.grid-content1{
    text-align: right;
}
.grid{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}




</style>