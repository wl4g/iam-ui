import { cache } from "../utils";
// https://blog.csdn.net/mrliucx/article/details/105585202
// import { request } from "express";

// 微服务架构下多应用集群基础配置定义。
export default {
    // 因为IAM接口特殊(登录时就需要地址)
    iam: {
        // e.g. http://127.0.0.1:14040/iam-server
        // e.g. http://localhost:14040/iam-server
        // e.g. http://iam.wl4g.debug/iam-server
        //baseUri: "http://localhost:14040/iam-server",
        cluster: 'iam-server',
        defaultTwoDomain: 'iam',
        defaultContextPath: '/iam-server',
        defaultServerPort: '14040',
    },
    // 以下其他应用默认配置属性已弃用并删除(具体地址等值统一仅从store缓存中获取.)。
    ci: {
        cluster: 'ci-server',
    },
    scm: {
        cluster: 'scm-server',
    },
    umc: {
        cluster: 'umc-manager',
    },
    erm: {
        cluster: 'erm-manager',
    },
    doc: {
        cluster: 'doc-manager',
    },
    coss: {
        cluster: 'coss-manager',
    },
    vcs: {
        cluster: 'vcs-manager',
    },
    gw: {
        cluster: 'gateway-manager',
    },
    dts: {
        cluster: 'dts-manager',
    },
    getBaseUrl: function (sysModule) {
        if (!sysModule) { return null; }

        let baseUri = null;
        // Extract baseUri from store.
        let sysModuleCache = cache.get("iamSysModules");
        if (sysModuleCache && sysModuleCache[sysModule.cluster] && sysModuleCache[sysModule.cluster]['extranetBaseUri']) {
            baseUri = sysModuleCache[sysModule.cluster]['extranetBaseUri'];
        }
        // If it is an IAM app, fallback get.
        else if (sysModule.cluster == this.iam.cluster) {
            baseUri = new IAMCore(this.iam).getIamBaseUri();
        } else {
            console.error("Cannot get baseUri from store, No such sysModule: " + sysModule);
        }
        console.debug("Got sysModule baseUri: ", baseUri);
        return baseUri;
    },

}
