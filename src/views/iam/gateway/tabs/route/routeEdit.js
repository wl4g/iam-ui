import { getAllEditData, getFilterOptions } from "../../cluster/mock"
import ResponseCacheEdit from "./strategyModules/responseCacheEdit.vue"

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
        item1.type = newArr3[0].type
        item1.multi = newArr3[0].multi
        item1.value = item1.value ? item1.value : newArr3[0].defaultValue
        item1.defaultValue = item1.value ? item1.value : newArr3[0].defaultValue
      }
      if (item1.childrens.length > 0) {
        mergeTrees(item1.childrens, newArr2[0].childrens)
      }
    })
  }
  return value1
}

function mergeParentList(value1, value2, language) {
  value1.forEach(item1 => {
    let newArr3 = value2.filter(item3 => item3.type == item1.type)
    if (newArr3.length > 0) {
      item1.help =
        language == "zh_CN" ? newArr3[0].help.zh_CN : newArr3[0].help.en_US
      let newObj = { ...newArr3[0].value, value: item1.value }
      item1.value = newObj
    }
  })
  return value1
}
/**
 *
 * @param {data} 需要校验规则的数组
 * @returns
 */
function addRule(data) {
  let ruleobj = []
  data.forEach((item, index) => {
    let newArr = []
    if (item.type) {
      newArr.push({
        // message: `规则value${index + 1}`,
        message: item.value.message.zh_CN || "",
        trigger: "blur",
        pattern: eval(item.value.regex) || null,
      })
    } else {
      newArr.push({
        message: "",
        trigger: "blur",
        pattern: null,
      })
    }
    ruleobj.push(newArr)
  })
  return ruleobj
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
    delete item.multi
    delete item.help
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
  components: { ResponseCacheEdit },
  data() {
    return {
      headName: "",
      drawer: false,
      direction: "rtl",
      matchPredicateData: [],
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
      paramsForm: {
        matchPredicateData: [],
      },
      paramsRules: [],
      editVisible: false,
      responseCacheTreeData: [],
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
    this.getRouterSchema()
  },

  methods: {
    getRouterSchema() {
      fetch("../../../../../../static/config/gateway/router-schema.json")
        .then(res => res.json())
        .then(data => {
          this.templateList = data.data.gateway_routes_schema
          this.responseCacheTreeData = this.getAllEditData.filters.filter(
            item => item.type == "ResponseCache"
          )[0].strategy.ResponseCacheCleaner.paths
          this.matchPredicateData = mergeParentList(
            this.getAllEditData.predicates,
            this.templateList.predicates,
            this.$i18n.locale
          )
          this.paramsRules = addRule(this.matchPredicateData)
          this.templateFiltersList = this.templateList.filters
          this.predicateAllOptions = this.templateList.predicates
          this.predicateOptions = this.templateList.predicates
          this.changePredicateOptions()
          this.filterData = mergeParentList(
            this.getAllEditData.filters,
            this.templateList.filters,
            this.$i18n.locale
          )
          this.filterOptionsAll = getFilterOptions(this.templateFiltersList)
          this.getFilterOptions()
          this.templateFiltersList.forEach(item => {
            if (item.args) {
              formatNode(item.args)
            }
          })
        })
    },
    initTree() {
      this.$nextTick(() => {
        let newArr = filterDom("name", "fristSelect")
        for (let i = 0; i < newArr.length; i++) {
          let obj = document.getElementsByClassName(`${newArr[i]}`)
          for (let o = 0; o < obj.length; o++) {
            obj[o].style.width = `calc(18vw - ${i * 18 + "px"})`
          }
          let obj1 = document.getElementsByName(`${newArr[i]}`)
          for (let o = 0; o < obj1.length; o++) {
            obj1[o].style.width = `calc(18vw - ${i * 18 + "px"})`
          }
        }
      })
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
      this.paramsRules = addRule(this.matchPredicateData)
    },
    addMatchPredicate() {
      this.matchPredicateData.push({
        type: "",
        placeholder: "",
        value: {
          value: "",
        },
      })
      this.paramsRules = addRule(this.matchPredicateData) // TODO rules添加规则不够完善
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
      this.filterOptions = res1.filter(item => item.type)
    },
    selectTopFilterType(val) {
      val.args = []
      this.filterData = mergeParentList(
        this.getAllEditData.filters,
        this.templateList.filters,
        this.$i18n.locale
      )
    },
    changePredicateOptions() {
      let newData = []
      this.predicateAllOptions.forEach(item => {
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
    queryName(row, index) {
      let that = this
      row.value = {}
      let newArr = []
      that.matchPredicateData.forEach(item => {
        newArr.push({ type: item.type, value: item.value.value || "" })
      })
      that.matchPredicateData = mergeParentList(
        newArr,
        that.templateList.predicates,
        that.$i18n.locale
      )
      let newArr1 = addRule(that.matchPredicateData)
      that.paramsRules[index] = []
      that.paramsRules[index].push(...newArr1[index])
      that.$refs[`childFrom${index}`].resetFields()
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
        this.initTree()
      })
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
    selectTrigger(val, data) {
      data.value = data.defaultValue
    },
    selectFilterName(val, data) {
      let newObj = this.dialogFilterOptions.filter(item => item.name == val)[0]
      data.type = newObj.type
      data.help = newObj.help
      data.defaultValue = newObj.defaultValue
      data.value = newObj.defaultValue
      data.options = newObj.options
      data.childrens = []
      this.$set(data, { ...data })
      let res = this.templateFiltersList.filter(
        item => item.type == this.type
      )[0].args
      this.filterTreeData = mergeTrees(this.filterTreeData, res)
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
      node.data.id = node.id
      const parent = node.parent
      const children = parent.data.childrens || parent.data
      const index = children.findIndex(d => d.id && d.id === node.id)
      children.splice(index, 1)
    },
    addNodeData(node, data) {
      let newObj = {
        name: "",
        type: "",
        defaultValue: null,
        options: [],
        childrens: [],
        help: "",
        _show: false,
      }
      node.data.childrens.push(newObj)
      node.expanded = true
      this.initTree()
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
      this.initTree()
    },
    changeValue(val) {
      console.info(val)
    },
    changeFilterValue(val) {
      console.info(val)
    },
    showEdit() {
      this.editVisible = true
    },
    handleClose() {
      this.$refs.responseCache.synchronousData()
      this.editVisible = false
    },
    processingFilterTreeData() {
      this.drawer = false
      this.filterTreeData = formatOutputNode(this.filterTreeData)
    },
    commitAllData() {
      this.processingFilterTreeData()
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
          return data
        })
        .then(function (data) {
          console.log(data)
        })
    },
  },
}
