import type { RouteRecordRaw } from 'vue-router'
import dynamicRoutes from './dynamicRoutes' // 引入动态路由
import pinia from '@store/index'
import { router } from './index'
import { topRoutes, notFoundAndNoPowerRoutes } from './routerConfig'
import { useRouteStore } from '@store/modules/route'
import { deepClone } from '@/utils/common'

/**
 * 前端控制路由菜单
 */
export async function initFrontendControlRoutes() {
  // TODO 1、同步获取用户信息，将用户信息存入pinia
  // TODO 2、查看用户信息中是否有登录权限
  // 3、调用router.addRoute动态添加路由
  await setAddRoute()
  // 4、将路由存入pinia routesList中，刷新页面时直接拿store中的数据来进行判断数据是否丢失，丢失后重新获取
  await saveRoutesToStore()

  // 5、无权限时返回true
  return false
}

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 调用方法处理顶级路由，已经是嵌套好的结构，然后通过addRoute动态添加路由
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
  // 获取路由
  const routes = await generateRoutes()
  // 添加路由
  routes.forEach((route: RouteRecordRaw) => {
    router.addRoute(route)
  })
}

/**
 * 生成路由数据
 * @description 将动态路由 dynamicRoutes（@router/dynamicRoutes）和404、401等页面设置到顶层路由中
 * @returns 返回替换后的路由数组
 */
export async function generateRoutes() {
  // 将所有的动态路由添加到顶层路由的children中
  const routes = deepClone(topRoutes) as any[]
  // notFoundAndNoPowerRoutes也要放进去，防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
  routes[0].children = [...routes[0].children, ...notFoundAndNoPowerRoutes, ...dynamicRoutes]
  return routes
}

/**
 * 保存路由数据到pinia中
 */
export async function saveRoutesToStore() {
  const routes = await generateRoutes()
  const routeStore = useRouteStore(pinia)
  routeStore.setRoutesList(routes)
}
