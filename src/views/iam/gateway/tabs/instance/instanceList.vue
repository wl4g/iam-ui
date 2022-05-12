<template>
  <div>
    <div>
      <template>
        <el-table :data="tableData" style="width:100%">
          <el-table-column prop="instanceID" label="InstanceID" width="100"></el-table-column>
          <el-table-column prop="ips" label="IPs" width=120></el-table-column>
          <el-table-column prop="lable" label="Lable" width=120></el-table-column>
          <el-table-column prop="status" label="Status(运行/挂起)" width=120></el-table-column>
          <el-table-column prop="configVersion" label="ConfigVersion" width=120></el-table-column>
          <el-table-column prop="monitoring" label="Monitoring" width=120></el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <a class="table_a" @click="editData(scope.row)">配置</a>|
              <a class="table_a">配置</a>|
              <a class="table_a">配置</a>
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
import { getInstanceListData } from "../../cluster/mock.js"
export default {
  name: "instanceList",
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.tableData = getInstanceListData()
  },
  methods: {
    editData (row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:routeConfigEdit"
        ),
        query: { id: row.instanceID, pageType: "instance" },
      })
    },
  }
}
</script>

<style>
</style>