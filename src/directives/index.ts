import type { App } from 'vue'
import { inputDebounce } from './inputDebounce'
import { buttonDebounce } from './buttonDebounce'

/**
 * 导出指令方法：v-xxx
 * @methods inputDebounce input输入防抖指令，用法：v-inputDebounce="onInput"  v-inputDebounce:1000="onInput"
 * @methods clickDebounce button点击防抖指令，用法：v-clickDebounce="onClick"  v-clickDebounce:1000="onClick"
 */
export function directive(app: App) {
  // input输入防抖指令
  inputDebounce(app)
  // button点击防抖指令
  buttonDebounce(app)
}
