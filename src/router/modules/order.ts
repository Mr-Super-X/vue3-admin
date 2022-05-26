// 模块路径
const modulePath = '/order'

export default [
  {
    path: modulePath + '/orderList', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'OrderList', // 路由组件名称
    component: () => import(/* webpackChunkName: "orderList" */ '@/views/modules/order/OrderList.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      leaf: false, // 递归属性，（当前导航具有子集开启）
      keepAlive: false, // 是否缓存组件
      title: '订单列表' // 路由中文名称
    }
  },
  {
    path: modulePath + '/orderDetail/:id', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'OrderDetail', // 路由组件名称
    component: () => import(/* webpackChunkName: "orderList" */ '@/views/modules/order/OrderDetail.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      leaf: false, // 递归属性，（当前导航具有子集开启）
      keepAlive: false, // 是否缓存组件
      title: '订单详情' // 路由中文名称
    }
  }
]
