import type { AxiosRequestConfig } from 'axios'
import request from '../index'
/**
 * 模块接口示例，默认情况下只需要在创建方法时进行配置即可
 * 如需动态传参，需提供options参数以覆盖默认配置，config所有参数与axios保持一致
 */

const modulePath = '/system'

// 示例

/**
 * 获取菜单
 * @param options AxiosRequestConfig options
 * @returns Promise
 */
export function getMenu (options?: AxiosRequestConfig): Promise<any> {
  const config: AxiosRequestConfig = {
    url: modulePath + '/menu',
    method: 'get',
    params: {}, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...options
  }
  return request(config)
}
