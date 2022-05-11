<template>
  <div>
    <div>
      <el-table :data="tableData" :border="true" style="width:100%">
        <el-table-column label="路由ID">
          <templat slot-scope="scope">
            <div class="name">
              <a>{{scope.row.Name}}</a>
            </div>
          </templat>
        </el-table-column>
        <el-table-column prop="Name1" label="上游URL" width="100"></el-table-column>
        <el-table-column prop="Name2" label="匹配谓词" width=120></el-table-column>
        <el-table-column label="启用">
          <templat slot-scope="scope">
            <div class="name">
              <slider-switch :isChecked.sync="scope.row.isChecked" @change="notify(scope.row,scope.$index)"></slider-switch>
            </div>
          </templat>
        </el-table-column>
        <el-table-column :label="$t('message.common.operation')" min-width="100">
          <template slot-scope="scope">
            <el-button type="danger" icon='delete' @click="editData(scope.row)">修改策略</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange'></el-pagination>
    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose" class="drawer">
      <slot></slot>
      <div slot="title" class="drawerTitle">
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
            <!-- <el-table-column prop="Name1" label="值" width="100"></el-table-column> -->
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
    </el-drawer>
    <el-dialog :visible.sync="dialogVisible" title="值编辑" class="code">
      <div>
        <el-tree :data="filterTreeData" :props="defaultProps" @node-click="handleNodeClick" node-key="index" class="dialogTree">
          <span class="custom-tree-node span_item" slot-scope="{ node, data }">
            <span class="treeContent">
              <div class="treeContentLeft">
                <!-- key -->
                <el-select v-model="data.name" placeholder="请选择类型" @click.native="changeFilterNameOptions(node,data)" @change="selectFilterName($event,data)">
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
                  <el-option v-for="item in selectFilterValueOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 单选 -->
                <el-select v-model="data.defaultValue" v-else-if="data.type && data.type != 'string'" @click.native="changeFilterValueOptions(data)">
                  <el-option v-for="item in selectFilterValueOptions" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
                <!-- 输入框 -->
                <el-input style="width: 51%;" v-else v-model="data.defaultValue" @change="changeValue(scope.row)" :placeholder='data.help'></el-input>
                <el-tooltip placement="top">
                  <div slot="content">{{rightToolTip}}</div>
                  <i class="el-icon-question selectTooltip" @mouseenter="showToolTip(data)"></i>
                </el-tooltip>
              </div>
              <div class="treeContentRight">
                <i class="el-icon-remove-outline drawer_i" @click.stop="delNodeData(node,data)"></i>
                <i class="el-icon-circle-plus-outline  drawer_i" @click.stop="addNodeData(node,data)"></i>
              </div>
            </span>
          </span>
        </el-tree>
        <div class="addTopNode" @click="addTopNode">+添加</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确定</el-button>
        <el-button @click="dialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRouteConfigTableData, getMatchPredicateData, getPredicateOptions, getFilterData, getFilterOptions, getFilterTreeData, getSelectNameOptions, getChildrenSelectNameOptions, filterValueoptions } from "../../cluster/mock.js"

