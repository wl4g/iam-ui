<template>
    <div>
        <el-row :gutter="20" class="grid">
            <el-col :span="3">
                <div class="grid-content1">Client Authenticator
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                <el-select v-model="value" placeholder="Credent Id and Secret">
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
        <el-row :gutter="20" class="grid">
            <el-col :span="3">
                <div class="grid-content1">Secret</div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                <el-input
                    placeholder="请输入内容"
                    v-model="inputSecret"
                    :disabled="true">
                </el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <el-button type="info" >Regenerate Secret</el-button>
            </el-col>
        </el-row>    
        <el-row :gutter="20" class="grid">
            <el-col :span="3">
                <div class="grid-content1">Registration access token
                    <el-tooltip placement="top">
                        <div slot="content">*********</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                <el-input
                    placeholder="请输入内容"
                    v-model="inputToken"
                    :disabled="true">
                </el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <el-button type="info" >Regenerate Secret</el-button>
            </el-col>
        </el-row>    
    </div>    
</template>
<script>
export default {
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