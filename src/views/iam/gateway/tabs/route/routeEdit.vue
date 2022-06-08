<template>
  <div class="routerConfig">
    <div class="drawerTitle">
      <i class="el-icon-back" @click="back"></i>
      <div class="titleName">{{headName}}</div>
      <el-tooltip placement="top">
        <div slot="content">*********</div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>
    <div class="directions">
      <i class="el-icon-question"></i>
      <div>
        通过刷新功能，您可以删除DCDN节点上已经缓存的资源，并强制DCDN节点回源站获取最新资源，适用于源站资源更新和发布、违规资源清理、域名配置变更等；通过预热功能，您可以在业务高峰前预先将热门资源缓存到DCDN节点，降低源站压力提升用户体验。了解更多
      </div>
    </div>
    <el-card class="box-card">
      <div>
        <div>
          <div class="matchPredicate">
            <el-form :model="paramsForm" ref="rForm" :rules="paramsForm.paramsRules">
              <div class="matchPredicateTitle">匹配谓词</div>
              <el-table :data="matchPredicateData" style="width: 100%">
                <el-table-column label="">
                  <templat slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择类型" @change="queryName(scope.row,scope.$index)" @click.native="changePredicateOptions">
                      <el-option v-for="item in predicateOptions" :key="item.type" :label="item.label" :value="item.type">
                      </el-option>
                    </el-select>
                    <el-tooltip placement="top">
                      <div slot="content">{{ scope.row.help }}</div>
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </templat>
                </el-table-column>
                <el-table-column label="配置">
                  <template slot-scope="scope">
                    <el-form :model="scope.row.value" style="display:flex;align-items:center" :ref="`childFrom${scope.$index}`">
                      <el-form-item :prop="`value`" :rules="paramsRules[`${scope.$index }`]">
                        <el-input v-model="scope.row.value.value" :placeholder="scope.row.value.placeholder" />
                      </el-form-item>
                      <el-tooltip placement="top">
                        <div slot="content">{{ scope.row.help }}</div>
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </el-form>
                  </template>
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
            </el-form>
          </div>
          <div class="line"></div>
          <div class="filter">
            <div class="filterTitle">过滤器</div>
            <el-table :data="filterData" style="width: 100%">
              <el-table-column label="">
                <templat slot-scope="scope">
                  <el-select v-model="scope.row.type" placeholder="请选择类型" @click.native="getFilterOptions" @change="selectTopFilterType(scope.row)">
                    <el-option v-for="item in filterOptions" :key="item.type" :label="item.type" :value="item.type">
                    </el-option>
                  </el-select>
                  <el-tooltip placement="top">
                    <div slot="content">{{ scope.row.help }}</div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </templat>
              </el-table-column>
              <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                  <i class="el-icon-remove-outline drawer_i" @click="delFilter(scope.$index)" v-if="filterData.length > 1"></i>
                  <i class="el-icon-circle-plus-outline drawer_i_1" v-if="scope.$index == filterData.length- 1 && filterData.length < filterOptionsAll.length && !scope.row.type"></i>
                  <i class="el-icon-circle-plus-outline drawer_i" v-else-if="scope.$index == filterData.length - 1 && filterData.length < filterOptionsAll.length && scope.row.type" @click="addFilter"></i>
                  <i class="el-icon-circle-plus-outline drawer_i" v-else style="visibility:hidden"></i>
                  <a class="table_a drawer_a" :disabled='true' @click="editValue(scope.row)">配置</a>
                  <a class="table_a drawer_a" v-if="scope.row.type == 'ResponseCache'" @click="showEdit">策略</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="routerConfigBottom">
            <el-button class="drawerButton" type="primary" @click="commitAllData">提交</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <el-drawer :visible.sync="drawer" :direction="direction" class="drawer">
      <slot></slot>
      <div slot="title" class="drawerTitle">
        <div class="titleName">策略编辑</div>
      </div>
      <div class="drawer_content">
        <el-tree :data="filterTreeData" :props="defaultProps" node-key="index" class="dialogTree">
          <span class="custom-tree-node span_item" slot-scope="{ node, data }">
            <span class="treeContent">
              <div class="treeContentLeft">
                <!-- key -->
                <el-select v-model="data.name" placeholder="请选择类型" @click.native="handleFilterKeyOptions(node, data)" @change="selectFilterName($event, data)" :name="`fristSelect${node.level}`" :class="`fristSelect${node.level}`" :key="`fristSelect${node.id}`">
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

                <el-select v-model="data.defaultValue" multiple collapse-tags="" placeholder="请选择" v-if="data.multi == 'true'" class="treeItem" @click.native="handleFilterValueOptions(node, data)" @change="selectTrigger($event,data)">
                  <el-option v-for="item in selectFilterValueOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <el-input :id="`secondGroup${node.level}`" v-else-if="data.type == 'object'" style="visibility:hidden" class="treeItem"></el-input>
                <!-- 单选 -->
                <el-select v-model="data.value" v-else-if="
                      data.type && data.type != 'string' && data.type != 'int'
                    " @click.native="handleFilterValueOptions(node, data)" class="treeItem">
                  <el-option v-for="item in selectFilterValueOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 输入框 -->
                <el-input :id="`secondGroup${node.level}`" v-else v-model="data.value" @change="changeFilterValue(data)" :placeholder="data.help" class="treeItem"></el-input>
                <!-- 提示 -->
                <el-tooltip placement="top" :style="{visibility: data.type == 'string' || data.type == 'object' ?'hidden':'none'}">
                  <div slot="content">{{ rightToolTip }}</div>
                  <i class="el-icon-question selectTooltip" @mouseenter="showToolTip(node, data)"></i>
                </el-tooltip>

              </div>
              <div class="treeContentRight">
                <!-- <i class="el-icon-remove-outline drawer_i" tit @click.stop="delNodeData(node, data)"></i>
                <i class="el-icon-circle-plus-outline drawer_i" @click.stop="addNodeData(node, data)" v-if="data._show"></i> -->
                <el-tooltip placement="left">
                  <div slot="content">删除该节点</div>
                  <i class="el-icon-remove-outline drawer_i" @click.stop="delNodeData(node, data)"></i>
                </el-tooltip>
                <el-tooltip placement="right">
                  <div slot="content">新增子节点</div>
                  <i class="el-icon-circle-plus-outline drawer_i" @click.stop="addNodeData(node, data)" v-if="data._show && data.name"></i>
                </el-tooltip>
              </div>
            </span>
            <!-- <span v-else class="notShowNode"></span> -->
          </span>
        </el-tree>
        <div class="addTopNode" @click="addTopNode" v-if="filterTreeData.length ==0 || dialogFilterOptions.length > 0">+添加</div>
      </div>
    </el-drawer>
    <el-drawer :visible.sync="editVisible" class="drawer" :before-close="handleClose">
      <slot></slot>
      <div slot="title" class="drawerTitle">
        <div class="titleName">编辑</div>
      </div>
      <div class="drawer_content">
        <ResponseCacheEdit :responseCacheTreeData.sync="responseCacheTreeData" ref="responseCache" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import RouteConfigEdit from "./routeEdit.js";
