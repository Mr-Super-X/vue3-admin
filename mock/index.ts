import Mock from 'mockjs'
import type { IMockItem } from './index.d'

// 加载所有mock模块
const allMockModules: Array<IMockItem> = []
const requireContext = require.context('./modules', false, /\.ts|.js$/)
requireContext.keys().forEach(name => {
  const module = requireContext(name)
  const moduleArr: Array<any> = []
  Object.keys(module).forEach(item => {
    moduleArr.push(...module[item])
  })
  allMockModules.push(...moduleArr)
})

export const mocks = [...allMockModules]

console.log(mocks, 'mocks')

// 设置随机延迟时间
Mock.setup({
  timeout: '300-1000',
})

export function mockXHR() {
  // 注册所有的mock服务
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.method || 'get', i.response())
  }
}
