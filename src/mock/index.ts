import Mock from 'mockjs'

// 加载所有mock模块
const allMockModules: Array<any> = []
const requireContext = require.context('./modules', false, /\.ts|.js$/)
requireContext.keys().forEach(name => {
  allMockModules.push(...(requireContext(name).default || []))
})

export const mocks = [...allMockModules]

// 设置随机延迟时间
Mock.setup({
  timeout: '300-1000'
})

export function mockXHR () {
  // 注册所有的mock服务
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.method || 'get', i.response)
  }
}
