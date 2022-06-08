<template>
  <div>
    <div class="directions">
      <i class="el-icon-question"></i>
      <div>
        清理path的cache
      </div>
    </div>
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
          <li class="menu-item" @click="singleClear">
            清理
          </li>
        </ul>
      </div>
      <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="是否删除勾选的path？" @confirm="batchDel">
        <el-button type="success" slot="reference" class="addTree" :disabled="delAndClear">批量删除</el-button>
      </el-popconfirm>
      <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="是否清理勾选的path？" @confirm="batchclear">
        <el-button type="success" slot="reference" class="addTree" :disabled="delAndClear">批量清理</el-button>
      </el-popconfirm>
      <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" ref="tree" class="tree-line" :indent="0" show-checkbox highlight-current @node-click="nodeClick" @node-contextmenu="rightClick" @check-change="handleCheckChange" default-expand-all>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <!-- 非叶子编辑情况 -->
            <span v-if="node.id != currentNodeId ">
              {{ node.label }}
            </span>
            <!-- 编辑情况 -->
            <span v-else>
              <el-input style="width: 120px;height:28px" size="mini" ref="inputVal" :value="data.path" @input="(value) => changeNodeRoute(value, data)" @blur="blurSave()" @keyup.enter.native="onEnter">
              </el-input>
            </span>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
function deleteNode (data) {
  //根据checked，删除对应的树节点
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

function flattenedArray (params = [], result = [], key = '') { //扁平化数组
  if (Array.isArray(params) && params.length) {
    params.forEach(item => {
      // 每次开启新的一轮循环，拷贝一份副本（key），因为副本会用于当前轮的其它兄弟，所以你不能改变副本（即不能改变key的值）
      let currentkey = key
      currentkey += item.path
      if (item.childrens.length > 0) {
        flattenedArray(item.childrens, result, currentkey)
      } else if (item.childrens.length == 0 && item.checked) {
        result.push(currentkey)
      }
    })
  }
}

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
      treeData: [],
      delAndClear: true,
      defaultChecked: []
    }
  },
  props: ['responseCacheTreeData'],
  computed: {
  },
  mounted () {
    let newTerryArr = [{ path: '/', childrens: [] }]
    newTerryArr[0].childrens.push(...this.responseCacheTreeData)
    this.treeData = newTerryArr
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
    onEnter () {
      this.currentNodeId = ""
    },
    batchDel () {
      this.$refs.tree.getCheckedNodes().forEach(item => {
        item.checked = true
      })
      this.treeData = deleteNode(this.treeData)
      this.$nextTick(() => {
        this.delAndClear = this.$refs.tree.getCheckedNodes().length > 0 ? false : true
      })
    },
    batchclear () {
      this.$refs.tree.getCheckedNodes().forEach(item => {
        item.checked = true
      })
      let result = []
      flattenedArray(this.treeData[0].childrens, result)
      console.info(result)
      this.postClear(result)
      // this.$nextTick(() => {
      //   this.$refs.tree.setCheckedNodes([]);
      // });
    },
    postClear (data) {
      fetch("http://httpbin.org/post", {
        method: "post",
        body: JSON.stringify({
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          return data
        })
        .then(function (data) {
          console.log(data)
        })
    },
    handleCheckChange (data, checked, indeterminate) {
      this.delAndClear = this.$refs.tree.getCheckedNodes().length > 0 ? false : true
      data.checked = checked
    },
    rightClick (event, data, node, obj) {
      this.showRightMenu = false
      this.showRightMenu = true
      let menu = document.querySelector('#menu')
      menu.style.left = `calc(${event.screenX + 'px'} - 53vw)`
      menu.style.top = event.screenY - 100 + 'px'
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
    addTreeNode () {
      this.nodeDetail.data.childrens.unshift({
        path: "",
        childrens: []
      })
      this.$nextTick(() => {
        this.currentNodeId = this.nodeDetail.childNodes[0].id
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
    singleClear () {

    },
    synchronousData () { // 同步父组件的 responseCacheTreeData
      this.$emit('update:responseCacheTreeData', this.treeData)
    }
  }
}
</script>

<style  lang="less">
.dev-type-main-left {
  overflow: auto;
  padding: 10px;
  .right-menu {
    z-index: 99;
    position: absolute;
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
.tree-line {
  .el-tree-node {
    position: relative;
    padding-left: 16px; // 缩进量
  }
  .el-tree-node__children {
    padding-left: 16px; // 缩进量
  }

  // 竖线
  .el-tree-node::before {
    content: "";
    height: 100%;
    width: 1px;
    position: absolute;
    left: -3px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #c0c4cc;
  }
  // 当前层最后一个节点的竖线高度固定
  .el-tree-node:last-child::before {
    height: 38px; // 可以自己调节到合适数值
  }

  // 横线
  .el-tree-node::after {
    content: "";
    width: 24px;
    height: 20px;
    position: absolute;
    left: -3px;
    top: 12px;
    border-width: 1px;
    border-top: 1px dashed #c0c4cc;
  }

  // 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
  & > .el-tree-node::after {
    border-top: none;
  }
  & > .el-tree-node::before {
    border-left: none;
  }

  // 展开关闭的icon
  .el-tree-node__expand-icon {
    font-size: 16px;
    // 叶子节点（无子节点）
    &.is-leaf {
      color: transparent;
      font-size: 0px;
    }
  }
}
</style>