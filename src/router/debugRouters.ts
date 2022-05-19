// 开发环境要调试的时候把路由的name配进来，不用每次都去权限系统配权限
// 注意不要再去修改路由入口index.js了，大家都改那里很容易不小心出错，到时候大家都要背锅
// 我已经把它抽出来并且加了环境判断，在这里配置好之后就不用担心上线的时候还要把调试的列表删除

// 代码示例，这是配置管理模块的路由name，加进去就可以了
const order: Array<string> = [];

const message: Array<string> = [];

// 把你要添加的模块加进来进来即可
const debugRouters: Array<string> = [
  ...order,
  ...message
]

export default debugRouters;
