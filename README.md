# IAM UI

## Quick start

- Compile installation

```bash
git clone https://github.com/wl4g/iam-ui.git # 上游最新(推荐)
# or: git clone https://gitee.com/wl4g/iam-ui.git # CN大陆最快(可能延迟)
npm install
npm run dev
npm run build
```

- Hosts configuration

```bash
vim C:\Windows\System32\drivers\etc\hosts
vim /etc/hosts
```

```bash
127.0.0.1  wl4g.debug iam
```

- Browser access: http://wl4g.debug

## Project structure

- /src Main logic source code directory
- /build Package configuration code directory
- /node_modules Dependent package directory
- /static Rely on static files

Corresponded backend project [IAM](../../../iam)
