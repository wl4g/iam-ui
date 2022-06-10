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
import { getLoginEventsData } from "../mock"
import worldMapJson from "../../../../../static/config/geo/world.json"
import usaJson from "../../../../../static/config/geo/usa/usa.json"
import chinaJson from '../../../../../static/config/geo/cn/100000.json'
import hongkongJson from '../../../../../static/config/geo/cn/hongkong.json'

function getData (val) {
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
      chartJson: [],
      oldLevel: [],
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
            data: [
              {
                "name": "Afghanistan", value: "999999"
              },
              {
                "name": "Angola"
              },
              {
                "name": "Albania"
              },
              {
                "name": "United Arab Emirates"
              },
              {
                "name": "Argentina"
              },
              {
                "name": "Armenia"
              },
              {
                "name": "French Southern and Antarctic Lands"
              },
              {
                "name": "Australia"
              },
              {
                "name": "Austria"
              },
              {
                "name": "Azerbaijan"
              },
              {
                "name": "Burundi"
              },
              {
                "name": "Belgium"
              },
              {
                "name": "Benin"
              },
              {
                "name": "Burkina Faso"
              },
              {
                "name": "Bangladesh"
              },
              {
                "name": "Bulgaria"
              },
              {
                "name": "The Bahamas"
              },
              {
                "name": "Bosnia and Herzegovina"
              },
              {
                "name": "Belarus"
              },
              {
                "name": "Belize"
              },
              {
                "name": "Bermuda"
              },
              {
                "name": "Bolivia"
              },
              {
                "name": "Brazil"
              },
              {
                "name": "Brunei"
              },
              {
                "name": "Bhutan"
              },
              {
                "name": "Botswana"
              },
              {
                "name": "Central African Republic"
              },
              {
                "name": "Canada"
              },
              {
                "name": "Switzerland"
              },
              {
                "name": "Chile"
              },
              {
                "name": "China"
              },
              {
                "name": "Ivory Coast"
              },
              {
                "name": "Cameroon"
              },
              {
                "name": "Democratic Republic of the Congo"
              },
              {
                "name": "Republic of the Congo"
              },
              {
                "name": "Colombia"
              },
              {
                "name": "Costa Rica"
              },
              {
                "name": "Cuba"
              },
              {
                "name": "Northern Cyprus"
              },
              {
                "name": "Cyprus"
              },
              {
                "name": "Czech Republic"
              },
              {
                "name": "Germany"
              },
              {
                "name": "Djibouti"
              },
              {
                "name": "Denmark"
              },
              {
                "name": "Dominican Republic"
              },
              {
                "name": "Algeria"
              },
              {
                "name": "Ecuador"
              },
              {
                "name": "Egypt"
              },
              {
                "name": "Eritrea"
              },
              {
                "name": "Spain"
              },
              {
                "name": "Estonia"
              },
              {
                "name": "Ethiopia"
              },
              {
                "name": "Finland"
              },
              {
                "name": "Fiji"
              },
              {
                "name": "Falkland Islands"
              },
              {
                "name": "France"
              },
              {
                "name": "Gabon"
              },
              {
                "name": "United Kingdom"
              },
              {
                "name": "Georgia"
              },
              {
                "name": "Ghana"
              },
              {
                "name": "Guinea"
              },
              {
                "name": "Gambia"
              },
              {
                "name": "Guinea Bissau"
              },
              {
                "name": "Equatorial Guinea"
              },
              {
                "name": "Greece"
              },
              {
                "name": "Greenland"
              },
              {
                "name": "Guatemala"
              },
              {
                "name": "French Guiana"
              },
              {
                "name": "Guyana"
              },
              {
                "name": "Honduras"
              },
              {
                "name": "Croatia"
              },
              {
                "name": "Haiti"
              },
              {
                "name": "Hungary"
              },
              {
                "name": "Indonesia"
              },
              {
                "name": "India"
              },
              {
                "name": "Ireland"
              },
              {
                "name": "Iran"
              },
              {
                "name": "Iraq"
              },
              {
                "name": "Iceland"
              },
              {
                "name": "Israel"
              },
              {
                "name": "Italy"
              },
              {
                "name": "Jamaica"
              },
              {
                "name": "Jordan"
              },
              {
                "name": "Japan"
              },
              {
                "name": "Kazakhstan"
              },
              {
                "name": "Kenya"
              },
              {
                "name": "Kyrgyzstan"
              },
              {
                "name": "Cambodia"
              },
              {
                "name": "South Korea"
              },
              {
                "name": "Kosovo"
              },
              {
                "name": "Kuwait"
              },
              {
                "name": "Laos"
              },
              {
                "name": "Lebanon"
              },
              {
                "name": "Liberia"
              },
              {
                "name": "Libya"
              },
              {
                "name": "Sri Lanka"
              },
              {
                "name": "Lesotho"
              },
              {
                "name": "Lithuania"
              },
              {
                "name": "Luxembourg"
              },
              {
                "name": "Latvia"
              },
              {
                "name": "Morocco"
              },
              {
                "name": "Moldova"
              },
              {
                "name": "Madagascar"
              },
              {
                "name": "Mexico"
              },
              {
                "name": "Macedonia"
              },
              {
                "name": "Mali"
              },
              {
                "name": "Myanmar"
              },
              {
                "name": "Montenegro"
              },
              {
                "name": "Mongolia"
              },
              {
                "name": "Mozambique"
              },
              {
                "name": "Mauritania"
              },
              {
                "name": "Malawi"
              },
              {
                "name": "Malaysia"
              },
              {
                "name": "Namibia"
              },
              {
                "name": "New Caledonia"
              },
              {
                "name": "Niger"
              },
              {
                "name": "Nigeria"
              },
              {
                "name": "Nicaragua"
              },
              {
                "name": "Netherlands"
              },
              {
                "name": "Norway"
              },
              {
                "name": "Nepal"
              },
              {
                "name": "New Zealand"
              },
              {
                "name": "Oman"
              },
              {
                "name": "Pakistan"
              },
              {
                "name": "Panama"
              },
              {
                "name": "Peru"
              },
              {
                "name": "Philippines"
              },
              {
                "name": "Papua New Guinea"
              },
              {
                "name": "Poland"
              },
              {
                "name": "Puerto Rico"
              },
              {
                "name": "North Korea"
              },
              {
                "name": "Portugal"
              },
              {
                "name": "Paraguay"
              },
              {
                "name": "Qatar"
              },
              {
                "name": "Romania"
              },
              {
                "name": "Russia"
              },
              {
                "name": "Rwanda"
              },
              {
                "name": "Western Sahara"
              },
              {
                "name": "Saudi Arabia"
              },
              {
                "name": "Sudan"
              },
              {
                "name": "South Sudan"
              },
              {
                "name": "Senegal"
              },
              {
                "name": "Solomon Islands"
              },
              {
                "name": "Sierra Leone"
              },
              {
                "name": "El Salvador"
              },
              {
                "name": "Somaliland"
              },
              {
                "name": "Somalia"
              },
              {
                "name": "Republic of Serbia"
              },
              {
                "name": "Suriname"
              },
              {
                "name": "Slovakia"
              },
              {
                "name": "Slovenia"
              },
              {
                "name": "Sweden"
              },
              {
                "name": "Swaziland"
              },
              {
                "name": "Syria"
              },
              {
                "name": "Chad"
              },
              {
                "name": "Togo"
              },
              {
                "name": "Thailand"
              },
              {
                "name": "Tajikistan"
              },
              {
                "name": "Turkmenistan"
              },
              {
                "name": "East Timor"
              },
              {
                "name": "Trinidad and Tobago"
              },
              {
                "name": "Tunisia"
              },
              {
                "name": "Turkey"
              },
              {
                "name": "United Republic of Tanzania"
              },
              {
                "name": "Uganda"
              },
              {
                "name": "Ukraine"
              },
              {
                "name": "Uruguay"
              },
              {
                "name": "United States of America"
              },
              {
                "name": "Uzbekistan"
              },
              {
                "name": "Venezuela"
              },
              {
                "name": "Vietnam"
              },
              {
                "name": "Vanuatu"
              },
              {
                "name": "West Bank"
              },
              {
                "name": "Yemen"
              },
              {
                "name": "South Africa"
              },
              {
                "name": "Zambia"
              },
              {
                "name": "Zimbabwe"
              }
            ]
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
        console.info(nVal, oVal)
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
      this.getViewsData()
      // let myChart = echarts.init(document.getElementById("myChart"));
      // myChart.setOption(this.option)
      // this.worldMap = echarts.init(document.getElementById('mapChart'));
      // echarts.registerMap('world', worldMapJson);
      // this.worldMap.setOption(this.mapOptions)
      // let newArr1 = [
      //   {
      //     "name": "南海诸岛"
      //   },
      //   {
      //     "code": "110000", value: "99999999"
      //   },
      //   {
      //     "name": "天津"
      //   },
      //   {
      //     "name": "上海"
      //   },
      //   {
      //     "name": "重庆"
      //   },
      //   {
      //     "name": "河北"
      //   },
      //   {
      //     "name": "河南"
      //   },
      //   {
      //     "name": "云南"
      //   },
      //   {
      //     "name": "辽宁"
      //   },
      //   {
      //     "name": "黑龙江"
      //   },
      //   {
      //     "name": "湖南"
      //   },
      //   {
      //     "name": "安徽"
      //   },
      //   {
      //     "name": "山东"
      //   },
      //   {
      //     "name": "新疆"
      //   },
      //   {
      //     "name": "江苏"
      //   },
      //   {
      //     "name": "浙江"
      //   },
      //   {
      //     "name": "江西"
      //   },
      //   {
      //     "name": "湖北"
      //   },
      //   {
      //     "name": "广西"
      //   },
      //   {
      //     "name": "甘肃"
      //   },
      //   {
      //     "name": "山西"
      //   },
      //   {
      //     "name": "内蒙古"
      //   },
      //   {
      //     "name": "陕西"
      //   },
      //   {
      //     "name": "吉林"
      //   },
      //   {
      //     "name": "福建"
      //   },
      //   {
      //     "name": "贵州"
      //   },
      //   {
      //     "name": "广东", value: '22222222222'
      //   },
      //   {
      //     "name": "青海"
      //   },
      //   {
      //     "name": "西藏"
      //   },
      //   {
      //     "name": "四川"
      //   },
      //   {
      //     "name": "宁夏"
      //   },
      //   {
      //     "name": "海南"
      //   },
      //   {
      //     "name": "台湾"
      //   },
      //   {
      //     "name": "香港"
      //   },
      //   {
      //     "name": "澳门"
      //   }
      // ]
      // this.worldMap.on("click", param => {
      //   echarts.registerMap(param.name, chinaJson)
      //   this.mapOptions.series[0].data = newArr1
      //   this.mapOptions.series[0].map = param.name
      //   this.worldMap.setOption(this.mapOptions)
      // })
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
      this.getViewsData()
    },
    showChart (val) {
      this.mapType = val
    },
    getViewsData () {
      let that = this
      let param = {}
      let data = getData(that.dataType)
      param = { ...data, scope: that.dataType }
      if (that.mapType == "map") {
        param = { ...param, level: that.level }
      }
      fetch("http://httpbin.org/post", {
        method: "post",
        body: JSON.stringify({
          ...param,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (data) {
          return data
        })
        .then(function (data) {
          if (that.level == "OF_COUNTRY") {
            data = [
              {
                name: "China",
                value: '999999',
                adcode: '100000'
              }
            ]
            that.initChart()
            that.mapOptions.series[0].data = data
            that.mapOptions.series[0].map = "world"
            echarts.registerMap('world', worldMapJson);
            that.worldMap.setOption(that.mapOptions)
          } else if (that.level == "OF_PROVINCE") {
            data = [
              {
                value: '999999',
                adcode: '440000'
              }
            ]
            that.initChart()
            fetch("../../../../../../static/mock/gadm40_RUS_1.json")
              .then(res => res.json())
              .then(jsonData => {
                echarts.registerMap(param.name, jsonData)
                // data.forEach(item => {
                //   let newArr = jsonData.features.filter(item1 => item1.properties.adcode == item.adcode)
                //   item.name = newArr[0].properties.name
                // });
                that.mapOptions.series[0].data = data
                that.mapOptions.series[0].map = param.name
                that.worldMap.setOption(that.mapOptions)
              })
          } else if (that.level == "OF_CITY") {
            data = [
              {
                value: '440100',
                adcode: '440100'
              }
            ]
            that.initChart()
            fetch("../../../../../../static/mock/get-440000.json")
              .then(res => res.json())
              .then(jsonData => {
                echarts.registerMap(param.name, jsonData)
                data.forEach(item => {
                  let newArr = jsonData.features.filter(item1 => item1.properties.adcode == item.adcode)
                  item.name = newArr[0].properties.name
                });
                that.mapOptions.series[0].data = data
                that.mapOptions.series[0].map = param.name
                that.worldMap.setOption(that.mapOptions)
              })
          } else if (that.level == "OF_AREA") {
            data = [
              {
                value: '440103',
                adcode: '440103'
              }
            ]
            that.initChart()
            fetch("../../../../../../static/mock/get-440100.json")
              .then(res => res.json())
              .then(jsonData => {
                echarts.registerMap(param.name, jsonData)
                data.forEach(item => {
                  let newArr = jsonData.features.filter(item1 => item1.properties.adcode == item.adcode)
                  item.name = newArr[0].properties.name
                });
                that.mapOptions.series[0].data = data
                that.mapOptions.series[0].map = param.name
                that.worldMap.setOption(that.mapOptions)
              })
          }
          that.worldMap.off('click');
          that.worldMap.on("click", param => {
            console.info(param)
            that.toNextLevel(param)
          })
          that.worldMap.off('georoam');
          that.worldMap.on("georoam", param => {
            if (that.level != "OF_COUNTRY") {
              let option = that.worldMap.getOption();
              let zoom = option.series[0].zoom;
              if (zoom == 0.5) {
                that.worldMap.off('georoam');
                that.level = that.oldLevel.pop()
                console.info(that.oldLevel)
                console.info(that.level)
                that.getViewsData()
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
          console.info(this.oldLevel)
          this.level = "OF_PROVINCE"
          this.getViewsData()
          break
        case 'OF_PROVINCE':
          this.oldLevel.push(this.level)
          this.oldLevel = Array.from(new Set(this.oldLevel))
          console.info(this.oldLevel)
          this.level = "OF_CITY"
          console.info(this.level)
          this.getViewsData()
          break
        case 'OF_CITY':
          this.oldLevel.push(this.level)
          this.oldLevel = Array.from(new Set(this.oldLevel))
          console.info(this.oldLevel)
          this.level = "OF_AREA"
          this.getViewsData()
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