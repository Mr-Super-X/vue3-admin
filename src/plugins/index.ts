import localSvgPlugin from './localSvgPlugin' // 引入assets/icons/svg插件
import elementPlusIconPlugin from './elementPlusIconPlugin' // 引入全局注册element icon插件
import globalPropertiesPlugin from './globalPropertiesPlugin' // 引入globalProperties插件

// 暴露一个install方法，在use该方法时会自动传入app、options
// 可以使用app.use来注册插件
const install = (app: any, options: any) => {
  app.use(localSvgPlugin)
  app.use(elementPlusIconPlugin)
  app.use(globalPropertiesPlugin)
}

export default install
