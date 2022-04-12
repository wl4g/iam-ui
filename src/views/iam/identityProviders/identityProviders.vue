<template>
        <section>
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
                 <el-select v-model="value" placeholder="add provider...">
                    <el-option-group
                    v-for="group in options"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-option-group>
                </el-select>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" :border="true" style="width:100%">
                    <el-table-column prop="key" label="Name" min-width="100"></el-table-column>
                    <el-table-column prop="value" label="Provider" width="100"></el-table-column>
                    <el-table-column prop="type" label="Enabled" width=120></el-table-column>
                    <el-table-column prop="label" label="Hidden" :show-overflow-tooltip="true" width=120></el-table-column>
                    <el-table-column prop="label" label="Link only" :show-overflow-tooltip="true" width=120></el-table-column>
                    <el-table-column prop="label" label="GUI order" :show-overflow-tooltip="true" width=120></el-table-column>
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
</template>

<script>
import IdentityProviders from "./identityProviders.js"
export default IdentityProviders
</script>