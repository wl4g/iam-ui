import loginEvents from "./modeles/loginEvents.vue"
import adminEvents from "./modeles/adminEvents.vue"
import config from "./modeles/config.vue"
export default {
  name: "Events",
  components: {
    loginEvents,
    adminEvents,
    config,
  },
  data() {
    return {
      activeName: "loginEvents",
      currentTabComponent: loginEvents,
      tabsData: [
        {
          labelName: "Login Events",
          name: "loginEvents",
        },
        {
          labelName: "Admin Events",
          name: "adminEvents",
        },
        {
          labelName: "Config",
          name: "config",
        },
      ],
      loginEventId: null,
    }
  },
  mounted() {
    console.info("event", this.$rou)
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.id) {
        console.info(to.query.id)
        vm.loginEventId = to.query.id
      }
    })
  },
  activated() {},

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab.name
    },
  },
}
