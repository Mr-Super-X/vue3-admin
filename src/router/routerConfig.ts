import { LAYOUT_ROUTE_NAME } from '@/layout/configs'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 静态的视图组件可以直接引入，动态的通过requireContext自动加载
import Layout from '../layout/index.vue'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Error from '@/views/error/index.vue'

// 加载所有子路由-将views/modules下面所有文件夹里面的routes.ts拿过来创建一个路由集合
// require.context第二个参数为true表示会递归查找
const requireContext = require.context('@/views/modules', true, /\/routes\.ts|.js$/)
const allRouterModules: Array<RouteRecordRaw> = requireContext.keys().reduce((pre: any, key: any) => {
  return [...pre, ...requireContext(key).default]
}, [])

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: LAYOUT_ROUTE_NAME,
    component: Layout,
    /* beforeEnter(to, from, next) {
      // 进入layout之前要干点什么事情
    }, */
    children: [
      // 匹配不到的路由重定向到Error
      {
        path: '/:pathMatch(.*)*',
        redirect: '/error',
      },
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
      },
      {
        path: '/error',
        name: 'error',
        component: Error,
      },
      ...allRouterModules, // 将所有路由模块注入到layout.children下
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
