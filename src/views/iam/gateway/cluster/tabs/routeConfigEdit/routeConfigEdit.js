import {
  getRouteConfigTableData,
  getMatchPredicateData,
  getPredicateOptions,
  getFilterData,
  getFilterOptions,
  getFilterTreeData,
  getSelectNameOptions,
  getChildrenSelectNameOptions,
  filterValueoptions,
} from "./../../mock.js"

function deleteNode(data) {
  //根据checked，删除对应的树节点
  data.forEach((item, index) => {
    if (item.checked) {
      // data.splice(index, 1)
      item._show = false
    }
    if (item.childrens.length > 0) {
      deleteNode(item.childrens)
    }
  })
  return data
}
function formatNode(data) {
  //格式化代码
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

function mergeTrees(value1, value2) {
  //合并树形数组，并判断是否显示:_show
  if (value1 != null && value2 != null) {
    value2.forEach(item2 => {
      item2._show =
        value1.filter(item1 => item1.name == item2.name).length > 0
          ? true
          : false
      // item2.value = value1.filter(item1 => item1.name == item2.name)[0].value
      value1.forEach(item1 => {
        if (item1.childrens.length > 0) {
          mergeTrees(item1.childrens, item2.childrens)
        }
      })
    })
  }

  return value2
}

export default {
  name: "RouteConfigEdit",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      matchPredicateData: [],
      predicateOptionsAll: [],
      predicateOptions: [],
      filterData: [],
      filterOptionsAll: [],
      filterOptions: [],
      activeName: "1",
      filterTreeData: [],
      defaultProps: {
        children: "childrens",
        label: "name",
      },
      filterType: "",
      dialogFilterOptions: [],
      selectFilterValueOptions: [],
      rightToolTip: "",
      templateList: {},
    }
  },
  mounted() {
    this.matchPredicateData = getMatchPredicateData()
    this.predicateOptionsAll = getPredicateOptions()
    this.predicateOptions = getPredicateOptions()
    this.templateFiltersList =
      require("../../../../../../../static/config/gateway/router-schema.json.json").data.gateway_routes_schema.filters
    this.filterData = getFilterData()
    this.filterOptionsAll = getFilterOptions()
    this.filterOptions = getFilterOptions()
    // this.filterTreeData = formatNode(getFilterTreeData())
    this.templateFiltersList.forEach(item => {
      if (item.args) {
        formatNode(item.args)
      }
    })
  },
  methods: {
    delMatchPredicate(val) {
      this.matchPredicateData.splice(val, 1)
    },
    addMatchPredicate() {
      this.matchPredicateData.push({ predicateType: "", value: "" })
    },
    changePredicateOptions() {
      let newData = this.predicateOptionsAll
      this.matchPredicateData.forEach(item => {
        newData = newData.filter(
          item1 => item1.predicateType != item.predicateType
        )
      })
      this.predicateOptions = newData
    },
    queryName(row) {
      row.value = ""
      let newData = this.predicateOptionsAll.filter(
        item => item.predicateType == row.predicateType
      )
      row.placeholder = newData[0].placeholder
    },
    delFilter(val) {
      this.filterData.splice(val, 1)
    },
    addFilter() {
      this.filterData.push({ filterType: "", value: "" })
    },
    showValue(val) {
      this.drawer = true
      this.filterType = val
      this.filterTreeData = formatNode(getFilterTreeData())
      this.getSelectNameOptions(this.filterTreeData)
    },
    getSelectNameOptions(val) {
      let res = this.templateFiltersList.filter(
        item => item.type == this.filterType
      )[0].args
      console.info("11111", res)
      let res1 = []
      res.forEach(item => {
        res1.push({ ...item })
      })
      this.dialogFilterOptions = res1
      this.filterTreeData = mergeTrees(val, res)
      this.operateDom()
      console.info("11111filterTreeData", this.filterTreeData)
    },
    operateDom() {
      this.$nextTick(() => {
        let dom = document.querySelectorAll(".notShowNode")
        dom.forEach((item, i) => {
          item.parentNode.parentNode.style.display = "none"
        })
      })
    },
    selectFilterName(val, data) {
      let newObj = this.dialogFilterOptions.filter(item => item.name == val)[0]
      data.type = newObj.type
      data.help = newObj.help
      data.defaultValue = newObj.defaultValue
      data.options = newObj.options
    },
    delNodeData(node, data) {
      data.checked = true
      this.filterTreeData = deleteNode(this.filterTreeData)
    },
    addNodeData(node, data) {
      let newObj = {
        name: "",
        type: "",
        defaultValue: null,
        options: [],
        help: "",
        _show: true,
      }
      if (!data.childrens) this.$set(data, "childrens", [])
      data.childrens.push(newObj)
    },
    addTopNode() {
      let newObj = {
        name: "",
        type: "",
        defaultValue: null,
        options: [],
        help: "",
        _show: true,
        childrens: [],
      }
      this.filterTreeData.push(newObj)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
  },
}
