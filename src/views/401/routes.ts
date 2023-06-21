// 导出当前页面的路由配置
export default [
  {
    path: '/401', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'notPower', // 路由组件名称
    component: () => import(/* webpackChunkName: "demo" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '401', // 路由中文名称
      isLink: '',
      isHide: true,
      isAffix: false,
      isIframe: false,
      icon: '',
    },
  },
]
