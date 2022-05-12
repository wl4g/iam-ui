import routeConfig from "./route/routeList.vue"
import serviceDiscovery from "./servicediscovery/serviceDiscovery.vue"
import clusterInfo from "./cluster/clusterInfo.vue"
import monitoringInfo from "./monitoring/monitoringInfo.vue"
import instance from "./instance/instanceList.vue"
export default {
  name: "ClusterManageDetail",
  components: {
    clusterInfo,
    routeConfig,
    serviceDiscovery,
    monitoringInfo,
    instance,
  },
  data() {
    return {
      activeName: "clusterInfo",
      currentTabComponent: clusterInfo,
      tabsData: [
        {
          labelName: "集群信息",
          name: "clusterInfo",
        },
        {
          labelName: "路由配置",
          name: "routeConfig",
        },
        {
          labelName: "服务发现",
          name: "serviceDiscovery",
        },
        {
          labelName: "监控信息",
          name: "monitoringInfo",
        },
        {
          labelName: "实例",
          name: "instance",
        },
      ],
    }
  },

  activated() {},

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
    showTabs(val) {
      this.currentTabComponent = this.activeName = "instance"
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.activeName) {
        vm.currentTabComponent = vm.activeName = to.query.activeName
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.currentTabComponent = this.activeName = "clusterInfo"
    next() //允许跳转页面
  },
}
