import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const zh_CN = {
    message: {
        'common': {
            'home': '主页',
            'language': '语言',
            'createDate': '创建日期',
            'createBy': '创建人',
            'updateDate': '更新日期',
            'updateBy': '更新人',
            'edit': '编辑',
            'detail': '详情',
            'del': '删除',
            'operation': '操作',
            'remark': '备注',
            'save': '保存',
            'cancel': '取消',
            'search': '搜索',
            'selectAll': '全选',
            'status': '状态',
            'type': '类型',
            'stop': '停止',
            'rollback': '回滚',
            'enable': '启用',
            'total': '全部',
            'name': '名称',
            'enName': '英文名称',
            'displayName': '中文名称',
            'baseUrl': '基本url',
            'username': '账号名',
            'password': '密码',
            'sshKey': '密钥',
            'sshKeyPub': '公钥',
            'token': 'Token',
            'addChild': '添加下级',
            'addTop': '添加顶级',
            'add': '新增',
            'icon': '图标',
            'sort': '排序',
            'group': '分组',
            'email': '邮箱',
            'phone': '手机号',
            'refresh': '刷新',
            'endpoint': '端点/端口',
            'classify': '类别',
            'download': '下载',
            'accessToken': 'AccessToken',
            'upload': '上传',
            'light': '白天',
            'night': '夜晚',
            'back': '返回',
            'owner': '所有者',
            'manager': '管理',
            'startTime': '开始时间',
            'endTime': '结束时间',
        },
        'ci': {
            'instances': '实例',
            'cluster': '集群',
            'project': '项目名',
            'lockStatus': '项目名',
            'vcsProvider': 'vcs供应商',
            'pcmProvider': 'pcm供应商',
            'repositoryProject': '存储库项目名',
            'httpUrl': '存储库http地址',
            'sshUrl': '存储库ssh地址',
            'assetsPath': '构建包文件',
            'appInstallHome': '应用程序安装目录',
            'dependencies': '依赖',
            'dependent': '依赖',
            'branchName': '分支名',
            'pipeName': '名称',
            'pipeId': '任务Id',
            'pipeKind': '类型',
            'build': '构建',
            'env': '环境',
            'branchType': '分支类型',
            'buildCommand': '编译命令',
            'preCommand': '前置命令',
            'postCommand': '后置命令',
            'contactGroup': '联系人分组',
            'contact': '联系人',
            'custom': '自定义命令',
            'commands': '自定义编译命令',
            'trackType': '跟踪类型',
            'trackId': '跟踪id',
            'costTime': '消耗(秒)',
            'cron': 'cron表达式',
            'authType': '认证类型',
            'projectId': '项目id',
            'analyzerKind': '分析引擎',
            'assetVersion': '资产版本号',
            'assetBytes': '文件字节数',
            'assetAnalysisSize': '资产文件数量',
            'bugCollectionFile': '扫描结果文件',
            'issue': '问题',
            'annex': '附件',
            'isBoot': '是否可启',
            'pipeline': 'Pipeline',
            'priority': '优先级',
            'run': '执行',
        },
        iam: {
            'menu': '菜单',
            'contactPhone': '联系手机号',
            'address': '地址',
            'permission': '权限',
            'server': '服务',
            'principal': '账户',
            'host': '主机',
            'startTime': '开始时间',
            'lastAccessTime': '最后登录时间',
            'clientRef': '客户端',
            'authenticated': '通过认证',
            'destroy': '销毁',
            'roleCode': '角色编码',
            'role': '角色',
            'pageLocation': '页面地址',
            'routePath': '路由地址',
            'contactChannel': '联系渠道',
            'contactType': '渠道',
            'primaryAddress': 'PrimaryAddress',
        },
        scm: {
            'node': '节点',
            'namespace': '命名空间',
            'content': '内容',
            'port': '端口',
            'signature': '签名',
            'algorithm': '算法',
            'tag': '标签',
        },
        share: {
            'sshUser': 'ssh用户',
            'sshKey': 'ssh私钥',
            'sshKeyPub': 'ssh公钥',
            'timeOfFreq': '频率时间',
            'numOfFreq': '频率次数',
            'dingtalk': '钉钉',
            'wechat': '微信',
            'twitter': '推特',
            'facebook': '脸书',
            'key': 'Key',
            'label': '标签',
            'labelEn': '英文标签',
            'value': '值',
            'theme': '主题',
            'connectTest': '测试连接',
            'copy': '克隆',
            'generateSshKey': '由系统生成',
        },
        srm: {
            'level': '等级',
            'keyword': '关键字',
            'flush': 'Flush',
            'filter': '过滤',
            'include': '包含',
            'policy': '策略',
            'relativeTime': '相对时间',
            'customTime': '自定义时间',
        },
        umc: {
            'template': '模版',
            'callbackUrl': '回调地址',
            'metric': '度量',
            'alarmTime': '提醒时间',
            'alarmNote': '提醒内容',
            'gatherTime': '采集时间',
            'rule': '规则',
            'logicalOperator': '逻辑运算符',
            'aggregator': '聚合器',
            'relateOperator': '相关运算符',
            'queueTime': '排队时间',
            'alarmLevel': '提醒等级',
            'compareValue': '比较值',
            'dataSourceProvide': '数据库类型',
            'dataSourceUrl': '数据库地址',
            'dataSourceUserName': '数据库用户',
            'dataSourcePassword': '数据库密码',
            'alarmMessage': '通知消息',
            'dataSourceName': '数据库名称',
            'costTime': '消耗时间(Ms)',
        },
        doc: {
            'fileType': '文件类型',
            'description': '说明',
            'history': '历史记录',
            'compare': '历史比较',
            'share': '分享',
            'browse': '浏览',
            'shareCode': '分享编码',
            'shareTime': '分享日期',
            'expireTime': '过期时间',
            'docName': '文档名称',
            'withPasswordLink': '加密外链',
            'withNoPasswordLink': '直接外链',
            'cancelShare': '取消分享',
        },
        coss: {
            'fileSize': '文件大小',
            'prefix': '前缀',
            'cossProvider': 'Coss提供者',
            'acl': '权限',
        },
    },
    ...zhLocale
}

export default zh_CN
