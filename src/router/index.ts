import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import whitelist from './whitelist'
import noNeedPermissionRouteNamesConfig from './noNeedPermissionRouteNamesConfig'
import pinia from '@store/index'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useRouteStore } from '@store/modules/route'
import { useThemeConfig } from '@store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { fullScreenRoutes, topRoutes } from './routerConfig'
import { getToken, verifyENV } from '../utils/index'
import { RouteRecordName } from 'vue-router'
import { initFrontendControlRoutes } from './frontend'
import { initBackendControlRoutes } from './backend'

/**
 * 读取 `/src/store/modules/themeConfig.ts` 是否开启后端控制路由配置
 * 1、前端控制路由时：isRequestRoutes 为 false
 * 2、后端控制路由时：isRequestRoutes 为 true
 * 相关方法已拆解到对应的 `backend.ts` 与 `frontend.ts`（它们互不影响，不需要同时改 2 个文件）
 */
const storesThemeConfig = useThemeConfig(pinia)
const { themeConfig } = storeToRefs(storesThemeConfig)
const { isRequestRoutes } = themeConfig.value

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...fullScreenRoutes, ...topRoutes],
})

// 验证是否debug环境
const isDebug = verifyENV('debug')

// 不用校验的路由，默认不做校验的列表如下
const filterRoutes: Array<string | RouteRecordName> = [...noNeedPermissionRouteNamesConfig]
// 调试模式下把路由白名单列表添加进去
// 绕过路由权限拦截
if (isDebug) {
  filterRoutes.push(...whitelist)
}

// 全局钩子，可以在这里做校验（登录鉴权）
router.beforeEach(async (to, from, next) => {
  Nprogress.start()
  // 获取当前跳转的路由name
  const routeName: RouteRecordName = to.name
  // 不用校验的路由直接跳转即可
  if (filterRoutes.includes(routeName)) {
    next()
    return
  }

  // 以下是需要校验的逻辑
  // 获取权限
  const token = getToken() // 以token作为示例

  // token不存在时，重定向到登录页
  if (!token) {
    next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
    // TODO 清除所有缓存
    // system.clear()
    return
  }

  // token存在的情况下可能会跳登录页也可能会跳别的页面，对这部分逻辑进行处理
  // token存在的时候跳转登录页，重定向到首页（注意这部分逻辑优先级低于白名单）
  if (to.path === '/login') {
    next('/home')
    return
  }

  // 为防止刷新页面数据丢失，这里去查找缓存中有没有菜单数据，如果没有数据，
  // 无论此时是前端控制路由还是后端控制路由都说明数据丢失了，要重新获取数据并将数据存入缓存中
  const routeStore = useRouteStore(pinia)
  const { routesList } = storeToRefs(routeStore)
  if (routesList.value.length === 0) {
    if (isRequestRoutes) {
      // 后端控制路由
      await initBackendControlRoutes()
      // 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
      next({ path: to.path, query: to.query })
    } else {
      // 前端控制路由
      // 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
      await initFrontendControlRoutes()
      next({ path: to.path, query: to.query })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
