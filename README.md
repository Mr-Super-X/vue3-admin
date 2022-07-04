[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# vue3-admin

## 简介

[vue3-admin](https://vue3-admin-beta.vercel.app/#/home)是一个后台前端解决方案，基于[Vue3](https://v3.cn.vuejs.org/) + [Element-plus](https://element-plus.gitee.io/zh-CN/) + [Webpack5](https://www.webpackjs.com/concepts/) + [Typescript](https://www.tslang.cn/) + [Pinia](https://pinia.web3doc.top/) + [Axios](http://www.axios-js.com/zh-cn/docs/) + [Scss](https://www.sass.hk/)搭建。使用[EditorConfig](https://editorconfig.org) + [Prettier](https://www.prettier.cn/) + [ESLint](http://eslint.cn/)搭建项目中统一的代码风格，使用[commitizen](https://github.com/commitizen) + [lint-staged](https://github.com/okonet/lint-staged) + [commitlint](https://github.com/conventional-changelog/commitlint)统一代码提交规范，支持[release-it](https://github.com/release-it/release-it)自动化发布符合[Semantic Versioning](https://semver.org/)规范的版本，自动生成[changelog](https://github.com/release-it/release-it/blob/master/docs/changelog.md)文档等功能。


## 在线预览

- [在线demo演示](https://vue3-admin-beta.vercel.app/#/home)


## 开发

```bash
# 克隆项目
git clone https://github.com/Mr-Super-X/vue3-admin.git
# 进入项目目录
cd vue3-admin
# 安装依赖（推荐使用pnpm，好处就不说了，如果githook没有触发，请执行一次npm install）
npm install
# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
# 也可以使用nrm设置淘宝源再安装
npm install nrm -g
nrm use taobao
npm install
# 启动服务
yarn dev
```


## 功能

```
- 多环境构建
  - development
  - debug
  - mock
  - test
  - production

- 全局功能
  - 支持githooks（vue-cli创建项目默认安装yorkie，比husky使用更简单）
  - 支持pre-commit自动执行prettier统一代码格式
  - 支持eslint，使用standard规范，支持pre-commit自动进行eslint修复
  - 支持lint-staged只对commit的文件做lint校验
  - 支持mock功能
  - 支持commitizen，可在终端选择符合Angular规范的提交信息（可自定义汉化）
  - 支持commitlint，使用git commit命令也会触发commit校验
  - 支持release-it自动化发布符合Semantic Versioning规范的版本
  - 支持auto-changelog，自动生成changelog文档

- 请求
  - 支持时间窗口内的重复请求过滤
  - 支持错误拦截

- 路由
  - 支持路由拦截
  - 支持路由白名单
```

### 目录结构

```
vue3-admin
├─ mock                    # mock服务
├─ public                  # 静态资源
├─ src                     # 源码
│  ├─ assets               # 媒体资源（图片、样式、icon、medio等）
│  ├─ components           # 公共组件
│  ├─ directives           # 全局指令
│  ├─ layout               # 全局Layout
│  ├─ request              # 接口请求
│  ├─ router               # 路由管理
│  ├─ store                # store管理
│  ├─ utils                # 全局公共方法
│  ├─ views                # 所有业务页面
│  ├─ App.vue              # 页面入口
│  ├─ main.ts              # 项目入口文件
│  └─ shims-vue.d.ts       # vue-cli自动生成 为ts做的适配文件
├─ tests                   # 单元测试
├─ .browserslistrc         # browserslist配置
├─ .commitlintrc.js        # commitlint配置
├─ .cz-config.js           # cz-customizable配置
├─ .editorconfig           # editorconfig配置
├─ .env.debug              # debug环境
├─ .env.development        # 开发环境
├─ .env.mock               # mock环境
├─ .env.production         # 生产环境
├─ .env.test               # 测试环境
├─ .eslintrc.js            # eslint配置
├─ .gitignore              # 忽略git提交配置
├─ .prettierrc.js          # prettier配置
├─ .release-it.json        # release-it配置
├─ auto-imports.d.ts       # element-plus按需引入插件自动生成文件
├─ babel.config.js         # babel配置
├─ CHANGELOG.md            # changelog文档，由release-it配置auto-changelog自动生成
├─ components.d.ts         # element-plus按需引入插件自动生成文件
├─ jest.config.js          # jest单测配置
├─ LICENSE                 # 开源协议
├─ lint-staged.config.js   # lint-staged配置
├─ package-lock.json       # 版本锁定文件
├─ package.json            # 项目依赖
├─ README.md               # 项目说明文档
├─ tsconfig.json           # ts配置
├─ vue.config.js           # vue-cli 配置
└─ yarn.lock               # 版本锁定文件
```

## 视图结构说明

1. 所有的视图都放在views目录中，对应的模块视图放在views/modules/模块文件夹
2. ts类型在types目录中新建xxx.d.ts文件进行管理
3. 当前页面的UI组件放在当前目录下的components目录中管理
4. 当前页面的api请求在apis.ts中管理
5. 当前页面的路由信息在routes.ts中管理
6. 当前页面的静态数据或常量在configs.ts中管理
7. 当前页面的一些工具方法或脚本函数在scripts.ts中管理

整体采用Domain Style工程范式，专注于横向的功能拆分和扩展，视图结构遵循如下规范：
```
home                      # 首页文件夹
├─ components             # 首页UI组件文件夹
├─ types                  # 首页TS类型配置
├─ apis.ts                # 首页请求接口配置
├─ configs.ts             # 首页静态常量配置
├─ index.vue              # 首页入口vue文件
├─ routes.ts              # 首页路由配置
└─ scripts.ts             # 首页其他脚本函数配置
```

## npm scripts说明（以下命令使用npm run或yarn均可）
```bash
# 启动项目
yarn serve
yarn dev

# 启动项目并在浏览器中打开页面
yarn serve:open
yarn dev:open

# 启动项目（绕过权限拦截，目前支持绕过路由拦截）
yarn serve:debug
yarn dev:debug

# 启动开发环境并且开启mock模式
yarn serve:mock
yarn dev:mock

# 生成打包资源分析页面并启动一个静态服务
yarn report

# 构建开发环境
yarn build:dev

# 构建测试环境
yarn build:test

# 构建生产环境
yarn build

# 构建生产环境并启动一个静态服务，可预览构建好的页面
yarn build:preview

# 运行单元测试
yarn test:unit

# 运行eslint检查
yarn lint

# 运行eslint检查并自动修复
yarn lint:fix

# 运行commitizen在终端选择Angular规范的提交类型
yarn commit

# 运行release-it配置，自动化发布Semantic规范版本和自动生成changelog文件
yarn release

# 运行release-it配置并列出release-it详细运行步骤
yarn release:detail
```

yarn commit命令运行效果如下：
![img](https://github.com/Mr-Super-X/assets-resouece/blob/main/images/1653480834.jpg)


## 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| last 2 versions                                             | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | 


## 附上一份git指南
包含git日常使用的详细操作命令，需要自取

[git指南png文件](git_doc.png)

[git指南xmind文件](git_doc.xmind)


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022, Mr.Mikey
