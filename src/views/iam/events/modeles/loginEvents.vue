<template>
  <section>
    <div class="button_group">
      <div class="button_group_item">
        <el-button round :class="state1 === false?'color2':'color1'" class="different" @click="getData('OF_HOUR')">1小时访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="state2 === false?'color2':'color1'" class="different" @click="getData('OF_DAY')">今日访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="state3 === false?'color2':'color1'" class="different" @click="getData('OF_WEEK')">本周访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="state4 === false?'color2':'color1'" class="different" @click="getData('OF_MONTH')">本月访问</el-button>
      </div>
    </div>
    <div>
      <el-button-group>
        <el-button @click="showChart('map')" :class="mapType === 'map'?'color1':'color2'">地图</el-button>
        <el-button @click="showChart('line')" :class="mapType === 'line'?'color1':'color2'">折线图</el-button>
      </el-button-group>
      <chart ref="myChart" style="width: 600px; height: 400px" id="myChart" />
      <chart ref="mapChart" style="height:80vh;width:80vw" id="mapChart" />
    </div>
  </section>
</template>
<script>
import ECharts from "vue-echarts"
import echarts from "echarts";
import "echarts/lib/chart/line"
import moment from 'moment'

function getDataRangeParms (val) {
  let endDate, beginDate
  if (val == 'OF_HOUR') {//一小时
    endDate = `${moment().subtract(0, 'm').format('YYYY-MM-DD HH:mm:ss')}`
    beginDate = `${moment().subtract(60, 'm').format('YYYY-MM-DD HH:mm:ss')}`;
  } else if (val == 'OF_DAY') {//今日
    endDate = `${moment().subtract(0, 'days').format('YYYY-MM-DD')} 23:59:59`
    beginDate = `${moment().subtract(0, 'days').format('YYYY-MM-DD')} 00:00:00`;
  } else if (val == 'OF_WEEK') {//本周
    beginDate = moment().day("Monday").format("YYYY-MM-DD 00:00:00");
    endDate = moment().day("Monday").day(+7).format("YYYY-MM-DD 23:59:59");
  } else if (val == 'OF_MONTH') {//本月
    beginDate = moment().startOf("month").format("YYYY-MM-DD 00:00:00");
    endDate = moment().endOf("month").format("YYYY-MM-DD 23:59:59");
  }
  return { beginDate, endDate }
}

function compare (arr1, arr2) {
  return arr1.filter((v) => {
    return arr2.includes(v);
  });
}

