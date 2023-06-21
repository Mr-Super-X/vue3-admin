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
 * 生成嵌套菜单树
 * @description 注意菜单每一项的path必须有嵌套关系
 * @param routes 扁平的路由一维数组
 * @returns 处理好的路由树
 */
export function buildRoutesToTree(routes) {
  const map = {}
  const roots = []

  routes.forEach(item => {
    map[item.path] = { ...item, children: [] }
  })

  routes.forEach(item => {
    const parent = map[item.path.split('/').slice(0, -1).join('/')]
    if (parent) {
      parent.children.push(map[item.path])
    } else {
      roots.push(map[item.path])
    }
  })

  return roots
}
