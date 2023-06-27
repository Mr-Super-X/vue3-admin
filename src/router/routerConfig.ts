import { LAYOUT_ROUTE_NAME } from '@/layout/configs'
import type { RouteRecordRaw } from 'vue-router'
import dynamicRoutes from './dynamicRoutes' // 引入动态路由

// 静态的视图组件直接引入，动态的可以查看dynamicRoutes.ts中通过requireContext自动加载
import Layout from '../layout/index.vue'
import Login from '@/views/login/routes'
import Welcome from '@views/welcome/routes'
import NotFound from '@/views/404/routes'
import NotPower from '@/views/401/routes'

/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空 2、isIframe:false`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
 *      icon：          菜单、tagsView 图标，支持本地图标和element-plus icon，本地图标配置前缀为local-文件名，el-icon配置前缀为i-ep-图标名
 * }
 */

/**
 * 404、401等路由
 */
export const notFoundAndNoPowerRoutes: Array<RouteRecordRaw> = [
  // 匹配不到的路由重定向到Error
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  ...NotFound,
  ...NotPower,
]

/**
 * 公共页面，如欢迎页
 */
export const commonRoutes: Array<RouteRecordRaw> = [...Welcome]

/**
 * 顶层layout路由
 */
export const topRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: LAYOUT_ROUTE_NAME,
    redirect: '/home',
    component: Layout,
    /* beforeEnter(to, from, next) {
      // 进入layout之前要干点什么事情
    }, */
    children: [
      // 这里一般会默认配置一个不需要任何权限的公共页面，如欢迎页
      ...commonRoutes,

      // 404、401等错误页面也要放进去
      ...notFoundAndNoPowerRoutes,

      /**
       * 所有动态路由模块将会以扁平结构（一维数组而非树结构）在适当的时机注入到layout.children下，也就是当前位置
       * 原因是当前路由架构默认设计为keep-alive支持二级路由缓存（嵌套多级的缓存复杂度很高，实现价值不高）
       * @link https://cn.vuejs.org/guide/built-ins/keep-alive.html
       * @link https://cn.vuejs.org/api/built-in-components.html#keepalive
       */
      ...dynamicRoutes,
    ],
  },
]

/**
 * 全屏路由（此处定义的路由为全屏页面，不会嵌套在layout中）
 */
export const fullScreenRoutes: Array<RouteRecordRaw> = [...Login]
