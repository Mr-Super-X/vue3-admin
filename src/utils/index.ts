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
