/* eslint-disable */

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
  const quene: HTMLElement[] = []
  quene.push(el)
  while (quene.length > 0) {
    const current = quene.shift()
    if (current?.tagName === 'BUTTON') {
      return current
    }

    if (current?.childNodes) {
      quene.push(...current.childNodes)
    }
  }

  return null
}

// 指令内容
const definition = {
  mounted(el: HTMLElement, binding: any) {
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
  beforeUnmount(el: HTMLElement) {
    if (el._BUTTON) {
      el._BUTTON.removeEventListener('click', clickFunction)
      el._BUTTON = null
    }
  },
}

// 导出指令
export function buttonDebounce(app) {
  app.directive('buttonDebounce', definition)
}
