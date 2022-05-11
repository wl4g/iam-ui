<template>
  <div class="routerConfig">
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
        <el-table :data="matchPredicateData" style="width: 100%">
          <el-table-column label="谓词类型">
            <templat slot-scope="scope">
              <el-select v-model="scope.row.type" placeholder="请选择类型" @change="queryName(scope.row)" @click.native="changePredicateOptions">
                <el-option v-for="item in predicateOptions" :key="item.value" :label="item.label" :value="item.type">
                </el-option>
              </el-select>
            </templat>
          </el-table-column>
          <el-table-column label="编辑">
            <templat slot-scope="scope">
              <el-input v-model="scope.row.value" @change="changeValue(scope.row)" :placeholder="scope.row.placeholder"></el-input>
            </templat>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <i class="el-icon-remove-outline drawer_i" @click="delMatchPredicate(scope.$index)" v-if="matchPredicateData.length > 1"></i>
              <i class="el-icon-circle-plus-outline drawer_i" v-if="
                  scope.$index == matchPredicateData.length - 1 &&
                  predicateOptions.length > 0
                " @click="addMatchPredicate"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="filter">
        <div class="filterTitle">过滤器</div>
        <el-table :data="filterData" style="width: 100%">
          <el-table-column label="谓词类型">
            <templat slot-scope="scope">
              <el-select v-model="scope.row.type" placeholder="请选择类型" @click.native="getFilterOptions">
                <el-option v-for="item in filterOptions" :key="item.type" :label="item.type" :value="item.type">
                </el-option>
              </el-select>
            </templat>
          </el-table-column>
          <el-table-column label="编辑">
            <templat slot-scope="scope">
              <el-button type="success" @click="editValue(scope.row)">修改</el-button>
            </templat>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <i class="el-icon-remove-outline drawer_i" @click="delFilter(scope.$index)" v-if="filterData.length > 1"></i>
              <i class="el-icon-circle-plus-outline drawer_i" v-if="
                  scope.$index == filterData.length - 1 &&
                  filterData.length < filterOptionsAll.length
                " @click="addFilter"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="routerConfigBottom">
        <el-button class="drawerButton" @click="dialogVisible = false">{{
          $t("message.common.cancel")
        }}</el-button>
        <el-button class="drawerButton" type="primary" @click="commitAllData">提交</el-button>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose" class="drawer">
      <slot></slot>
      <div slot="title" class="drawerTitle">
        <div class="titleName">转发策略编辑</div>
      </div>
      <div class="drawer_content">
        <el-tree :data="filterTreeData" :props="defaultProps" node-key="index" class="dialogTree">
          <span class="custom-tree-node span_item" slot-scope="{ node, data }">
            <span class="treeContent">
              <div class="treeContentLeft">
                <!-- key -->
                <el-select v-model="data.name" placeholder="请选择类型" @click.native="handleFilterKeyOptions(node, data)" @change="selectFilterName($event, data)">
                  <el-option v-for="item in dialogFilterOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 提示  -->
                <el-tooltip placement="top">
                  <div slot="content">{{ data.help }}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
                <!-- value start -->
                <!-- 多选 -->
                <el-select v-model="data.value" collapse-tags multiple placeholder="请选择" v-if="data.muti == 'true'" @click.native="handleFilterValueOptions(node, data)">
                  <el-option v-for="item in selectFilterValueOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 单选 -->
                <el-select v-model="data.value" v-else-if="
                    data.type && data.type != 'string' && data.type != 'int'
                  " @click.native="handleFilterValueOptions(node, data)">
                  <el-option v-for="item in selectFilterValueOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 输入框 -->
                <el-input style="width: 51%" v-else v-model="data.value" @change="changeValue(data)" :placeholder="data.help"></el-input>
                <el-tooltip placement="top" v-if="data.type != 'string'">
                  <div slot="content">{{ rightToolTip }}</div>
                  <i class="el-icon-question selectTooltip" @mouseenter="showToolTip(node, data)"></i>
                </el-tooltip>
              </div>
              <div class="treeContentRight">
                <i class="el-icon-remove-outline drawer_i" @click.stop="delNodeData(node, data)"></i>
                <i class="el-icon-circle-plus-outline drawer_i" @click.stop="addNodeData(node, data)" v-if="data._show"></i>
              </div>
            </span>
            <!-- <span v-else class="notShowNode"></span> -->
          </span>
        </el-tree>
        <div class="addTopNode" @click="addTopNode">+添加</div>
      </div>
      <span class="demo-drawer__footer">
        <el-button class="drawerButton" @click="drawer = false">{{
          $t("message.common.cancel")
        }}</el-button>
        <el-button class="drawerButton" type="primary" @click="commit">确定</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import RouteConfigEdit from "./routeEdit.js";
export default RouteConfigEdit;
</script>

<style>
.routerConfig {
  height: calc(89vh - 50px);
  overflow-y: auto;
}
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
  padding: 20px;
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
.routerConfigBottom {
  bottom: 0px;
  position: fixed;
  display: flex;
  height: 50px;
  right: 50px;
}
</style>