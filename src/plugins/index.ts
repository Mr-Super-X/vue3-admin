import svgPlugin from './useSvgPlugin' // 引入assets/icons/svg插件

// 暴露一个install方法，在use该方法时会自动传入app、options
// 可以使用app.use来注册插件
const install = (app: any, options: any) => {
  app.use(svgPlugin)
}

export default install
