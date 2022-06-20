export function getRuleEngineDetailList() {
  let res = {
    data: {
      app: 1,
      confId: 0,
      iceId: 1,
      registerClients: ["10.0.16.4/1/GDBDBjNdSMY", "10.0.16.4/1/3cehcDkhQp8"],
      root: {
        children: [
          {
            forward: {
              nextId: 2,
              showConf: {
                debug: true,
                inverse: false,
                labelName: "2645-AND",
                nodeId: 2645,
                nodeName: "",
                nodeType: 1,
              },
            },
            forwardId: 2645,
            index: 0,
            parentId: 1,
            showConf: {
              confField: "",
              confName: "com.ice.test.none.TimeChangeNone",
              debug: true,
              inverse: false,
              labelName: "2-TimeChangeNone",
              nodeId: 2,
              nodeType: 7,
            },
          },
          {
            children: [
              {
                children: [
                  {
                    forward: {
                      nextId: 6,
                      showConf: {
                        debug: true,
                        inverse: false,
                        labelName: "2660-AND",
                        nodeId: 2660,
                        nodeName: "",
                        nodeType: 1,
                      },
                    },
                    forwardId: 2660,
                    index: 0,
                    parentId: 4,
                    showConf: {
                      confField: '{"key":"cost","score":100}',
                      confName: "com.ice.test.flow.ScoreFlow",
                      debug: true,
                      inverse: false,
                      labelName: "6-ScoreFlow-充值金额≥100",
                      nodeId: 6,
                      nodeName: "充值金额≥100",
                      nodeType: 5,
                    },
                  },
                ],
                index: 0,
                parentId: 3,
                showConf: {
                  debug: true,
                  inverse: false,
                  labelName: "4-AND-5元余额",
                  nodeId: 4,
                  nodeName: "5元余额",
                  nodeType: 1,
                },
                sonIds: "6",
              },
              {
                children: [
                  {
                    index: 0,
                    parentId: 5,
                    showConf: {
                      confField: '{"key":"cost","score":50}',
                      confName: "com.ice.test.flow.ScoreFlow",
                      debug: true,
                      inverse: false,
                      labelName: "8-ScoreFlow-充值金额≥50",
                      nodeId: 8,
                      nodeName: "充值金额≥50",
                      nodeType: 5,
                    },
                  },
                  {
                    index: 1,
                    parentId: 5,
                    showConf: {
                      confField: '{"key":"uid","value":10}',
                      confName: "com.ice.test.result.PointResult",
                      debug: true,
                      inverse: false,
                      labelName: "9-PointResult-发放10积分",
                      nodeId: 9,
                      nodeName: "发放10积分",
                      nodeType: 6,
                    },
                  },
                ],
                index: 1,
                parentId: 3,
                showConf: {
                  debug: true,
                  inverse: false,
                  labelName: "5-AND-10积分 ≥10.5",
                  nodeId: 5,
                  nodeName: "10积分 ≥10.5",
                  nodeType: 1,
                },
                sonIds: "8,9",
                start: 1633363200000,
                timeType: 5,
              },
            ],
            index: 1,
            parentId: 1,
            showConf: {
              debug: true,
              inverse: false,
              labelName: "3-P_ANY",
              nodeId: 3,
              nodeName: "",
              nodeType: 12,
            },
            sonIds: "4,5",
          },
        ],
        showConf: {
          debug: true,
          inverse: false,
          labelName: "1-NONE-test",
          nodeId: 1,
          nodeName: "test",
          nodeType: 0,
        },
        sonIds: "2,3",
      },
    },
    ret: 0,
  }
  return res
}
