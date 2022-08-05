import { getFilename } from '@/utils'
// 自动导入common目录下的所有组件，请将公共组件放在common目录下
const requireComponents = require.context('./common', true, /\.vue$|\.ts$|\.js$/)

const components = {
  install(Vue: { component: (arg0: string, arg1: any) => void }) {
    requireComponents.keys().forEach(component => {
      const Component = requireComponents(component).default
      // const componentName = Component.__file.split('/')[3].replace(/\.vue$/, '') || Component?.render?.name
      // vue版本不同可能存在组件没有name的情况，已经试过以下几种都出现过，因此做一下兼容处理
      const componentName = Component.__name || getFilename(Component?.__file) || Component?.render?.name
      Vue.component(componentName, Component)
    })
  },
}

export default components
