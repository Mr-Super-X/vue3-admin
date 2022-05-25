[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# vue3-admin

## 简介

[vue3-admin](https://vue3-admin-beta.vercel.app/#/home)是一个后台前端解决方案，基于[Vue3](https://v3.cn.vuejs.org/) + [Element-plus](https://element-plus.gitee.io/zh-CN/) + [Webpack5](https://www.webpackjs.com/concepts/) + [Typescript](https://www.tslang.cn/) + [Axios](http://www.axios-js.com/zh-cn/docs/)搭建。


## 在线预览

- [demo](https://vue3-admin-beta.vercel.app/#/home)


## 功能

```
- 多环境发布
  - development
  - test
  - production

- 全局功能
  - 支持eslint，使用standard规范
  - 支持githooks（vue-cli创建项目默认安装yorkie）
  - 支持lint-staged
  - 支持mock功能
  - 支持commitizen
  - 支持commitlint
  - 支持release-it
  - 支持auto-changelog
  - 支持时间窗口内的重复请求过滤
```


## 开发

```bash
# 克隆项目
git clone https://github.com/Mr-Super-X/vue3-admin.git
# 进入项目目录
cd vue3-admin
# 安装依赖
npm install
# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
# 启动服务
npm run dev
```


## npm scripts说明（以下命令使用npm run或yarn均可）
```bash
# 启动项目
yarn serve
yarn dev

# 启动项目并在浏览器中打开页面
yarn serve:open
yarn dev:open

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

# 运行release-it配置
yarn release

# 运行release-it配置并列出release-it详细运行步骤
yarn release:detail
```

yarn commit命令运行效果如下：
![img](https://github.com/Mr-Super-X/assets-resouece/blob/main/images/1653480834.jpg)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022, Mr.Mikey