export default RouteConfigEdit;
</script>

<style scoped>
.routerConfig {
  margin: 18px 49px 18px 20px;
  overflow-y: auto;
}
.Back {
  font-size: 16px;
  cursor: pointer;
  padding: 5px 0;
}
.Back i {
  font-size: 16px;
}
.drawer .el-drawer.rtl {
  width: 43% !important;
  color: black !important;
}
.drawerTitle {
  display: flex;
  align-items: center;
}
.drawerTitle i {
  font-size: 24px;
  padding-right: 4px;
  cursor: pointer;
}
.titleName {
  font-size: 20px;
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
  height: 34px;
}
i.el-tooltip.el-icon-question {
  padding-right: 22px;
  padding-left: 3px;
}
.routerConfigBottom {
  padding: 20px 0;
  float: right;
}
.line {
  width: 100%;
  height: 2px;
  background: rgb(224, 224, 224);
  margin: 40px 0;
}
.directions {
  margin: 0 0 18px;
  background: #e2f2ff;
  padding: 18px 10px;
  display: flex;
}
.directions i {
  padding-right: 10px;
}
.addTopNode {
  /* border: 2px dashed #dcdfe6; */
  text-align: center;
  width: 13vw;
  height: 28px;
  line-height: 28px;
  /* margin: 3% 7vw; */
  margin: 3% 0 3% calc(18vw + 68px);
  /* margin-left: calc(18vw + 68px); */
  cursor: pointer;
  border-radius: 4px;
  background: #00c1de;
  color: #fff;
}
.drawer_a {
  padding-left: 5px;
}
.el-form-item.el-form-item--mini {
  margin: 0 !important;
}
.el-form-item.is-error.el-form-item--mini {
  margin: 0 !important;
  padding-bottom: 18px !important;
}
header#el-drawer__title {
  margin-bottom: 0px !important;
}
</style>