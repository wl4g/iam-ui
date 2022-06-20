<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column label="ID">
            <templat slot-scope="scope">
              <div class="name">
                <a @click="toDetail(scope.row)">{{scope.row.Name}}</a>
              </div>
            </templat>
          </el-table-column>
          <el-table-column prop="名称" label="名称" width="100"></el-table-column>
          <el-table-column prop="场景" label="场景" width=120></el-table-column>
          <el-table-column prop="Debug" label="Debug" :show-overflow-tooltip="true" width=120></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a drawer_a">修改</a>|
              <a class="table_a drawer_a" @click="showRuleDetail(scope.row)">查看详情</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>
  </div>
</template>

<script>
import RuleEngine from "./ruleEngine.js"
export default RuleEngine
</script>

<style>
</style>