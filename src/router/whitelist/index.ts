// 路由白名单，便于测试使用

// 将所有的模块路由自动注入
const allRouterModules: Array<any> = []
const requireContext = require.context('../modules', false, /\.ts|.js$/)
requireContext.keys().forEach(name => {
  allRouterModules.push(...(requireContext(name).default || []))
})

// 获取所有的路由name，必须要在路由配置中填写name字段
const whitelist: Array<string> = allRouterModules.map(item => item.name)

export default whitelist