export default {
  name: 'loginEvents',
  components: {
    "v-chart": ECharts,
  },
  props: ['loginEventId'],
  data () {
    return {
      state1: true,
      state2: false,
      state3: false,
      state4: false,
      dataType: 1,
      mapType: 'map',
      level: "OF_COUNTRY",
      levelNum: '0',
      rootName: 'world',
      chartJson: [],
      oldLevel: [],
      oldRootName: [],
      register: {},
      option: {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: 'Large Ara Chart'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: []
          }
        ]
      },
      worldMap: null,
      mapOptions: {
        title: {
          text: '地图',
          subtext: '',
          sublink: '',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: 500000,
          max: 38000000,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '访问量',
            type: 'map',
            map: 'world',
            projection: {
              project: function (point) {
                return projection(point);
              },
              unproject: function (point) {
                return projection.invert(point);
              }
            },
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            scaleLimit: { //滚轮缩放的极限控制
              min: 0.5,
              max: 5
            },
            emphasis: {
              label: {
                show: true
              },
            },
            data: []
          },
        ]
      }

    }
  },
  created () {

  },

  watch: {
    loginEventId: {
      handler: function (nVal, oVal) {
        if (nVal && nVal != oVal) {
          this.dataType == nVal
          this.getData(nVal)
        }
      },
      deep: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.loadEventData()
    })
  },
  methods: {
    getData (id) {
      switch (id) {
        case 'OF_HOUR':
          this.state1 = true
          this.state2 = false
          this.state3 = false
          this.state4 = false
          break
        case 'OF_DAY':
          this.state1 = false
          this.state2 = true
          this.state3 = false
          this.state4 = false
          break
        case 'OF_WEEK':
          this.state1 = false
          this.state2 = false
          this.state3 = true
          this.state4 = false
          break
        case 'OF_MONTH':
          this.state1 = false
          this.state2 = false
          this.state3 = false
          this.state4 = true
          break
      }
      this.dataType = id
      this.loadEventData()
    },
    showChart (val) {
      this.mapType = val
    },
    loadEventData () {
      let that = this
      let param = {}
      let dataRangeParms = getDataRangeParms(that.dataType)
      param = { ...dataRangeParms, scope: that.dataType }
      if (that.mapType == "map") {
        param = { ...param, level: that.level, rootName: this.rootName }
      }
      let url = "http://127.0.0.1:4523/m1/1109183-0-default/mock"
      if (param) {
        let paramsArray = [];
        //拼接参数
        Object.keys(param).forEach(key => paramsArray.push(key + '=' + param[key]))
        if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
        } else {
          url += '&' + paramsArray.join('&')
        }
      }
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          return data.json()
        })
        .then(function (body1) {
          that.initChart()
          that.currentMapName = that.level == "OF_COUNTRY" ? "get-world" : that.currentMapName
          fetch(`../../../../../../static/mock/${that.currentMapName}.json`)
            .then(res => res.json())
            .then(body2 => {
              // 过滤出当前市、区边界数据 start  Country/Region/City/ area 
              if (that.currentMapName != "get-world" && that.levelNum > 1) {
                let filterCityOrArea = body2.features.filter(item =>
                  item.properties[`NAME_${that.levelNum - 1}`] == that.rootName
                )
                body2.features = []
                body2.features.push(...filterCityOrArea)
              }
              // 过滤出当前市、区边界数据 start

              // 给json文件添加name start
              // if (!body2.features[0].properties.name) {
              //   let jsonKeyName = Object.keys(body2.features[0].properties)
              //   let matchNameArr = ["NL_NAME_", "name"]
              //   let natchFinalNameArr = []
              //   matchNameArr.map(item => {
              //     if (item.indexOf("_") > -1) {
              //       item = item + that.levelNum
              //     }
              //     natchFinalNameArr.push(item)
              //   })
              //   let sameKeyArr = compare(jsonKeyName, natchFinalNameArr)
              //   if (sameKeyArr.length > 0) {
              //     body2.features.forEach(item => {
              //       item.properties.name = item.properties[sameKeyArr[0]] || item.properties[`NAME_${that.levelNum}`]
              //     })
              //   }
              // }
              //给json文件添加name end

              //给数据添加name字段
              body1.data.geoStatis.forEach(item => {
                let sameIdArr = body2.features.filter(item1 =>
                  item1.properties.zipCode == item.zipCode
                )
                item.name = sameIdArr[0].properties.name || ""
              });
              echarts.registerMap(param.name, body2)
              that.mapOptions.series[0].data = body1.data.geoStatis
              that.mapOptions.series[0].map = param.name
              that.worldMap.setOption(that.mapOptions)
            })

          // 地图点击事件
          that.worldMap.off('click');
          that.worldMap.on("click", param => {
            that.toNextLevel(param)
          })
          // 地图缩小事件
          that.worldMap.off('georoam');
          that.worldMap.on("georoam", param => {
            if (that.level != "OF_COUNTRY") {
              let option = that.worldMap.getOption();
              let zoom = option.series[0].zoom;
              if (zoom == 0.5) {
                if (that.level == "OF_COUNTRY") return
                that.worldMap.off('georoam');
                that.level = that.oldLevel.pop()
                that.rootName = that.oldRootName.pop()
                that.loadEventData()
              }
            }
          })
        })
    },
    initChart () {
      this.worldMap && this.worldMap.dispose();
      this.worldMap = echarts.init(document.getElementById('mapChart'));
    },
    toNextLevel (param) {
      switch (this.level) {
        case 'OF_COUNTRY':
          this.oldLevel.push(this.level)
          this.oldLevel = Array.from(new Set(this.oldLevel))
          this.level = "OF_PROVINCE"
          this.currentMapName = param.data.zipCode + "_1"
          this.oldRootName.push(this.rootName)
          this.rootName = param.data.zipCode
          this.levelNum = "1"
          this.loadEventData()
          break
        case 'OF_PROVINCE':
          this.oldLevel.push(this.level)
          this.level = "OF_CITY"
          this.currentMapName = this.oldRootName[0] + "_2"
          this.oldRootName.push(this.rootName)
          this.rootName = param.data.zipCode
          this.levelNum = "2"
          this.loadEventData()
          break
        case 'OF_CITY':
          this.oldLevel.push(this.level)
          this.oldLevel = Array.from(new Set(this.oldLevel))
          this.currentMapName = this.oldRootName[0] + "_3"
          this.oldRootName.push(this.rootName)
          this.rootName = param.data.zipCode
          this.level = "OF_AREA"
          this.levelNum = "3"
          this.loadEventData()
          break
        case 'OF_AREA':
          break
      }
    },
  }
}
</script>
<style scoped>
.button_group {
  display: flex;
  justify-content: center;
}
.button_group_item {
  padding: 0 1vw;
}
.color1 {
  color: #1890ff;
  background: #e8f4ff;
  border: 1px solid #badeff;
}
.color2 {
  color: dimgray;
}
.echarts {
  width: auto;
  height: 55vh;
}
/* .activeButton {
  background: red;
} */
</style>