import { getFilename } from '@utils/index'

/**
 * 功能：引入本地svg
 */
const localSvgPlugin = {
  install(vue: any, options: any) {
    if (options && options.imports && Array.isArray(options.imports) && options.imports.length > 0) {
      // 按需引入图标
      const { imports } = options
      imports.forEach((name: any) => {
        require(`@/assets/icons/svg/${name}.svg`)
      })
    } else {
      // 全量引入图标
      const ctx = require.context('@/assets/icons/svg', false, /\.svg$/)
      ctx.keys().forEach(path => {
        const name = getFilename(path)
        require(`@/assets/icons/svg/${name}.svg`)
      })
    }
  },
}

export default localSvgPlugin
