export function getTableData() {
  let res = [
    {
      id: "1",
      Name: "11111",
      Name1: "11111",
      Name2: "11111",
      Name3: "11111",
      Name4: "11111",
      Name5: "11111",
    },
  ]
  return res
}
export function getRouteConfigTableData() {
  let res = [
    {
      id: "1",
      Name: "11111",
      Name1: "11111",
      Name2: "11111",
      Name3: "11111",
      Name4: "11111",
      Name5: "11111",
      isChecked: true,
    },
    {
      id: "2",
      Name: "2222",
      Name1: "2222",
      Name2: "2222",
      Name3: "2222",
      Name4: "2222",
      Name5: "2222",
      isChecked: true,
    },
  ]
  return res
}
export function getMatchPredicateData() {
  let res = [
    { id: "1", predicateType: "1", value: "11111", placeholder: "11111000" },
    { id: "2", predicateType: "2", value: "22222", placeholder: "22222000" },
  ]
  return res
}
export function getPredicateOptions() {
  let res = [
    { predicateType: "1", value: "11111", placeholder: "11111000" },
    { predicateType: "2", value: "22222", placeholder: "22222000" },
    { predicateType: "3", value: "33333", placeholder: "33333000" },
  ]
  return res
}
export function getFilterData() {
  let res = [
    { id: "1", filterType: "A", value: "AAAAA", placeholder: "AAAAA000" },
    { id: "2", filterType: "B", value: "BBBBB", placeholder: "BBBBB000" },
  ]
  return res
}
export function getFilterOptions() {
  let res = allData().data.gatewayRoutesSchema.filters
  let res1 = []
  res.forEach(item => {
    res1.push({ filterType: item.type })
  })
  return res1
}

function forEachNode(data, val) {
  //根据checked，删除对应的树节点
  let aaa = []
  data.forEach((item, index) => {
    if (item.name && item.name == val) {
      aaa.push(item)
    }
    if (item.childrens.length > 0) {
      forEachNode(item.childrens)
    }
  })
  return aaa
}

export function filterValueoptions(parent, val) {
  console.info("11111part", parent, val)
  let res = allData().data.gatewayRoutesSchema.filters
  let res12 = res.filter(item => item.type == parent)[0].args
  let res1 = forEachNode(res12, val)[0].options
  console.info("11111", parent, val, res1)
  return res1
}
function formatNode(data) {
  //格式化代码
  data.forEach(item => {
    if (!item.childrens) {
      item.childrens = []
      item.childrens.push()
    }
    if (item.childrens.length > 0) {
      formatNode(item.childrens)
    }
  })
  return data
}
export function getFilterTreeData() {
  let res = [
    {
      name: "appIdExtractor",
      type: "enum",
      multi: "false",
      defaultValue: "Parameter",
      help: "",
      options: [
        {
          name: "Parameter",
          help: "",
        },
        {
          name: "RouteId",
          help: "",
        },
      ],
    },
    {
      name: "appIdParam",
      type: "string",
      multi: "false",
      defaultValue: "appId",
      help: "",
    },
    {
      name: "secretParam",
      type: "string",
      multi: "false",
      defaultValue: "appSecret",
      help: "",
    },
    {
      name: "signReplayVerifyEnabled",
      type: "boolean",
      multi: "false",
      defaultValue: "true",
      help: "",
    },
    {
      name: "signReplayVerifyBloomExpireSeconds",
      type: "int",
      multi: "false",
      defaultValue: "604800",
      help: "",
    },
    {
      name: "signParam",
      type: "string",
      multi: "false",
      defaultValue: "sign",
      help: "",
    },
    // {
    //   name: "signAlgorithm",
    //   type: "enum",
    //   multi: "false",
    //   defaultValue: "Parameter",
    //   help: "",
    //   options: [
    //     {
    //       name: "MD5",
    //       help: "",
    //     },
    //     {
    //       name: "S1",
    //       help: "",
    //     },
    //     {
    //       name: "S256",
    //       help: "",
    //     },
    //     {
    //       name: "S384",
    //       help: "",
    //     },
    //     {
    //       name: "S512",
    //       help: "",
    //     },
    //     {
    //       name: "HMD5",
    //       help: "",
    //     },
    //     {
    //       name: "HS1",
    //       help: "",
    //     },
    //     {
    //       name: "HS256",
    //       help: "",
    //     },
    //     {
    //       name: "HS512",
    //       help: "",
    //     },
    //   ],
    // },
  ]
  return res
}

