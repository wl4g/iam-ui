import { getRuleEngineDetailList } from "../mock"
const getStyle = type => {
  if (type <= 4) {
    return {
      type: "circle",
      color: "#FFFACD",
      stroke: "#EEAD0E",
      size: [30, 30],
    }
  } else if (type === 5) {
    return {
      type: "diamond",
      color: "#C1FFC1",
      stroke: "#00CD00",
      size: [31, 31],
    }
  } else if (type === 6) {
    return {
      type: "rect",
      color: "#C1FFC1",
      stroke: "#00CD00",
      size: [26, 26],
    }
  } else if (type === 7) {
    return {
      type: "triangle",
      color: "#C1FFC1",
      stroke: "#00CD00",
      size: [16, 16],
    }
  } else {
    return {
      type: "circle",
      color: "#DDA0DD",
      stroke: "#9400D3",
      size: [30, 30],
    }
  }
}
export default {
  name: "RuleEngineDetail",
  data() {
    return {
      treeData: [],
      graph: null, //实例
      createRoot: false,
      showOperation: false,
      createRoot: false,
      selectedNode: {},
    }
  },
  mounted() {
    this.treeData = getRuleEngineDetailList().data.root
    this.init()
  },
  methods: {
    init() {
      this.graph = new G6.TreeGraph({
        container: "container",
        width: "800",
        height: "800",
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            cursor: "pointer",
          },
        },
        defaultEdge: {
          type: "cubic-horizontal",
          style: {
            stroke: "#CFCFCF",
          },
        },
        layout: {
          type: "compactBox",
          direction: "LR",
          getId: function getId(d) {
            return d.id
          },
          getVGap: function getVGap() {
            return 10
          },
          getHGap: function getHGap() {
            return 120
          },
        },
      })

      this.graph.node(node => {
        const { nodeType, labelName } = node.showConf
        console.info(node)
        return {
          type: getStyle(nodeType).type,
          label: this.createRoot ? "ERROR" : `${labelName}`,
          size: getStyle(nodeType).size,
          strokeOpacity: 0.5,
          style: {
            fill: node.isNotChildren ? "#FFCCCC" : getStyle(nodeType).color,
            stroke: node.isNotChildren
              ? nodeType === 8 ||
                nodeType === 9 ||
                nodeType === 10 ||
                nodeType === 11 ||
                nodeType === 12
                ? getStyle(nodeType).stroke
                : "#FF0000"
              : getStyle(nodeType).stroke,
          },
          labelCfg: {
            position: "right",
            style: {
              fontSize: 15,
            },
          },
        }
      })

      this.graph.data(this.treeData)
      this.graph.render()
      this.graph.fitView()
      this.bindEvents()
    },
    bindEvents() {
      // 监听node上面mouse事件
      this.graph.on("click", ev => {
        const { item } = ev
        if (!item) {
          setShowGroup([])
        }
        // setSelectedNode({})
        // setShowOperation(false)
        this.showOperation = false
      })

      this.graph.on("node:click", evt => {
        if (this.createRoot) {
          openAddNodeModal()
        } else {
          const { item } = evt
          const model = item.getModel()
          const { x, y } = model
          const point = this.graph.getCanvasByPoint(x, y)
          this.selectedNode = {
            ...model,
            id: item._cfg.id,
            x: point.x + 15,
            y: point.y + 105,
          }
          this.showOperation = true
        }
      })
    },
  },
}
