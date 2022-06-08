<template>
  <section>
    <div class="button_group">
      <div class="button_group_item">
        <el-button round :class="state1 === false?'color2':'color1'" class="different" @click="getData(1)">1小时访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="state2 === false?'color2':'color1'" class="different" @click="getData(2)">今日访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="state3 === false?'color2':'color1'" class="different" @click="getData(3)">本周访问</el-button>
      </div>
      <div class="button_group_item">
        <el-button round :class="state4 === false?'color2':'color1'" class="different" @click="getData(4)">本月访问</el-button>
      </div>
    </div>
    <div>
      <chart ref="myChart" style="width: 600px; height: 400px" id="myChart" />
      <chart ref="mapChart" style="height:80vh;width:80vw" id="mapChart" />
    </div>
  </section>
</template>
<script>
import ECharts from "vue-echarts"
import echarts from "echarts";
import "echarts/lib/chart/line"
import { getLoginEventsData } from "../mock"
import worldMapJson from "../../../../../static/config/geo/world.json"
import usaJson from "../../../../../static/config/geo/usa/usa.json"
import chinaJson from '../../../../../static/config/geo/cn/china.json'
import hongkongJson from '../../../../../static/config/geo/cn/hongkong.json'
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
            name: 'USA PopEstimates',
            type: 'map',
            map: 'USA',
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
              min: 1,
              max: 4
            },
            emphasis: {
              label: {
                show: true
              }
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
          this.getData(nVal)
        }
      },
      deep: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      // let myChart = echarts.init(document.getElementById("myChart"));
      // myChart.setOption(this.option)
      this.worldMap = echarts.init(document.getElementById('mapChart'));
      echarts.registerMap('USA', worldMapJson);
      this.worldMap.setOption(this.mapOptions)
      // let newArr = []
      let newArr1 = [
        {
          "name": "南海诸岛"
        },
        {
          "name": "北京"
        },
        {
          "name": "天津"
        },
        {
          "name": "上海"
        },
        {
          "name": "重庆"
        },
        {
          "name": "河北"
        },
        {
          "name": "河南"
        },
        {
          "name": "云南"
        },
        {
          "name": "辽宁"
        },
        {
          "name": "黑龙江"
        },
        {
          "name": "湖南"
        },
        {
          "name": "安徽"
        },
        {
          "name": "山东"
        },
        {
          "name": "新疆"
        },
        {
          "name": "江苏"
        },
        {
          "name": "浙江"
        },
        {
          "name": "江西"
        },
        {
          "name": "湖北"
        },
        {
          "name": "广西"
        },
        {
          "name": "甘肃"
        },
        {
          "name": "山西"
        },
        {
          "name": "内蒙古"
        },
        {
          "name": "陕西"
        },
        {
          "name": "吉林"
        },
        {
          "name": "福建"
        },
        {
          "name": "贵州"
        },
        {
          "name": "广东"
        },
        {
          "name": "青海"
        },
        {
          "name": "西藏"
        },
        {
          "name": "四川"
        },
        {
          "name": "宁夏"
        },
        {
          "name": "海南"
        },
        {
          "name": "台湾"
        },
        {
          "name": "香港"
        },
        {
          "name": "澳门"
        }
      ]
      // newArr1.forEach(item => {
      //   newArr.push({ name: item.name })
      // })
      // console.info(newArr)
      this.worldMap.on("click", param => {
        console.info(param)
        // if (param.name == "china") {
        this.mapOptions.series[0].data = newArr1
        this.mapOptions.series[0].map = param.name
        echarts.registerMap(param.name, chinaJson)
        // console.info(this.mapOptions.series[0].data)
        this.worldMap.setOption(this.mapOptions)
        // }
        // if (param.name == "HK") {
        //   this.mapOptions.series[0].data = newArr1
        //   this.mapOptions.series[0].map = param.name
        //   echarts.registerMap(param.name, hongkongJson)
        //   // console.info(this.mapOptions.series[0].data)
        //   this.worldMap.setOption(this.mapOptions)
        // }
      })
    })
  },
  methods: {
    getData (id) {
      switch (id) {
        case 1:
          this.state1 = true
          this.state2 = false
          this.state3 = false
          this.state4 = false
          break
        case 2:
          this.state1 = false
          this.state2 = true
          this.state3 = false
          this.state4 = false
          break
        case 3:
          this.state1 = false
          this.state2 = false
          this.state3 = true
          this.state4 = false
          break
        case 4:
          this.state1 = false
          this.state2 = false
          this.state3 = false
          this.state4 = true
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
</style>