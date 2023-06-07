import { RouteRecordRaw } from 'vue-router'

/**
 * 该文件用于管理所有动态引入的路由（views/modules下的文件）
 *
 * 加载所有子路由-将views/modules下面所有文件夹里面的routes.ts拿过来创建一个路由集合
 * require.context第二个参数为true表示会递归查找
 *
 * 请在对应的组件目录中添加routes.ts并配置好路由信息，此处会自动导入，会自动以文件夹名称作为模块前缀
 */
const requireContext = require.context('@/views/modules', true, /\/routes\.ts|.js$/)
const allRouterModules: Array<RouteRecordRaw> = requireContext.keys().reduce((pre: any, cur: any) => {
  return [...pre, ...requireContext(cur).default]
}, [])

// 将拿到的路由数组导出
export default allRouterModules
