<template>
  <div>
    <div class="drawerTitle">
      <div class="titleName">转发策略</div>
      <el-tooltip placement="top">
        <div slot="content">*********</div>
        <i class="el-icon-question"></i>
      </el-tooltip>
      <div class="subtitle">添加域名和路径转发</div>
    </div>
    <div class="drawerContent">
      <div class="matchPredicate">
        <div class="matchPredicateTitle">匹配谓词</div>
        <el-table :data="matchPredicateData" style="width:100%">
          <el-table-column label="谓词类型">
            <templat slot-scope="scope">
              <el-select v-model="scope.row.predicateType" placeholder="请选择类型" @change="queryName(scope.row)" @click.native="changePredicateOptions">
                <el-option v-for="item in predicateOptions" :key="item.value" :label="item.label" :value="item.predicateType">
                </el-option>
              </el-select>
            </templat>
          </el-table-column>
          <el-table-column label="值">
            <templat slot-scope="scope">
              <el-input v-model="scope.row.value" @change="changeValue(scope.row)" :placeholder='scope.row.placeholder'></el-input>
            </templat>
          </el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <i class="el-icon-remove-outline drawer_i" @click="delMatchPredicate(scope.$index)" v-if="matchPredicateData.length > 1"></i>
              <i class="el-icon-circle-plus-outline  drawer_i" v-if="scope.$index == (matchPredicateData.length - 1) && matchPredicateData.length < predicateOptionsAll.length " @click="addMatchPredicate"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="filter">
        <div class="filterTitle">过滤器</div>
        <el-table :data="filterData" style="width:100%">
          <el-table-column label="谓词类型">
            <templat slot-scope="scope">
              <el-select v-model="scope.row.filterType" placeholder="请选择类型" @click.native="changeFilterOptions">
                <el-option v-for="item in filterOptions" :key="item.filterType" :label="item.filterType" :value="item.filterType">
                </el-option>
              </el-select>
            </templat>
          </el-table-column>
          <el-table-column label="值">
            <templat slot-scope="scope">
              <el-button type="success" @click="showValue(scope.row.filterType)">查看</el-button>
            </templat>
          </el-table-column>
          <el-table-column :label="$t('message.common.operation')" min-width="100">
            <template slot-scope="scope">
              <i class="el-icon-remove-outline drawer_i" @click="delFilter(scope.$index)" v-if="filterData.length > 1"></i>
              <i class="el-icon-circle-plus-outline  drawer_i" v-if="scope.$index == (filterData.length - 1) && filterData.length < filterOptionsAll.length " @click="addFilter"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose" class="drawer">
      <div class="drawer_content">
        <el-tree :data="filterTreeData" :props="defaultProps" node-key="index" class="dialogTree">
          <span class="custom-tree-node span_item" slot-scope="{ node, data }">
            <span class="treeContent" v-if="data._show">
              <div class="treeContentLeft">
                <!-- key -->
                <el-select v-model="data.name" placeholder="请选择类型" @change="selectFilterName($event,data)">
                  <el-option v-for="item in dialogFilterOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <el-tooltip placement="top">
                  <div slot="content">{{data.help}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
                <!-- value -->
                <!-- 多选 -->
                <el-select v-model="data.defaultValue" collapse-tags multiple placeholder="请选择" v-if="data.muti == 'true'">
                  <el-option v-for="item in data.options" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 单选 -->
                <el-select v-model="data.defaultValue" v-else-if="data.type && data.type != 'string'">
                  <el-option v-for="item in data.options" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 输入框 -->
                <el-input style="width: 51%;" v-else v-model="data.defaultValue" @change="changeValue(scope.row)" :placeholder='data.help'></el-input>
                <el-tooltip placement="top" v-if="data.options">
                  <div slot="content">{{rightToolTip}}</div>
                  <i class="el-icon-question selectTooltip" @mouseenter="showToolTip(data)"></i>
                </el-tooltip>
              </div>
              <div class="treeContentRight">
                <i class="el-icon-remove-outline drawer_i" @click.stop="delNodeData(node,data)"></i>
                <i class="el-icon-circle-plus-outline  drawer_i" @click.stop="addNodeData(node,data)" v-if="data.childrens.length > 0"></i>
              </div>
            </span>
            <span v-else class="notShowNode"></span>
          </span>
        </el-tree>
        <div class="addTopNode" @click="addTopNode">+添加</div>
      </div>
      <span class="demo-drawer__footer">
        <el-button class="drawerButton" @click="dialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
        <el-button class="drawerButton" type="primary">确定</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import RouteConfigEdit from "./routeConfigEdit.js"
export default RouteConfigEdit
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
.drawer_content {
  height: 95%;
}
.demo-drawer__footer {
  height: 5%;
  display: flex;
  justify-content: space-around;
}
.drawerButton {
  width: 46%;
  height: 34px;
}
i.el-tooltip.el-icon-question {
  padding-right: 5px;
}
</style>