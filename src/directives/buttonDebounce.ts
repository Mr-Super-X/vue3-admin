/* eslint-disable */
// 以上命令为忽略该文件eslint检查

import type { App } from 'vue'
import type { ElHTMLElement } from './buttonDebounce.d'

export function debounce(click: (event: Event) => any, timeout: number): (this: HTMLElement, ev: Event) => any {
  let timer: string | number | NodeJS.Timeout | undefined
  return (event: Event) => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    timer = setTimeout(() => {
      click(event)
      clearTimeout(timer)
      timer = undefined
    }, timeout)
  }
}

export function isFunction(param: any): boolean {
  return Object.prototype.toString.call(param) === '[object Function]'
}

let clickFunction: (event: Event) => {}

// 要同时支持button和封装的button组件，因此需要循环去找这个button元素
function findButton(el: HTMLElement): HTMLElement | null {
  const queue: HTMLElement[] = []
  queue.push(el)
  while (queue.length > 0) {
    const current = queue.shift()
    if (current?.tagName === 'BUTTON') {
      return current
    }

    if (current?.childNodes) {
      queue.push(...(current.childNodes as any))
    }
  }

  return null
}

// 指令内容
const definition = {
  mounted(el: ElHTMLElement, binding: any) {
    const { value, arg } = binding
    if (value && isFunction(value)) {
      let delay = 300 // 默认防抖时间
      // 获取指令上传递的参数
      if (arg && !Number.isNaN(arg)) {
        delay = Number(arg)
      }

      clickFunction = debounce(value, delay) // 执行函数防抖处理
      const button = findButton(el) // 找到元素
      // 如果找到了则绑定相应事件
      if (button) {
        button.addEventListener('click', clickFunction)
      }
      // 用于在卸载阶段找到该元素，便于移除事件
      el._BUTTON = button
    }
  },
  beforeUnmount(el: ElHTMLElement) {
    if (el._BUTTON) {
      el._BUTTON.removeEventListener('click', clickFunction)
      el._BUTTON = null
    }
  },
}

const buttonDebounce = {
  install(app: App, options: any) {
    app.directive('buttonDebounce', definition)
  },
}

// 导出指令
// input输入防抖指令，用法：v-buttonDebounce="onInput"  v-buttonDebounce:1000="onInput"
export default buttonDebounce
