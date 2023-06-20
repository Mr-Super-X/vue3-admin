import { app } from '@/main'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/**
 * 功能：从 @element-plus/icons-vue 中导入所有图标并进行全局注册
 * 使用：i-ep-图标名称
 */
const elementPlusIconPlugin = {
  install() {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component('i-ep-' + key, component)
    }
  },
}

export default elementPlusIconPlugin
