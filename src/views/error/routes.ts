// 导出当前页面的路由配置
import { ROUTER_MODULE_PATHS } from '@/constant'
export default [
  {
    path: ROUTER_MODULE_PATHS.ROOT + '/error', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'error', // 路由组件名称
    component: () => import(/* webpackChunkName: "demo" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      leaf: false, // 递归属性，（当前导航具有子集开启）
      keepAlive: false, // 是否缓存组件
      title: '404', // 路由中文名称
    },
  },
]