export function getSelectNameOptions(value) {
  let res = allData().data.gatewayRoutesSchema.filters.filter(
    item => item.type == value
  )[0].args
  console.info(res)
  let res1 = []
  res.forEach(item => {
    res1.push({ name: item.name, type: item.type })
  })
  return res1
}
export function getChildrenSelectNameOptions(
  fristNodeName,
  parentNodeName,
  nodeName
) {
  console.info("11111val", fristNodeName, parentNodeName, nodeName)
  let res = allData().data.gatewayRoutesSchema.filters.filter(
    item => item.type == fristNodeName
  )[0].args
  res = formatNode(res)
  let res1 = forEachNode(res, parentNodeName)[0].childrens
  let res3 = []
  res1.forEach(item => {
    res3.push({ name: item.name, type: item.type })
  })
  return res3
}

export function allData() {
  let res = {
    errcode: 200,
    errmsg: "ok",
    requestId: "asdgshs",
    data: {
      gatewayRoutesSchema: {
        predicates: [
          {
            type: "Path",
            help: "",
            value: {
              type: "string",
              regex: "(^/[\\S_-]+)(^,/[\\S_-]+)*",
              help: "",
            },
          },
          {
            type: "StripPrefix",
            help: "",
            value: {
              type: "int",
              regex: "(^[\\d]+)",
              help: "",
            },
          },
          {
            type: "RewritePath",
            help: "",
            value: {
              type: "string",
              regex: "(^/[\\S_-]+)(^,/[\\S_-]+)*",
              help: "",
            },
          },
          {
            type: "Query",
            help: "",
            value: {
              type: "string",
              regex: "(^/[\\S_-]+)(^,/[\\S_-]+)*",
              help: "",
            },
          },
          {
            type: "RemoteAddr",
            help: "",
            value: {
              type: "string",
              regex: "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$",
              help: "",
            },
          },
        ],
        filters: [
          {
            type: "SimpleSignAuthing",
            args: [
              {
                name: "appIdExtractor",
                type: "enum",
                defaultValue: "Parameter",
                help: "",
                options: [
                  {
                    name: "Parameter",
                    help: "222",
                  },
                  {
                    name: "RouteId",
                    help: "3333",
                  },
                ],
                childrens: [],
              },
              {
                name: "appIdParam",
                type: "string",
                defaultValue: "appId",
                help: "",
                childrens: [],
              },
              {
                name: "secretParam",
                type: "string",
                defaultValue: "appSecret",
                help: "",
                childrens: [],
              },
              {
                name: "signReplayVerifyEnabled",
                type: "boolean",
                defaultValue: "true",
                help: "",
                childrens: [],
              },
              {
                name: "signReplayVerifyBloomExpireSeconds",
                type: "int",
                defaultValue: "604800",
                help: "",
                childrens: [],
              },
              {
                name: "signParam",
                type: "string",
                defaultValue: "sign",
                help: "",
                childrens: [],
              },
              {
                name: "signAlgorithm",
                type: "enum",
                defaultValue: "Parameter",
                help: "",
                options: [
                  {
                    name: "MD5",
                    help: "",
                  },
                  {
                    name: "S1",
                    help: "",
                  },
                  {
                    name: "S256",
                    help: "",
                  },
                  {
                    name: "S384",
                    help: "",
                  },
                  {
                    name: "S512",
                    help: "",
                  },
                  {
                    name: "HMD5",
                    help: "",
                  },
                  {
                    name: "HS1",
                    help: "",
                  },
                  {
                    name: "HS256",
                    help: "",
                  },
                  {
                    name: "HS512",
                    help: "",
                  },
                ],
                childrens: [],
              },
              {
                name: "signHashingMode",
                type: "enum",
                defaultValue: "UriParamsKeySortedHashing",
                help: "",
                options: [
                  {
                    name: "UriParamsKeySortedHashing",
                    help: "",
                  },
                  {
                    name: "SimpleParamsBytesSortedHashing",
                    help: "",
                  },
                ],
                childrens: [],
              },
              {
                name: "signHashingIncludeParams",
                type: "array",
                defaultValue: null,
                help: "",
                childrens: [],
              },
              {
                name: "signHashingExcludeParams",
                type: "array",
                defaultValue: null,
                help: "",
                childrens: [],
              },
              {
                name: "signHashingRequiredIncludeParams",
                type: "array",
                defaultValue: null,
                help: "",
                childrens: [],
              },
              {
                name: "addSignAuthClientIdHeader",
                type: "string",
                defaultValue: "X-Sign-Auth-AppId",
                help: "",
                childrens: [],
              },
            ],
          },
          {
            type: "RequestSize",
            args: [
              {
                name: "maxSize",
                type: "int",
                defaultValue: "10485760",
                help: "",
              },
            ],
          },
          {
            type: "CircuitBreaker",
            args: [
              {
                name: "name",
                type: "string",
                defaultValue: null,
                help: "",
              },
              {
                name: "fallbackUri",
                type: "string",
                defaultValue: null,
                help: "",
              },
              {
                name: "statusCodes",
                type: "array",
                defaultValue: null,
                help: "",
              },
            ],
          },
          {
            type: "CanaryLoadBalancer",
            args: [
              {
                name: "choose",
                type: "object",
                // _show: true,
                childrens: [
                  {
                    name: "loadBalancerAlgorithm",
                    type: "enum",
                    defaultValue: null,
                    help: "",
                    options: [
                      {
                        name: "R",
                        help: "",
                      },
                      {
                        name: "RR",
                        help: "",
                      },
                      {
                        name: "WR",
                        help: "",
                      },
                      {
                        name: "WRR",
                        help: "",
                      },
                      {
                        name: "DH",
                        help: "",
                      },
                      {
                        name: "SH",
                        help: "",
                      },
                      {
                        name: "LC",
                        help: "",
                      },
                      {
                        name: "LT",
                        help: "",
                      },
                      {
                        name: "WLC",
                        help: "",
                      },
                      {
                        name: "WLT",
                        help: "",
                      },
                    ],
                  },
                ],
                help: "",
              },
            ],
          },
          {
            type: "Retry",
            args: [
              {
                name: "retries",
                type: "int",
                defaultValue: null,
                help: "",
              },
              {
                name: "statuses",
                type: "array",
                muti: "true",
                defaultValue: [
                  "BAD_GATEWAY",
                  "SERVICE_UNAVAILABLE",
                  "GATEWAY_TIMEOUT",
                ],
                options: [
                  {
                    name: "BAD_GATEWAY",
                    help: "",
                  },
                  {
                    name: "SERVICE_UNAVAILABLE",
                    help: "",
                  },
                  {
                    name: "GATEWAY_TIMEOUT",
                    help: "",
                  },
                ],
                help: "",
              },
              {
                name: "backoff",
                type: "object",
                childrens: [
                  {
                    name: "firstBackoff",
                    type: "int",
                    defaultValue: "100",
                    help: "",
                  },
                  {
                    name: "maxBackoff",
                    type: "int",
                    defaultValue: "500",
                    help: "",
                  },
                  {
                    name: "factor",
                    type: "int",
                    defaultValue: "2",
                    help: "",
                  },
                  {
                    name: "basedOnPreviousValue",
                    type: "boolean",
                    defaultValue: "false",
                    help: "",
                  },
                ],
                help: "",
              },
            ],
          },
          {
            type: "RemoveRequestHeader",
            args: [
              {
                name: "RemoveRequestHeader",
                type: "stringWithNamedConfig",
                defaultValue: null,
                help: "",
              },
            ],
          },
          {
            type: "RemoveResponseHeader",
            args: [
              {
                name: "RemoveResponseHeader",
                type: "stringWithNamedConfig",
                defaultValue: null,
                help: "",
              },
            ],
          },
          {
            type: "SetResponseHeader",
            args: [
              {
                name: "SetResponseHeader",
                type: "stringWithNamedConfig",
                defaultValue: null,
                help: "",
              },
            ],
          },
          {
            type: "SetStatus",
            args: [
              {
                name: "SetStatus",
                type: "stringWithNamedConfig",
                defaultValue: null,
                help: "",
              },
            ],
          },
          {
            type: "RedirectTo",
            args: [
              {
                name: "RedirectTo",
                type: "stringWithNamedConfig",
                defaultValue: null,
                help: "",
              },
            ],
          },
          {
            type: "SecureHeaders",
            args: [
              {
                name: "xssProtectionHeader",
                type: "string",
                defaultValue: "X-Xss-Protection:1; mode=block",
                help: "",
              },
              {
                name: "strictTransportSecurity",
                type: "string",
                defaultValue: "Strict-Transport-Security:max-age=631138519",
                help: "",
              },
              {
                name: "frameOptions",
                type: "string",
                defaultValue: "DENY",
                help: "",
              },
              {
                name: "contentTypeOptions",
                type: "string",
                defaultValue: "nosniff",
                help: "",
              },
              {
                name: "referrerPolicy",
                type: "string",
                defaultValue: "no-referrer",
                help: "",
              },
              {
                name: "contentSecurityPolicy",
                type: "string",
                defaultValue:
                  "default-src 'self' https:; font-src 'self' https: data:; img-src 'self' https: data:; object-src 'none'; script-src https:; style-src 'self' https: 'unsafe-inline'",
                help: "",
              },
              {
                name: "downloadOptions",
                type: "string",
                defaultValue: "noopen",
                help: "",
              },
              {
                name: "permittedCrossDomainPolicies",
                type: "string",
                defaultValue: "none",
                help: "",
              },
            ],
          },
        ],
      },
    },
  }
  return res
}
