// 只放全系统使用的公共util方法

/**
 * 获取token
 * @returns string
 */
export function getToken (): string {
  return 'tokenxxxxx'
}

/**
 * 验证环境变量
 * @param env .env.xxx中自定义的VUE_APP_ENV变量
 * @returns boolean
 */
export function verifyENV (env: string): boolean {
  return [env].includes(process.env?.VUE_APP_ENV as string)
}
