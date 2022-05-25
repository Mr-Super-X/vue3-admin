// 此处添加的路由不用鉴权，便于测试使用

// 代码示例，这是模块的路由name，加进去就可以了
const order: Array<string> = ['OrderList']

const message: Array<string> = ['Message']

// 把你要添加的模块加进来进来即可
const debugRouters: Array<string> = [...order, ...message]

export default debugRouters
