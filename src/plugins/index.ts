import svgPlugin from './svgPlugin' // 引入assets/icons/svg插件
import globalPropertiesPlugin from './globalPropertiesPlugin' // 引入globalProperties插件

// 暴露一个install方法，在use该方法时会自动传入app、options
// 可以使用app.use来注册插件
const install = (app: any, options: any) => {
  app.use(svgPlugin)
  app.use(globalPropertiesPlugin)
}

export default install
