<template>
  <div>
    <div class="dev-type-main-left">
      <!--鼠标右键菜单栏 -->
      <div v-show="showRightMenu">
        <ul id="menu" class="right-menu">
          <li class="menu-item" @click="addTreeNode">
            添加子路径
          </li>
          <li class="menu-item" @click="editTreeNode">
            重命名
          </li>
          <li class="menu-item" @click="delTreeNode">
            删除
          </li>
        </ul>
      </div>
      <el-button type="success" class="addTree" @click="addTree">+ 新增</el-button>
      <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" ref="tree" show-checkbox highlight-current @node-click="nodeClick" @node-contextmenu="rightClick" @check-change="handleCheckChange" default-expand-all>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <!-- 非叶子编辑情况 -->
            <span v-if="node.id != currentNodeId ">
              {{ node.label }}
            </span>
            <!-- 编辑情况 -->
            <span v-else>
              <el-input style="width: 120px;height:28px" size="mini" ref="inputVal" :value="data.path" @input="(value) => changeNodeRoute(value, data)" @blur="blurSave()">
              </el-input>
            </span>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showRightMenu: false,
      defaultProps: {
        children: "childrens",
        label: "path",
      },
      currentNodeId: "",
      nodeDetail: {},
      treeData: []
    }
  },
  props: ['responseCacheTreeData'],
  mounted () {
    this.treeData = this.responseCacheTreeData
  },
  methods: {
    nodeClick (data) {
      let currentCli = document.getElementById("menu");
      if (currentCli) {
        if (!currentCli.contains(event.target)) { //点击到了id为option-button-group以外的区域，就隐藏菜单
          this.showRightMenu = false;
        }
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      data.checked = checked
      console.info(this.treeData)
    },
    rightClick (event, data, node, obj) {
      this.showRightMenu = false // 
      this.showRightMenu = true
      let menu = document.querySelector('#menu')
      menu.style.left = event.clientX - 650 + 'px'
      menu.style.top = event.clientY - 5 + 'px'
      // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
      document.addEventListener('click', this.closeRightMenu)
      this.nodeDetail = { ...node }
    },
    closeRightMenu () {
      this.showRightMenu = false
      this.nodeDetail = {}
      // 关掉鼠标监听事件
      document.removeEventListener('click', this.closeRightMenu)
    },
    addTree () {
      this.treeData.push({
        path: "",
        childrens: []
      })
    },
    addTreeNode () {
      this.nodeDetail.data.childrens.push({
        path: "",
        childrens: []
      })
    },
    editTreeNode () {
      let that = this
      that.currentNodeId = that.nodeDetail.id;
    },
    blurSave () {
      this.currentNodeId = ""
    },
    changeNodeRoute (value, data) {
      data.path = value;
    },
    delTreeNode () {
      this.nodeDetail.data.id = this.nodeDetail.id
      const parent = this.nodeDetail.parent;
      const children = parent.data.childrens || parent.data;
      const index = children.findIndex(d => d.id && d.id === this.nodeDetail.id);
      children.splice(index, 1);
    },
    synchronousData () { // 同步父组件的 responseCacheTreeData
      this.$emit('update:responseCacheTreeData', this.treeData)
    }
  }
}
</script>

<style scoped lang="less">
.dev-type-main-left {
  overflow: auto;
  padding: 10px;
  .right-menu {
    z-index: 99;
    position: absolute;
    height: 100px;
    width: 100px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .menu-item {
      line-height: 33px;
      text-align: left;
      padding-left: 6px;
      height: 33px;
      font-size: 14px;
      color: #606266;
      list-style: none;
      cursor: pointer;
    }
    li:hover {
      background-color: #edf6ff;
      color: #606266;
    }
  }
  input.el-input__inner {
    height: 23px !important;
  }
  .addTree {
    margin-left: 10px;
  }
}
</style>