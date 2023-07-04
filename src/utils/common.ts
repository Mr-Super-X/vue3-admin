// 只放全局使用的公共util

/**
 * 获取token
 * @returns string
 */
export function getToken(): string {
  return 'tokenxxxxx'
}

/**
 * 验证环境变量
 * @param env .env.xxx中自定义的VUE_APP_ENV变量
 * @returns boolean
 */
export function verifyENV(env: string): boolean {
  return [env].includes(process.env?.VUE_APP_ENV as string)
}

/**
 * 获取文件名
 * @param pathStr string 格式如：/src/components/Demo.vue
 * @param ext boolean 默认false，不带后缀，开启后返回带后缀的文件名
 * @returns string 返回Demo.vue | Demo
 * @example
 * getFilename('/src/components/Demo.vue')
 * getFilename('/src/components/Demo.vue', true)
 */
export function getFilename(pathStr: string, ext = false): string {
  if (ext) {
    return pathStr.replace(/[^/]*[/]+/g, '')
  } else {
    return pathStr.replace(/(.*\/)*([^.]+).*/gi, '$2')
  }
}

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: object | any[]) {
  let newObj: object | any[]
  try {
    newObj = Array.isArray(obj) ? [] : {}
  } catch (error) {
    newObj = {}
  }
  for (let attr in obj) {
    if (obj[attr] && typeof obj[attr] === 'object') {
      newObj[attr] = deepClone(obj[attr])
    } else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual<T>(a: T, b: T): boolean {
  if (!a || !b) return false
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  if (aProps.length != bProps.length) return false
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i]
    let propA = a[propName]
    let propB = b[propName]
    if (!b.hasOwnProperty(propName)) return false
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) return false
    } else if (propA !== propB) {
      return false
    }
  }
  return true
}
