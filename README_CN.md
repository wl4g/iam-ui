# IAM UI

## 快速开始

- 编译安装

```bash
git clone https://github.com/wl4g/iam-ui.git # 上游最新(推荐)
# git clone https://gitee.com/wl4g/iam-ui.git # CN大陆最快(可能延迟)
npm config set registry https://registry.npm.taobao.org
npm install express
npm install --force
sudo npm run dev
npm run build
```

- 配置 hosts

```bash
vim C:\Windows\System32\drivers\etc\hosts
vim /etc/hosts
```

```bash
127.0.0.1  wl4g.debug
```

- 浏览器访问: http://wl4g.debug

## 项目结构

- /src 主要编辑代码
- /build 打包配置代码
- /node_modules 依赖包文件夹
- /static 某些静态文件
- /config 生产环境和开发环境下的配置
- /config/index.js 可配置开发环境的端口,代理地址等

对应后端项目 [IAM](../../../iam)
