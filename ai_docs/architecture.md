# 项目架构与核心设计

该系统采用 Vue3 的 Composition API 风格搭配 TypeScript 强类型系统为核心。通过 Webpack (vue-cli-service) 作为底层构建支持。

## 1. 核心技术栈概览

- **渐进式框架**: Vue 3.3.4
- **静态类型检测**: TypeScript 5.0.4
- **构建工具**: Webpack 5.85 (通过 Vue cli 5 版本封装处理)
- **UI 框架**: Element Plus 2.3.5
- **状态管理**: Pinia 2.1.3
- **路由控制**: Vue Router 4.2.2
- **网络请求**: Axios 1.4.0

## 2. 核心目录结构解读

```text
vue3-admin/
├── mock/                  # 本地 Mock 数据支持
├── src/
│   ├── assets/            # 静态资源（图片、全局 scss 样式、需要作为 sprite 切割的 svg icon）
│   ├── components/        # 全局公共组件
│   ├── constant/          # 常量定义管理（缓存 key、store key）
│   ├── directives/        # 自定义 Vue 指令
│   ├── layout/            # 中后台界面的核心骨架容器 (侧边菜单/头部导航/TagsView 等)
│   ├── plugins/           # 外部插件注册入口
│   ├── request/           # 网络请求方法、Axios拦截器
│   ├── router/            # 前端路由控制中心（逻辑最庞大）
│   ├── store/             # 状态库（Pinia modules 拆分）
│   ├── theme/             # 自定义系统主题的切换相关控制 SCSS
│   ├── types/             # TypeScript 全局接口定义
│   ├── utils/             # 工具函数集
│   ├── views/             # 页面级视图 (所有的业务模块与公用模块如401,404,Welcome)
│   ├── App.vue            # 根组件
│   └── main.ts            # Vue 实例主入口
├── vue.config.js          # Webpack 高级配置与各项编译优化
└── package.json           # 项目清单信息及脚本
```

## 3. 核心设计说明

### 3.1 Webpack 优化构建 (`vue.config.js`)
项目极大避免了手动全局引用组件。利用 `unplugin-vue-components`、`unplugin-auto-import` 插件全自动按需导入了 Element Plus 组件以及对应样式。配置中专门处理了 SVG 提取（`svg-sprite-loader`）做为系统菜单或业务图标展示用。

### 3.2 网络请求层整合 (`src/request/`)
提供了一个高度规范化的请求外壳：
1. **`axiosConfig.ts`**：定义 baseURL，负责请求头部（附带 Token 等），提供 401/404/500 等公共网络状态报错并弹出 Toast。
2. **`methods.ts`**：将 `get`, `post`, `put`, `patch`, `delete` 等操作再度高度封装，并应用了名为 `windowIt` 的拦截或防抖包装设计来避免特定问题（比如高频防止按钮重复发送请求等）。

### 3.3 Pinia 状态管理 (`src/store/`)
目前系统将全局状态切分为各类 Domain-modules，主要在用的有：
- **`themeConfig.ts`**：承载整个控制台系统的主题、颜色、布局形式（暗色、左右分栏、开启缓存Tags等）的几十种控制配置。
- **`route.ts`** / **`tagsViewRoutes.ts`**：存放目前应用已被允许的页面结构树以及用户打开了哪些顶部页签（记录给组件实现keep-alive缓存特性）。
