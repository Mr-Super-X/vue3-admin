/*
 * @LastDescription: Multi-Language Support
 * @LastEditors: lllomh
 * @LastContact: admin@lllomh.com
 * @LastEditTime: 2023-09-14 13:53:4
 */

// 导出当前页面的路由配置
export default [
  {
    path: '/system/menu/setting', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'systemMenuSetting', // 路由组件名称
    component: () => import(/* webpackChunkName: "systemMenu" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: 'messages.systemsMenuSetting', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
