/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
import user from './user/'
import system from './system/'
import scm from './scm/'
import historic from './historic/'
import track from './track/'
import ci from './ci/'
import umc from './umc/'
import erm from './erm/'
import iam from './iam/'
import doc from './doc/'
import coss from './coss/'
import vcs from './vcs/'
import gw from './gw/'
import dts from './dts/'

export default [
    {
        module: 'user',
        name: '用户管理',
        list: user
    }, {
        module: 'system',
        name: '系统设置',
        list: system
    }, {
        module: 'scm',
        name: '版本管理',
        list: scm
    }, {
        module: 'historic',
        name: '版本管理',
        list: historic
    }, {
        module: 'track',
        name: '版本管理',
        list: track
    }, {
        module: 'ci',
        name: '部署管理',
        list: ci
    }, {
        module: 'umc',
        name: '部署管理',
        list: umc
    }, {
        module: 'erm',
        name: '公共管理',
        list: erm
    }, {
        module: 'iam',
        name: '权限管理',
        list: iam
    }, {
        module: 'doc',
        name: '文档管理',
        list: doc
    }, {
        module: 'coss',
        name: '文件系统',
        list: coss
    }, {
        module: 'vcs',
        name: '文件系统',
        list: vcs
    }, {
        module: 'gw',
        name: '文件系统',
        list: gw
    }, {
        module: 'dts',
        name: '开发者套件',
        list: dts
    }
]
