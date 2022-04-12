<template>
    <div>
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
                    <el-button type="info" >Clear</el-button>
                </div>
            </el-col>
        </el-row>    
        <el-row :gutter="20" class="grid">
            <el-col :span="3">
                <div class="grid-content1">User Cache
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <el-button type="info" >Clear</el-button>
                </div>
            </el-col>
        </el-row>    
        <el-row :gutter="20" class="grid">
            <el-col :span="3">
                <div class="grid-content1">Keys Cache
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <el-button type="info" >Clear</el-button>
                </div>
            </el-col>
        </el-row>    
   
    </div>    
</template>
<script>
export default {
    name:"cache",
    data(){
        return{
            options: [{
                value: '1',
                label: 'Credentials'
                }, ],
            value: '',
            inputSecret:'Ra30RXwd4rH37IGfMkHAuohU7NJ6oxU8',
            inputToken:'eyJhbGciOijIUzl1 NilsinRScClgOiAiSldUliwiazIkliA',
        }
    }
}
</script>
<style scoped>
.grid-content1{
    text-align: right;
}
.grid{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
</style>