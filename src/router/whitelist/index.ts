// 路由白名单，便于测试使用

// 加载所有子路由-将views/modules下面所有文件夹里面的routes.ts拿过来创建一个路由集合
// require.context第二个参数为true表示会递归查找
const requireContext = require.context('@/views/modules', true, /\/routes\.ts|.js$/)
const allRouterModules: Array<any> = requireContext.keys().reduce((pre: any, key: any) => {
  return [...pre, ...requireContext(key).default]
}, [])

// 获取所有的路由name，必须要在路由配置中填写name字段
const whitelist: Array<string> = allRouterModules.map(item => item.name)

export default whitelist
