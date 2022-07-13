// 存放当前页面的请求api配置
import type { AxiosRequestConfig } from 'axios'
import request from '@/request/index'
import { API_MODULE_PATHS } from '@/constant'

/**
 * 获取菜单
 * @param options AxiosRequestConfig options
 * @returns Promise
 */
export function getMenu(options?: AxiosRequestConfig): Promise<any> {
  const config: AxiosRequestConfig = {
    url: API_MODULE_PATHS.SYSTEM + '/menu',
    method: 'get',
    params: {}, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...options,
  }
  return request(config)
}
