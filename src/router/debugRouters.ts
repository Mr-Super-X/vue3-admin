// 将开发环境要调试的路由的name添加进来

// 代码示例，这是配置管理模块的路由name，加进去就可以了
const order: Array<string> = ['OrderList']

const message: Array<string> = ['Message']

// 把你要添加的模块加进来进来即可
const debugRouters: Array<string> = [
  ...order,
  ...message
]

export default debugRouters
