import { getTableData } from "../cluster/mock"

export default {
  name: "RuleEngine",
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    this.tableData = getTableData()
  },
  methods: {
    showRuleDetail(row) {
      console.info("11111", row)
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:securityGateway:ruleEngine:ruleEngineDetail"
        ),
        query: { id: row.id },
      })
    },
    delData() {},
  },
}
