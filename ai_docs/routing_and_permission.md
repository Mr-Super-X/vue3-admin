# 路由设计与权限控制

本项目在**“路由系统”**的设计上非常出彩与健壮，兼容了业界大部分方案并将其封装为了可配置的插件式体验。系统路由在 `src/router/` 下完成其所有拦截和初始化。

## 1. 静态与动态混合获取机制

由于后台管理界面的复杂性，`vue3-admin` 将路由分解为两部分：
- **公共无权限路由**（如登陆的 `/login`、错误页面的 `/404` 或 `/401`）直接在基础路由的配置下挂载。
- **动态业务路由片段**：利用 Webpack 的 `require.context('@/views/modules', true, /\/routes\.ts|.js$/)` 函数。自动搜刮所有的业务目录中的路由定义汇总为 `dynamicRoutes.ts`，以便作为基础路由树节点备用。

## 2. Token 白名单与 Debug 环境拦截

所有的页面跳转都经由 `src/router/index.ts` 中的 `router.beforeEach`：
1. **获取 Token 检查**：
   - 存在 Token：正常准入。如试图重新进 `/login` 则强推到 `/home`。如果在跳转过程时，发现内存中没有加载好的菜单数据（比如由于刷新导致 Pinia 初始化），则启动重建“路由菜单树”阶段。
   - 不存在 Token：
     - 如果目标处于白名单内（如忘记密码、登录等），可放行。如果是 `npm run serve:debug` 启动的环境，会额外放开白名单，所有页面都能在无 Token 时预览。
     - 如果不属于白名单，强行切回 `/login`，并携带回调参数供重登陆后跳转。

## 3. 灵活的双模路由控制：后端管控 VS 前端管控

如何将能够访问的路由加载进系统？系统将方案切分为前端/后端生成模式（由 `themeConfig` 中的 `isRequestRoutes` 开关进行控制）：

### 模式 A: 前端控制路由 (`src/router/frontend.ts`)
直接利用前端通过 `require.context` 加载到的一维数组转换成 Tree 后存入 Pinia 的 Store，页面就加载完整的侧边栏并允许所有 `src/views/modules` 定义页面的访问。

### 模式 B: 后台控制路由 (`src/router/backend.ts`)
最严谨的中后台方案（类似 RBAC 控制）：
1. 先发请求到 `/route/menu` 获取当权登录用户可浏览的菜单结构集合（Mock 环境返回假数据）。
2. 调用 `transformMenuTreeToRoutes`。将后端拿到的精简菜单列表在前端的 `dynamicRoutes.ts` 全集里遍历匹配查找。只有后端允许的路径，前端的完整 Component 和 Meta 约束才会绑定上去。
3. 利用 `routesSort` 方法，根据后端传回的 `sort` 字段为匹配到的真实菜单进行排列组合展示。
4. 调用 Vue Router 最新的 `router.addRoute` 语法 API 对目标 `Layout` 层执行动态追加与渲染。

这种精细的分离方式让本项目不管面对轻量级业务还是高度数据保密的政企中台业务具有超前的适应能力。
