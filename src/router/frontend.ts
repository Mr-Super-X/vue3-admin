import dynamicRoutes from './dynamicRoutes' // 引入动态路由
import pinia from '@store/index'
import { useRouteStore } from '@store/modules/route'
import { buildRoutesToTree } from '@utils/route'

/**
 * 前端控制路由菜单
 */
export async function initFrontendControlRoutes() {
  // TODO 1、同步获取用户信息，将用户信息存入pinia
  // TODO 2、查看用户信息中是否有登录权限
  // 3、将路由存入pinia routesList中，刷新页面时直接拿store中的数据来进行判断数据是否丢失，丢失后重新获取
  await saveRoutesToStore()

  // 4、无权限时返回true
  return false
}

/**
 * 保存路由数据到pinia中（只保存dynamicRoutes即可，只有动态数据会被渲染到菜单上）
 * @description 保存的数据在这里被处理为tree结构，主要用于菜单功能
 */
export async function saveRoutesToStore() {
  const routes = buildRoutesToTree(dynamicRoutes)
  const routeStore = useRouteStore(pinia)
  // 保存完整数据
  routeStore.setRoutesTree(routes)
  // 保存过滤掉meta.isHide为true的数据
  routeStore.setFilterHideRoutesTree(routes)
}
