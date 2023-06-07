// 导出当前页面的路由配置
import { ROUTER_MODULE_PATHS } from '@/constant'
export default [
  {
    path: ROUTER_MODULE_PATHS.ORDER + '/orderDetail', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'orderDetail', // 路由组件名称
    component: () => import(/* webpackChunkName: "demo" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '订单详情', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
