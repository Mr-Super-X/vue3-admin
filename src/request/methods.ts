import axios from './axiosConfig'
import type { AxiosRequestConfig } from 'axios'
import { windowIt } from './index'
import { WINDOW_IT_TIME } from '@constant/index'

/**
 * get请求方法
 * @param url string 请求url
 * @param params object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const get = (url: string, params?: object, config?: AxiosRequestConfig) => {
  const options: AxiosRequestConfig = {
    url,
    params, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    method: 'get',
    ...config,
  }

  const GET = windowIt(axios.get, WINDOW_IT_TIME, 'get')
  return GET(options)
}

export const post = (url: string, data?: object, config?: AxiosRequestConfig) => {
  const options: AxiosRequestConfig = {
    url,
    method: 'post',
    data, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...config,
  }

  const POST = windowIt(axios.post, WINDOW_IT_TIME, 'post')
  return POST(options)
}
