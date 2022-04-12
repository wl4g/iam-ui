<template>
    <section >
        <el-form :inline="true"  :model="searchParams" class="searchbar" style="margin-left:10px" @keyup.enter.native="onSubmit()">
            <el-form-item >
                <el-input v-model="searchParams.key" placeholder="search..." style="width:165px"></el-input>
            </el-form-item>
        </el-form>
        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="query-left">
                <div class="line"></div>
                Total： <span class="number">{{total}}</span>
            </div>
            <el-button type="primary" style="float:right;margin-right:20px" @click="addData()">{{$t('message.common.add')}} Dictionaries</el-button>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" :border="true" style="width:100%">
                    <el-table-column prop="key" label="Alogorithm" min-width="100"></el-table-column>
                    <el-table-column prop="value" label="Type"></el-table-column>
                    <el-table-column prop="type" label="Kid" width=120></el-table-column>
                    <el-table-column prop="label" label="Use" :show-overflow-tooltip="true" width=120></el-table-column>
                    <el-table-column prop="labelEn" label="Provider" :show-overflow-tooltip="true" width=120></el-table-column>
                    <el-table-column prop="sort" label="Public keys"></el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange' ></el-pagination>

    </section>
</template>
<script>
export default {
    name:'active',
    data(){
        return{
            //查询条件
            searchParams: {
                key: '',
            },
            total:'',
            tableData:[]
        }
    }
}
</script>