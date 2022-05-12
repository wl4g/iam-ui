<template>
  <div>
    <div class="directions">
      <i class="el-icon-question"></i>
      <div>
        通过刷新功能，您可以删除DCDN节点上已经缓存的资源，并强制DCDN节点回源站获取最新资源，适用于源站资源更新和发布、违规资源清理、域名配置变更等；通过预热功能，您可以在业务高峰前预先将热门资源缓存到DCDN节点，降低源站压力提升用户体验。了解更多
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width:100%">
        <el-table-column label="路由ID" prop="Name" width="180"></el-table-column>
        <el-table-column prop="Name1" label="上游URL" width="180"></el-table-column>
        <el-table-column prop="Name2" label="匹配谓词" width=180></el-table-column>
        <el-table-column label="启用" width=120>
          <templat slot-scope="scope">
            <div class="name">
              <slider-switch :isChecked.sync="scope.row.isChecked" @change="notify(scope.row,scope.$index)"></slider-switch>
            </div>
          </templat>
        </el-table-column>
        <el-table-column :label="$t('message.common.operation')" min-width="180">
          <template slot-scope="scope">
            <a class="table_a drawer_a" @click="editData(scope.row)">修改</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
  </div>
</template>

<script>
import { getRouteConfigTableData } from "../../cluster/mock.js"

export default {
  name: "routeConfig",
  data () {
    return {
      tableData: [],
    }
  },
  mounted () {
    this.tableData = getRouteConfigTableData()
  },
  computed: {
  },
  methods: {
    editData () {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:routeConfigEdit"
        ),
        query: { id: this.$route.query.id, pageType: "routeConfig" },
      })
    },
    notify (row, index) {
      console.info('11111', row, index)
    },
  },
}
</script>

<style>
.drawer .el-drawer.rtl {
  width: 50% !important;
  color: black !important;
}
.drawerTitle {
  display: flex;
  align-items: center;
}
.titleName {
  font-size: 20px;
}
.drawerContent {
  padding: 0 20px;
}
.matchPredicateTitle {
  font-size: 17px;
}
.filterTitle {
  font-size: 17px;
}
.drawer_i {
  font-size: 16px;
  line-height: 2 !important;
  cursor: pointer;
}
.code .el-dialog {
  width: 600px !important;
}
.dialogTree .el-tree-node__content {
  height: 35px !important;
}
.dialogTree input {
  width: 200px !important;
}
span.custom-tree-node.span_item {
  width: 100%;
}
.treeContent {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.treeContentLeft {
  display: flex;
  align-items: center;
}
.treeContentRight {
  padding-right: 6px;
}
i.el-tooltip.el-icon-question {
  padding-right: 5px;
}
.directions {
  margin: 18px 0;
  background: #e2f2ff;
  padding: 18px 10px;
  display: flex;
}
.directions i {
  padding-right: 10px;
}
</style>