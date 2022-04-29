import { getTableData } from "./mock"

export default {
  name: "Cluster",
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    this.tableData = getTableData()
  },
  methods: {
    toDetail(row) {
      this.$router.push({
        path: this.permitutil.getRoutePathByPermission(
          "iam:securityGatewaydetail"
        ),
        query: { id: row.id },
      })
    },
    delData() {},
  },
}
