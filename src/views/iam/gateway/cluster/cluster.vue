<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" :border="true" style="width:100%">
          <el-table-column label="Name">
            <templat slot-scope="scope">
              <div class="name">
                <a @click="toDetail(scope.row)">{{scope.row.Name}}</a>
              </div>
            </templat>
          </el-table-column>
          <el-table-column prop="Name1" label="Name1" width="100"></el-table-column>
          <el-table-column prop="Name2" label="Name2" width=120></el-table-column>
          <el-table-column prop="Name3" label="Name3" :show-overflow-tooltip="true" width=120></el-table-column>
          <el-table-column prop="Name4" label="Name4" :show-overflow-tooltip="true" width=120></el-table-column>
          <el-table-column prop="Name5" label="Name5" :show-overflow-tooltip="true" width=120></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <el-button type="danger" icon='delete' @click="delData(scope.row)">{{$t('message.common.del')}}</el-button>
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
import Cluster from "./cluster.js"
export default Cluster
</script>

<style scoped>
.name {
  cursor: pointer;
}
</style>