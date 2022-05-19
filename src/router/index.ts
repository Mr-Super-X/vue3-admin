import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Layout from '../layout/index.vue';
// 引入调试路由列表
import debugRouters from './debugRouters';

// 加载所有子路由
const allRouterModules: Array<any> = [];
const requireContext = require.context('./modules', false, /\.ts|.js$/);
requireContext.keys().forEach((name) => {
  allRouterModules.push(...(requireContext(name).default || []));
});

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: '',
    component: Layout,
    /* beforeEnter(to, from, next) {

    }, */
    children: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        leaf: false,
        component: Home,
        meta: {
          keepAlive: false,
          title: '首页',
        },
      },
      {
        path: '/errorPage',
        name: 'errorPage',
        component: () =>
          import(/* webpackChunkName: "errorPage" */ '@/views/Error.vue'),
        meta: {
          keepAlive: false,
          title: '404',
        },
      },
      ...allRouterModules, // 将所有路由注入到layout中
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 不用校验登陆的页面
const filterRoutes = ['login'];
// 全局钩子，可以在这里做校验（登录和权限）
router.beforeEach((to, from, next) => {
  console.log(to.name);
  if (filterRoutes.includes('login')) {
    next();
  } else {
    // const list: Array<any> = [];
    // // 如果是开发环境才拼接上调试页面数组，保证安全性
    // if (['development'].includes(process.env.NODE_ENV)) {
    //   list.concat(debugRouters);
    // }
    next('/login');
  }
});

export default router;
