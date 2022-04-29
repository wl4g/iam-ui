import routeConfig from "./routeConfig.vue"
import serviceDiscovery from "./serviceDiscovery.vue"
import clusterInfo from "./clusterInfo.vue"
import monitoringInfo from "./monitoringInfo.vue"
export default {
  name: "ClusterManageDetail",
  components: {
    clusterInfo,
    routeConfig,
    serviceDiscovery,
    monitoringInfo,
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
      ],
    }
  },

  activated() {},

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
  },
}
