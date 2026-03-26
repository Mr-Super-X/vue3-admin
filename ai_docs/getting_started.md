# 快速开始与启动流程

本指南将协助开发人员准备项目所需的开发环境，理解各项配置含义，并成功运行与打包项目。

## 1. 环境依赖要求

在克隆代码前，请确保您的计算机上已经安装了满足以下版本的环境（项目通过 `check-node-version.mjs` 和 `package.json` 中的 `engines` 字段进行了锁定）：

- **Node.js**: `>= 16.0.0`
- **npm**: `>= 7.0.0` （由于涉及 `vue-cli-service` 等包锁定策略，优先推荐使用原生npm）

## 2. 安装依赖包

```bash
# 推荐使用 npm 安装
npm install
```
*提示：安装完成后，`postinstall` 钩子会自动触发执行 Node 版本兼容性检查。*

## 3. Scripts 启动与构建脚本

在 `package.json` 中配置了一系列便捷的指令帮助开发和发布，你可以在终端中运行：

### 开发环境启动

- `npm run serve` （或 `npm run dev`）：启动基础开发环境（基于 `.env.development`）。
- `npm run serve:open` （或 `npm run dev:open`）：启动项目后自动在浏览器打开。
- `npm run serve:mock` （或 `npm run dev:mock`）：启动 **Mock 模式**开发。此模式下，所有接口请求被本地的 Mock.js 接管，无需连接后端。
- `npm run serve:debug` （或 `npm run dev:debug`）：启动 **Debug 模式**。该模式下放开所有路由拦截权限（绕开白名单），方便纯粹的前端调试交互。

### 生产环境构建

- `npm run build`：执行标准的生产环境构建（读取 `.env.production`），输出于 `/dist` 目录。
- `npm run build:test`：执行测试环境构建（读取 `.env.test`）。
- `npm run build:dev`：针对开发环境参数进行的打包。
- `npm run report`：打包的同时生成各依赖包的体积分析报告。

## 4. 多环境变量配置（.env）

项目根目录包含多个基础 `.env.*` 文件用来区分加载项：

- **.env.development**
  - Node & VUE_APP_ENV: `development`
  - VUE_APP_API_PATH: 实际后端 API 联调路径
- **.env.production**
  - Node & VUE_APP_ENV: `production`
  - VUE_APP_API_PATH: 生产环境部署后接口前缀
- **.env.mock**
  - Node 仍是开发环境，但 `VUE_APP_ENV='mock'`，入口 `main.ts` 会据此判断并导入 `import { mockXHR } from '../mock'` 将所有的请求映射到本地。
- **.env.debug**
  - 被设置为 `debug` 后，前端在 `router/index.ts` 把所有配置全部放入允许白名单。
- **.env.test**
  - 为测试打包准备。

如需要更改启动端口与代理等配置，可以修改根目录下的 `vue.config.js` 中的 `devServer` 选项。