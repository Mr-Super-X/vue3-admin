/*
 * @LastDescription: Multi-Language Support
 * @LastEditors: lllomh
 * @LastContact: admin@lllomh.com
 * @LastEditTime: 2023-09-14 13:24:31
 */
// 导出当前页面的路由配置
export default [
  {
    path: '/root', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'root', // 路由组件名称
    component: () => import(/* webpackChunkName: "root" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: 'messages.root', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: true,
      isIframe: false,
      icon: 'i-ep-Printer',
    },
  },
]
