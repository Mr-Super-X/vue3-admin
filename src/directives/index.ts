import type { App } from 'vue'
import inputDebounce from './inputDebounce'
import buttonDebounce from './buttonDebounce'

/**
 * 导出指令方法：v-xxx
 * @methods inputDebounce input输入防抖指令，用法：v-inputDebounce="onInput"  v-inputDebounce:1000="onInput"
 * @methods clickDebounce button点击防抖指令，用法：v-clickDebounce="onClick"  v-clickDebounce:1000="onClick"
 */

// 暴露一个install方法，在use该方法时会自动传入app、options
// 可以使用app.use来注册插件
const install = (app: App) => {
  // input输入防抖指令
  app.use(inputDebounce)
  // button点击防抖指令
  app.use(buttonDebounce)
}

export default install
