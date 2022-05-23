import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '../utils/index'
import Layout from '../layout/index.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Error from '../views/Error.vue'
import debugRouters from './debugRouters'
const isDev = ['development'].includes(process.env.NODE_ENV as string)

// 加载所有子路由
const allRouterModules: Array<any> = []
const requireContext = require.context('./modules', false, /\.ts|.js$/)
requireContext.keys().forEach(name => {
  allRouterModules.push(...(requireContext(name).default || []))
})

const routes: Array<RouteRecordRaw> = [
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
        leaf: false,
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
      ...allRouterModules // 将所有路由注入到layout下
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 不用校验的路由，默认不做校验的列表如下
const filterRoutes = ['Login', 'Error']
// 开发模式下把调试路由列表路由添加进去
if (isDev) {
  filterRoutes.push(...debugRouters)
}
// 全局钩子，可以在这里做校验（登录鉴权）
router.beforeEach((to, from, next) => {
  // 获取当前跳转的路由name
  const routeName: any = to.name
  // 不用校验的路由直接跳转即可
  if (filterRoutes.includes(routeName)) {
    next()
    return
  }

  // 找到layout组件
  const isLayout: any = to.matched.length && to.matched[0].name === 'Layout'
  // 获取权限
  const havePermission = getToken() // 以token作为示例
  // 如果是layout下的路由并且有权限才可以正常跳转，否则重定向到login页面
  if (isLayout && havePermission) {
    next()
  } else {
    next('/login')
  }
})

export default router
