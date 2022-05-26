import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Error from '../views/Error.vue'

// 加载所有子路由
const allRouterModules: Array<RouteRecordRaw> = []
const requireContext = require.context('./modules', false, /\.ts|.js$/)
requireContext.keys().forEach(name => {
  allRouterModules.push(...(requireContext(name).default || []))
})

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    /* beforeEnter(to, from, next) {
      // 进入layout之前要干点什么事情
    }, */
    children: [
      // 匹配不到的路由重定向到Error
      {
        path: '/:pathMatch(.*)*',
        redirect: '/error'
      },
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          keepAlive: false,
          title: '首页'
        }
      },
      {
        path: '/error',
        name: 'Error',
        component: Error,
        meta: {
          keepAlive: false,
          title: '404'
        }
      },
      ...allRouterModules // 将所有路由模块注入到layout.children下
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
