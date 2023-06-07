import type { RouteRecordRaw } from 'vue-router'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import dynamicRoutes from './dynamicRoutes' // 引入动态路由
import pinia from '@store/index'
import { router } from './index'
import { topRoutes, notFoundAndNoPowerRoutes } from './routerConfig'
import { useRouteStore } from '@store/modules/route'
import { deepClone } from '@/utils/common'
import { get } from '@/request/methods'

/**
 * 后端控制路由菜单
 * @description 思路与前端控制路由差不多，不同的是会拿后端接口的真实数据和本地数据进行比对，然后生成新的路由
 * @returns Boolean 方法调用后会返回一个有无登录权限的bool值
 */
export async function initBackendControlRoutes() {
  // TODO 1、同步获取用户信息，将用户信息存入pinia
  // TODO 2、查看用户信息中是否有登录权限
  // 3、获取路由菜单数据，比对后生成新的路由数据
  const result = await getRoutesAndResetRoutes()
  // 4、调用router.addRoute动态添加路由
  await setAddRoute(result)
  // 5、将路由存入pinia routesList中，刷新页面时直接拿store中的数据来进行判断数据是否丢失，丢失后重新获取
  await saveRoutesToStore(result)

  // 6、无权限时返回true
  return false
}

/**
 * 请求接口数据跟本地数据比对后生成新路由
 * @returns 返回比对后的新路由数据
 */
export async function getRoutesAndResetRoutes() {
  // 获取接口数据
  const menu = await getBackendControlRoutes()
  // 通过比对得到新的路由数据
  const routes = await transformMenuTreeToRoutes(menu, dynamicRoutes)

  // 返回新路由
  return routes
}

/**
 * 获取菜单接口
 * @param params object 请求参数对象 非必传
 * @param config object 配置覆盖对象，AxiosRequestConfig 非必传
 * @returns Promise
 */
export function getMenu(params?: object, config?: AxiosRequestConfig): Promise<any> {
  return get('/route/menu', params, config).then((res: AxiosResponse) => res?.data?.data)
}

/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export function getBackendControlRoutes() {
  // 这里暂时使用mock数据（'@mock/modules/route'），请运行 npm run dev:mock 查看效果
  // 真实环境请更换真实接口
  return getMenu().then(res => res.list)
}

/**
 * 将请求回来的菜单与本地路由表匹配转换成菜单
 * @param menu 请求回来的菜单
 * @param routes 本地路由
 * @returns [] 处理好的菜单
 */
function transformMenuTreeToRoutes(menu, routes) {
  const result = [] // 要返回的数据格式

  // 遍历本地路由和接口返回的菜单
  routes.forEach(route => {
    let routeItem = {} as { children: any[] }
    menu.forEach(mItem => {
      // 找到本地路由和接口菜单路径相同的项
      if (route.path === mItem.path) {
        // 将本地路由配置拷贝到routeItem中
        routeItem = {
          ...route,
          meta: {
            ...route.meta,
            sort: mItem.sort, // 根据接口返回的字段进行排序
            isHide: mItem.isHide, // 根据接口返回的字段隐藏菜单
          },
          children: [], // 默认没有子路由，所以先清空这个属性后面递归时再加
        }

        // 如果后端菜单的children存在并且本地路由配置上也有children
        // 则给routeItem添加children属性，此时将递归调用方法进行深度拷贝
        if (mItem?.children?.length && route?.children?.length) {
          routeItem.children = transformMenuTreeToRoutes(mItem.children, route.children)
        }

        // 将执行结果存入结果数组中
        result.push(routeItem)
      }
    })
  })

  // 处理排序
  routesSort(result)

  // 返回处理好的数据
  return result
}

/**
 * 按照配置的sort字段对路由进行递归排序
 * @param routes 路由数据
 */
function routesSort(routes: Array<any>) {
  // 外层循环，控制趟数，每一次找到一个最大值
  for (let i = 0; i < routes.length - 1; i++) {
    // 内层循环,控制比较的次数，并且判断两个数的大小
    for (let j = 0; j < routes.length - 1 - i; j++) {
      if (routes[j].meta.sort > routes[j + 1].meta.sort) {
        let temp = routes[j]
        routes[j] = routes[j + 1]
        routes[j + 1] = temp

        if ((routes[j] as { children?: any[] }).children?.length) {
          routesSort((routes[j] as { children?: any[] }).children)
        }
      }
    }
  }
}

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 调用方法处理顶级路由，已经是嵌套好的结构，然后通过addRoute动态添加路由
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute(data) {
  // 获取路由
  const routes = await generateRoutes(data)
  // 添加路由
  routes.forEach((route: RouteRecordRaw) => {
    router.addRoute(route)
  })
}

/**
 * 生成路由数据
 * @description 将动态路由 dynamicRoutes（@router/dynamicRoutes）和404、401等页面设置到顶层路由中
 * @param data 通过比对接口数据和本地数据最终得到的路由数据
 * @returns 返回替换后的路由数组
 */
export async function generateRoutes(data) {
  // 将所有的动态路由添加到顶层路由的children中
  const routes = deepClone(topRoutes) as any[]
  // notFoundAndNoPowerRoutes也要放进去，防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
  routes[0].children = [...routes[0].children, ...notFoundAndNoPowerRoutes, ...data]
  return routes
}

/**
 * 保存路由数据到pinia中
 */
export async function saveRoutesToStore(result) {
  const routes = await generateRoutes(result)
  const routeStore = useRouteStore(pinia)
  routeStore.setRoutesList(routes)
}