function deleteNode (data) { //根据checked，删除对应的树节点
  data.forEach((item, index) => {
    if (item.checked) {
      data.splice(index, 1)
    }
    if (item.childrens.length > 0) {
      deleteNode(item.childrens)
    }
  })
  return data
}
function formatNode (data) { //格式化代码
  data.forEach(item => {
    if (!item.childrens) {
      item.childrens = []
      item.childrens.push()
    }
    if (item.childrens.length > 0) {
      formatNode(item.childrens)
    }
  })
  return data
}
export default {
  name: "routeConfig",
  data () {
    return {
      tableData: [],
      drawer: false,
      direction: 'rtl',
      matchPredicateData: [],
      predicateOptionsAll: [],
      predicateOptions: [],
      filterData: [],
      filterOptionsAll: [],
      filterOptions: [],
      dialogVisible: false,
      activeName: '1',
      filterTreeData: [],
      defaultProps: {
        children: 'childrens',
        label: 'name',
      },
      filterType: '',
      dialogFilterOptions: [],
      selectFilterValueOptions: [],
      rightToolTip: '',
    }
  },
  mounted () {
    this.tableData = getRouteConfigTableData()
    this.matchPredicateData = getMatchPredicateData()
    this.predicateOptionsAll = getPredicateOptions()
    this.predicateOptions = getPredicateOptions()
    this.filterData = getFilterData()
    this.filterOptionsAll = getFilterOptions()
    this.filterOptions = getFilterOptions()
    this.filterTreeData = formatNode(getFilterTreeData())
  },
  computed: {
  },
  methods: {
    getSelectNameOptions () {
      this.dialogFilterOptions = getSelectNameOptions(this.filterType)
    },
    editData () {
      // this.drawer = true
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:routeConfigEdit"
        ),
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    notify (row, index) {
      console.info('11111', row, index)
    },
    changeValue (val) {
      console.info(val)
    },
    delMatchPredicate (val) {
      this.matchPredicateData.splice(val, 1)
    },
    addMatchPredicate () {
      this.matchPredicateData.push({ predicateType: "", value: "" })
    },
    changePredicateOptions () {
      let newData = this.predicateOptionsAll
      this.matchPredicateData.forEach(item => {
        newData = newData.filter((item1) => item1.predicateType != item.predicateType)
      })
      this.predicateOptions = newData
    },
    queryName (row) {
      row.value = ""
      let newData = this.predicateOptionsAll.filter(item => item.predicateType == row.predicateType)
      row.placeholder = newData[0].placeholder
    },
    delFilter (val) {
      this.filterData.splice(val, 1)
    },
    addFilter () {
      this.filterData.push({ filterType: "", value: "" })
    },
    changeFilterOptions () {
      let newData = this.filterOptionsAll
      this.filterData.forEach(item => {
        newData = newData.filter((item1) => item1.filterType != item.filterType)
      })
      this.filterOptions = newData
    },
    showValue (val) {
      this.dialogVisible = true
      this.filterType = val
      console.info('11111type', this.filterType)
      this.getSelectNameOptions()
    },
    delNodeData (node, data) {
      data.checked = true
      this.filterTreeData = deleteNode(this.filterTreeData)
    },
    addNodeData (node, data) {
      let newObj = {
        "name": "",
        "type": "",
        "defaultValue": null,
        "options": [],
        "help": ""
      }
      if (!data.childrens) this.$set(data, "childrens", []);
      data.childrens.push(newObj);
    },
    addTopNode () {
      let newObj = {
        "name": "",
        "type": "",
        "defaultValue": null,
        "options": [],
        "help": ""
      }
      this.filterTreeData.push(newObj)
    },
    changeFilterValueOptions (data) {
      if (node.level == 1) { }
      this.selectFilterValueOptions = filterValueoptions(this.filterType, data.name)
      console.info('11111val', data, this.selectFilterValueOptions)
    },
    selectFilterName (val, data) {
      data.type = this.dialogFilterOptions.filter(item => item.name == val)[0].type
      data.help = this.dialogFilterOptions.filter(item => item.name == val)[0].help
      data.defaultValue = null
    },
    showToolTip (data) {
      let selectOptions = filterValueoptions(this.filterType, data.name)
      if (data.defaultValue && data.defaultValue) {
        this.rightToolTip = selectOptions.filter(item => item.name == data.defaultValue)[0].help
      }
    },
    changeFilterNameOptions (node, data) {
      console.info('11111', node, data)
      if (node.level == 1) {
        this.dialogFilterOptions = getSelectNameOptions(this.filterType)
      } else {
        this.dialogFilterOptions = getChildrenSelectNameOptions(this.filterType, node.parent.data.name, data.name)
      }
    }
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
  padding-bottom: 17px;
}
.filterTitle {
  font-size: 17px;
  padding: 17px 0;
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
.addTopNode {
  border: 1px dashed #dcdfe6;
  text-align: center;
  width: 50%;
  height: 28px;
  line-height: 28px;
  margin: 3% auto;
  cursor: pointer;
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
</style>