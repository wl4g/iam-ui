import ECharts from "vue-echarts"
import "echarts/lib/chart/line"
export default {
  name: "Overview",
  components: {
    "v-chart": ECharts,
  },
  data() {
    return {
      color: ["rgb(105, 167, 225)", "rgb(120, 230, 117)"],
      register: {},
    }
  },
  created() {
    this.getJobsRegister()
  },
  mounted() {},

  methods: {
    getJobsRegister() {
      this.register = {
        // xAxis: {
        //   type: "category",
        //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        // },
        // yAxis: {
        //   type: "value",
        // },
        // series: [
        //   {
        //     data: [150, 230, 224, 218, 135, 147, 260],
        //     type: "line",
        //   },
        // ],
        color: this.color,
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          bottom: 0,
        },
        grid: {
          left: "12%",
          right: "12%",
          bottom: "12%",
          top: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            data: [150, 230, 224, 218, 135, 147, 260],
          },
        ],
      }
    },
    toDetail(val) {
      this.$router.push({
        path: "/iam/baseConfig/events",
        query: {
          id: val,
        },
      })
    },
  },
}
