// 导出当前页面的路由配置
export default [
  {
    path: '/home', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'home', // 路由组件名称
    component: () => import(/* webpackChunkName: "home" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      isKeepAlive: false, // 是否缓存组件
      title: '首页', // 路由中文名称
      isLink: '',
      isHide: false,
      isAffix: true,
      isIframe: false,
      icon: 'i-ep-OfficeBuilding',
    },
  },
]
