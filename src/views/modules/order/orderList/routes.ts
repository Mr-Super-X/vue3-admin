/*
 * @LastDescription: Multi-Language Support
 * @LastEditors: lllomh
 * @LastContact: admin@lllomh.com
 * @LastEditTime: 2023-09-14 16:53:34
 */
// 导出当前页面的路由配置
export default [
  {
    path: '/order/list', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'orderList', // 路由组件名称
    component: () => import(/* webpackChunkName: "orderList" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: 'messages.orderList', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
