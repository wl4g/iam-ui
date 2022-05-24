import { getAllEditData, getFilterOptions } from "../../cluster/mock"

function deleteNode(data) {
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

/**
 * 格式化返回的json，确保tree json一定有childrens字段
 * @param {data} tree json
 **/
function formatNode(data) {
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
  // value1是请求数据 ，value2是模板数据
  //比对树形数组，并判断是否显示加号:_show
  if (value1 != null && value2 != null) {
    value1.forEach(item1 => {
      let newArr3 = value2.filter(item3 => item3.name == item1.name)
      let newArr2 = value2.filter(
        item2 => item2.name == item1.name && item2.childrens.length > 0
      )
      item1._show = newArr2.length > 0 ? true : false

      if (newArr3.length > 0) {
        console.info(newArr3)
        item1.type = newArr3[0].type
        item1.value = item1.value ? item1.value : newArr3[0].defaultValue
      }
      if (item1.childrens.length > 0) {
        mergeTrees(item1.childrens, newArr2[0].childrens)
      }
    })
  }
  return value1
}

function filterChildTreeData(data, name) {
  let res = []
  let returnedItem //定义一个不不赋值的变量
  let find = function (arr, name) {
    arr.forEach(item => {
      //利用foreach循环遍历
      if (item.name == name) {
        //判断递归结束条件
        returnedItem = item
        return item
      } else if (item.childrens.length > 0) {
        //判断chlidrens是否有数据
        find(item.childrens, name) //递归调用
      }
    })
  }
  let item = find(data, name)
  res.push(...returnedItem.childrens)
  return res
}

function filterValueoptions(templateFiltersList, parent, val) {
  let res = []
  let returnedItem //定义一个不不赋值的变量
  let find = function (templateFiltersList, val) {
    templateFiltersList.forEach(item => {
      //利用foreach循环遍历
      if (item.name == val) {
        returnedItem = item
        return item
      } else if (item.childrens.length > 0) {
        find(item.childrens, val) //递归调用
      }
    })
  }
  let item = find(templateFiltersList, val)
  res.push(...returnedItem.options)
  return res
}

function formatOutputNode(data) {
  data.forEach(item => {
    delete item._show
    delete item.type
    if (item.childrens.length > 0) {
      formatNode(item.childrens)
    }
  })
  return data
}

//循环对应的id，以便修改对应的样式
function filterDom(type, condition) {
  let newArr = []
  let _docc = window.document.all
  // 遍历每一个对象
  for (let i = 0; i < _docc.length; i++) {
    let _dc = _docc[i]
    // 当前标签的id的值
    let id = _dc.getAttribute(type)
    if (id) {
      newArr.push(id)
    }
  }
  let res = newArr.filter(item => item.search(condition) == 0)

  return Array.from(new Set(res))
}

export default {
  name: "RouteConfigEdit",
  data() {
    return {
      headName: "",
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
      type: "",
      dialogFilterOptions: [],
      selectFilterValueOptions: [],
      rightToolTip: "",
      templateList: {},
    }
  },
  /**
   * 监听路由进入
   **/
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.pageType == "instance") {
        vm.headName = "实例"
      } else {
        vm.headName = "路由转发策略"
      }
    })
  },
  mounted() {
    this.getAllEditData = getAllEditData().gateway_routes_schema
    this.matchPredicateData = this.getAllEditData.predicates
    this.templateList =
      require("../../../../../../static/config/gateway/router-schema.json").data.gateway_routes_schema
    this.templateFiltersList = this.templateList.filters
    this.predicateOptions = this.templateList.predicates
    this.changePredicateOptions()
    this.filterData = this.getAllEditData.filters
    this.filterOptionsAll = getFilterOptions()
    this.getFilterOptions()
    this.templateFiltersList.forEach(item => {
      if (item.args) {
        formatNode(item.args)
      }
    })
  },

  methods: {
    // test() {
    //   fetch("../../../../../../static/config/gateway/router-schema.json")
    //     .then(res => res.json())
    //     .then(data => {
    //       this.templateList = data.data.gateway_routes_schema
    //     })
    // },
    init() {
      this.$nextTick(() => {
        let newArr = filterDom("id", "fristSelect")
        for (let i = 0; i < newArr.length; i++) {
          $(`.${newArr[i]}`).attr("style", `width:${200 - i * 18 + "px"}`)
          $(`#${newArr[i]}`).attr("style", `width:${200 - i * 18 + "px"}`)
        }
      })
    },
    handleNodeClick(data, obj, node) {
      this.init()
    },
    back() {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:securityGatewaydetail"
        ),
        query: {
          id: this.$route.query.id,
          activeName: this.$route.query.pageType,
        },
      })
    },
    delMatchPredicate(val) {
      this.matchPredicateData.splice(val, 1)
    },
    addMatchPredicate() {
      this.matchPredicateData.push({
        type: "",
        value: "",
        placeholder: "",
      })
    },
    getFilterOptions() {
      let res1 = []
      this.templateFiltersList.forEach(item => {
        let newArr = this.filterData.filter(
          item1 => item1.type == item.type && item.repeat == "false"
        )
        if (newArr.length == 0) {
          res1.push({
            type: item.type,
          })
        }
      })
      this.filterOptions = res1
    },
    selectTopFilterType(val) {
      val.args = []
    },
    changePredicateOptions() {
      let newData = []
      this.predicateOptions.forEach(item => {
        let newArr = this.matchPredicateData.filter(
          item1 => item1.type == item.type && item.repeat == "false"
        )
        if (newArr.length == 0) {
          newData.push({
            ...item,
          })
        }
      })
      this.predicateOptions = newData
    },
    queryName(row) {
      row.value = ""
      let newData = this.predicateOptionsAll.filter(
        item => item.type == row.type
      )
      row.placeholder = newData[0].placeholder
    },
    delFilter(val) {
      this.filterData.splice(val, 1)
    },
    addFilter() {
      this.filterData.push({
        type: "",
        args: [],
      })
    },
    editValue(val) {
      this.drawer = true
      this.type = val.type
      this.filterTreeData = formatNode(val.args)
      this.handleTreeData(this.filterTreeData)
    },
    handleTreeData(val) {
      let res = this.templateFiltersList.filter(
        item => item.type == this.type
      )[0].args
      this.filterTreeData = mergeTrees(val, res)
      this.$nextTick(() => {
        this.init()
      })
      console.info(this.filterTreeData)
    },
    handleFilterKeyOptions(node, data) {
      let res = this.templateFiltersList.filter(
        item => item.type == this.type
      )[0].args
      if (node.level == 1) {
        let res1 = []
        res.forEach(item => {
          let newArr = this.filterTreeData.filter(
            item1 => item1.name == item.name && item.repeat == "false"
          )
          if (newArr.length == 0) {
            res1.push({
              ...item,
            })
          }
        })
        this.dialogFilterOptions = res1
      } else {
        let newArr1 = filterChildTreeData(res, node.parent.data.name)
        let newArr2 = filterChildTreeData(
          this.filterTreeData,
          node.parent.data.name
        )
        let finallArr = []
        newArr1.forEach(item => {
          let newArr = newArr2.filter(
            item1 => item1.name == item.name && item.repeat == "false"
          )
          if (newArr.length == 0) {
            finallArr.push({
              ...item,
            })
          }
        })
        this.dialogFilterOptions = finallArr
      }
    },
    handleFilterValueOptions(node, data) {
      let res = this.templateFiltersList.filter(
        item => item.type == this.type
      )[0].args
      if (node.level == 1) {
        this.selectFilterValueOptions = filterValueoptions(
          res,
          this.type,
          data.name
        )
      } else {
        this.selectFilterValueOptions = filterValueoptions(
          res,
          node.parent.data.name,
          data.name
        )
      }
    },
    selectFilterName(val, data) {
      console.info(data)
      let newObj = this.dialogFilterOptions.filter(item => item.name == val)[0]
      console.info(newObj)
      data.type = newObj.type
      data.help = newObj.help
      data.defaultValue = newObj.defaultValue
      data.value = newObj.defaultValue
      data.options = newObj.options
      data.childrens = []
      console.info(data)
      this.$set(data, { ...data })
      let res = this.templateFiltersList.filter(
        item => item.type == this.type
      )[0].args
      this.filterTreeData = mergeTrees(this.filterTreeData, res)
      this.init()
    },
    showToolTip(node, data) {
      if (data.defaultValue) {
        this.handleFilterValueOptions(node, data)
        this.rightToolTip = this.selectFilterValueOptions.filter(
          item => item.name == data.defaultValue
        )[0].help
      } else {
        this.rightToolTip = ""
      }
    },
    delNodeData(node, data) {
      data.checked = true
      this.filterTreeData = deleteNode(this.filterTreeData)
      this.$set(this.filterTreeData, this.filterTreeData)
      console.info(this.filterTreeData)
    },
    addNodeData(node, data) {
      let newObj = {
        name: "",
        type: "",
        defaultValue: null,
        options: [],
        help: "",
        _show: false,
      }
      if (!data.childrens) this.$set(data, "childrens", [])
      data.childrens.push(newObj)
      this.$set(data, [...data])
      this.init()
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
      this.init()
    },
    changeValue(val) {
      console.info(val)
    },
    commit() {
      this.drawer = false
      this.filterTreeData = formatOutputNode(this.filterTreeData)
    },
    commitAllData() {
      console.info(this.getAllEditData)
      fetch("http://httpbin.org/post", {
        method: "post",
        body: JSON.stringify({
          ...this.getAllEditData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          // return data.text();
          return data
        })
        .then(function (data) {
          console.log(data)
        })
      // fetch("../../../../../../../static/config/gateway/router-schema.json")
      //   .then(res => res.json())
      //   .then(data => console.log(data))
    },
  },
}
