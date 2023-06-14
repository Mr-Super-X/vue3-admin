import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import whitelist from './whitelist'
import noNeedPermissionRouteNamesConfig from './noNeedPermissionRouteNamesConfig'
import pinia from '@store/index'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useRouteStore } from '@store/modules/route'
import { useThemeConfig } from '@store/modules/themeConfig'
import { storeToRefs } from 'pinia'
import { fullScreenRoutes, topRoutes, notFoundAndNoPowerRoutes } from './routerConfig'
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

// 白名单功能，默认不做校验的列表如下
const filterRoutes: Array<string | RouteRecordName> = [...noNeedPermissionRouteNamesConfig]
// 调试模式下把路由白名单列表添加进去
// 绕过路由权限拦截
if (isDebug) {
  filterRoutes.push(...whitelist)
}

// 全局钩子，可以在这里做校验（登录鉴权）
router.beforeEach(async (to, from, next) => {
  // 开启顶部加载进度条
  Nprogress.start()

  // 获取token
  const token = getToken() // 以token作为示例

  // 有token的处理分支
  if (token) {
    // token存在的情况下可能会跳登录页也可能会跳别的页面，对这部分逻辑进行处理
    // token存在的时候跳转登录页，重定向到首页
    if (to.path === '/login') {
      next('/home')
    } else {
      // 为防止刷新页面导致数据丢失，这里去查找缓存中有没有菜单数据，如果没有数据，
      // 无论此时是前端控制路由还是后端控制路由都说明数据丢失了，要重新获取数据
      const routeStore = useRouteStore(pinia)
      const { routesTree } = storeToRefs(routeStore)
      if (routesTree.value.length === 0) {
        if (isRequestRoutes) {
          // 后端控制路由
          await initBackendControlRoutes()
          // 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
          next({ ...to })
        } else {
          // 前端控制路由
          // 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
          await initFrontendControlRoutes()
          next({ ...to })
        }
      } else {
        next()
      }
    }
  } else {
    // 无token的处理分支
    // 获取当前跳转的路由name
    const routeName: RouteRecordName = to.name
    // 白名单路由直接跳转即可
    if (filterRoutes.includes(routeName)) {
      next()
    } else {
      // token不存在也不是白名单，则直接重定向到登录，并清除缓存
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
      // TODO 清除所有缓存
      // system.clear()
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
