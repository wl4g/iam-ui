<template>
    <div>
        <div class="contentTop">
            <el-form :inline="true" :model="searchParams" class="searchbar" @keyup.enter.native="onSubmit()">
                <el-form-item label="集群">
                    <el-select clearable v-model="searchParams.providerKind" disabled>
                        <el-option
                            v-for="item in dictutil.getDictListByType('vcs_provider')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="命名空间">
                    <el-select clearable v-model="searchParams.authType">
                        <el-option
                                v-for="item in dictutil.getDictListByType('vcs_auth_type')"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <i class="el-icon-refresh" @click="onSubmit" ></i>
                </el-form-item>
            </el-form>
            <div class="topRight">
                <p>Prometheus 监控</p>
                <div>
                    <div class="circle"></div><span style="color:#01e32a">运行中</span>
                </div>
            </div>
        </div>
        <div class="content-frist">
            <div class="fristMain">
                <el-card style="width:64%;height:180px">
                        <el-carousel height="180px" arrow="always" trigger="click" :autoplay='false'>
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3 class="small">{{ item }}</h3>
                            </el-carousel-item>
                    </el-carousel>
                </el-card>
                <el-card style="width:35%;height:180px">
                    wer
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'overView',
    data(){
        return{
            searchParams:{}
        }
    }

}
</script>

<style>
.contentTop{
    display: flex;
    justify-content: space-between;
}
.circle{
    width: 10px;
    height: 10px;
    background-color: #01e32a;
    border-radius: 50%; 
    display: inline-block;
    margin-right: 5px;
}
.topRight{
    display: flex;
    justify-content: space-between;
}
.topRight p{
    padding-right:20px;
    color: #175de9;
}
.fristMain{
    display: flex;
    width:100%
}
.fristMain{
    width:100%;
    display: flex;
    justify-content: space-between;
}
.el-card__body{
    padding: 0 !important;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>