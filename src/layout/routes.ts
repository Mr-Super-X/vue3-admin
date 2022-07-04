// 导出当前页面的路由配置
export default [
  {
    path: '/', // 路由访问路径（'/' + '模块名' + '/' + '路由名'）
    name: 'layout', // 路由组件名称
    component: () => import(/* webpackChunkName: "layout" */ './index.vue'), // 按需引入组件，提高首屏加载速度
    meta: {
      leaf: false, // 递归属性，（当前导航具有子集开启）
      keepAlive: false, // 是否缓存组件
      title: 'layout', // 路由中文名称
    },
  },
]
