# vue-router 说明

## 目录文件说明

```
src/router

├─ router                  # 路由模块 
│  ├─ backend.ts           # 由后端控制路由的配置文件
│  ├─ frontend.ts          # 由前端控制路由的配置文件
│  ├─ dynamicRoutes.ts     # 自动引入路由模块的配置文件
│  ├─ index.ts             # 路由入口文件（拦截器、权限控制等）
│  ├─ noNeedPowerConfig.ts # 不需要鉴权的路由name配置文件
│  ├─ routerConfig.ts      # 静态路由配置文件（layout、login、404、common等）
│  ├─ whitelist.ts         # 白名单配置文件
│  └─ common.ts            # 公共函数
```


## 路由模块架构说明

架构一个后台管理系统的路由，可简单分以下几条线路：

1. 需要权限的页面和不需要权限的页面
2. 全屏的页面和放在layout视图中的页面
3. 前端控制路由和后端控制路由

因此我拆分不同文件来分别管理这些功能，这些功能都在 **index.ts** 中完成。

- 对于第一点，功能被拆分为 **noNeedPowerConfig.ts** 和 **whitelist.ts** 两个文件，这两个文件中配置的值均为**路由name**，noNeedPowerConfig.ts中添加的路由name对打包也就是**生产环境也会生效**，而whitelist中的配置只在`npm run dev:debug`模式下生效，默认在debug模式下会将layout视图下所有的路由都引入（这一步是自动完成的，后面会说明）
- 对于第二点，**routerConfig.ts** 中可以查看相应的配置，在这个文件中会将不同属性的路由分开配置，createRouter时会将全屏视图配置和layout视图配置加入其中
- 对于第三点，功能被拆分为 **backend.ts** 和 **frontend.ts** 两个文件，系统默认使用前端控制路由的方式，如需修改为后端控制，请修改`store/modules/themeConfig.ts`中的**isRequestRoutes**为**true**


## 自动注入路由功能说明

在webpack中，借助了 `require.context` 这个api，vite中也有相应的plugin可以实现，如：vite-plugin-require-context 。

自动引入路由功能放在了 **dynamicRoutes.ts** 中，会将 `src/views/modules/` 目录中所有的 **routes.ts** 文件引入，这一步是递归的（每一层目录只要配置了routes.ts均生效），因此每创建一个页面，都应该遵循**Domain Style工程范式**，专注于横向的功能拆分和扩展，视图结构遵循如下规范：
```
home                      # 首页文件夹
├─ components             # 首页UI组件文件夹
├─ styles                 # 首页样式文件夹
├─ types                  # 首页TS类型配置
├─ apis.ts                # 首页请求接口配置
├─ configs.ts             # 首页静态常量配置
├─ index.vue              # 首页入口vue文件
├─ routes.ts              # 首页路由配置
└─ scripts.ts             # 首页其他脚本函数配置
```

这里给出一个routes.ts配置示例：

```javascript
// 导出当前页面的路由配置
export default [
  {
    path: '/order', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'order', // 路由组件名称
    redirect: '/order/list',
    component: () => import(/* webpackChunkName: "order" */ '@layout/components/VRouterView.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单管理', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
```

该文件最终会输出一个由routes配置组成的**一维数组**，然后被注入到layout视图中。输出格式如：

```javascript
[
  {
    path: '/home', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'home', // 路由组件名称
    component: () => import(/* webpackChunkName: "home" */ '@views/home/index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '首页', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
  {
    path: '/order', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'order', // 路由组件名称
    redirect: '/order/list',
    component: () => import(/* webpackChunkName: "order" */ '@layout/components/VRouterView.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单管理', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
  {
    path: '/order/list', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'orderList', // 路由组件名称
    component: () => import(/* webpackChunkName: "orderList" */ '@views/order/orderList/index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单列表', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },

  // 其它数据......
]
```


#### 为什么是一维数组而不是树结构？

原因是**任何时候都只能有一个活跃组件实例作为keep-alive的直接子节点**，而我们的系统将keep-alive组件放在layout视图的VRouterView组件中，这种二级路由缓存是没有问题的，而超过二级的中间路由层级再嵌套keep-alive缓存也没有太大意义（缓存二级路由意味着二级路由下的所有嵌套组件都将被缓存，对性能也有一定保障），这也是将layout.children下的动态路由设计为一维数组的主要原因。

> 由于keep-alive是通过组件的name作为key来进行缓存的，一旦层级嵌套过深复杂度也会随之提高，没有办法完全保证嵌套层级的组件name不重复。

https://cn.vuejs.org/api/built-in-components.html#keepalive
https://cn.vuejs.org/guide/built-ins/keep-alive.html


#### 一维数组怎么渲染左侧树形菜单？

在 **backend.ts** 和 **frontend.ts** 两个文件中，会将最终得到的动态路由数据dynamicRoutes存入store中，存入的数据经过 **common.ts** 中的 **buildRoutesToTree** 方法处理成了树，**处理层级的规则是以路由的path来实现的，因此在routes.ts配置中，你必须以path来作为层级区分**。

假设现在有个订单模块，内部有订单列表、订单信息两个页面，那么目录结构应该如下：


```
views/modules/order

├─ routes.ts               # 订单模块路由配置
├─ orderList               # 订单列表目录
│  ├─ routes.ts            # 订单列表路由配置
│  └─ 其他文件目录          
├─ orderInfo               # 订单信息目录
│  ├─ routes.ts            # 订单信息路由配置
│  └─ 其他文件目录          
```

views/modules/order/routes.ts

```javascript
// 导出当前页面的路由配置
export default [
  {
    path: '/order', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'order', // 路由组件名称
    redirect: '/order/list',
    // 目录菜单应该用VRouterView这个组件来渲染子视图
    component: () => import(/* webpackChunkName: "order" */ '@layout/components/VRouterView.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单管理', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
```

views/modules/order/orderList/routes.ts

```javascript
// 导出当前页面的路由配置
export default [
  {
    path: '/order/list', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'orderList', // 路由组件名称
    component: () => import(/* webpackChunkName: "orderList" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单列表', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
```

views/modules/order/orderInfo/routes.ts

```javascript
// 导出当前页面的路由配置
export default [
  {
    path: '/order/orderInfo', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'orderInfo', // 路由组件名称
    component: () => import(/* webpackChunkName: "orderDetail" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单信息', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
```