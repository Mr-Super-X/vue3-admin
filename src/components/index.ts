import { getFilename } from '@/utils'
// 导入common目录下的所有组件
const requireComponents = require.context('./common', false, /\.vue$|\.ts$|\.js$/)

const components = {
  install (Vue: any) {
    requireComponents.keys().forEach(component => {
      const Component = requireComponents(component).default
      // const componentName = Component?.render?.name || Component.__file.split('/')[3].replace(/\.vue$/, '')
      const componentName = Component?.render?.name || getFilename(Component?.__file)
      Vue.component(componentName, Component)
    })
  }
}

export default components
