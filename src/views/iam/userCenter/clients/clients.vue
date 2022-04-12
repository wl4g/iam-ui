<template>
    <div>
    <section v-if="!isShow">
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
            <div>
                <el-button type="primary" style="float:right;margin-right:20px" @click="addData()">Create</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" :border="true" style="width:100%">
                    <el-table-column prop="key" label="Name" min-width="100"></el-table-column>
                    <el-table-column prop="value" label="Category"></el-table-column>
                    <el-table-column prop="type" label="Type" width=120></el-table-column>
                    <el-table-column prop="label" label="Priority Order" :show-overflow-tooltip="true" width=120></el-table-column>
                    <el-table-column :label="$t('message.common.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" icon='delete' @click="delData(scope.row)">{{$t('message.common.del')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange' ></el-pagination>

    </section>
        <section v-if="isShow">
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
        </section>
    </div>
</template>

<script>
import clients from './clients.js'

export default clients
</script>
