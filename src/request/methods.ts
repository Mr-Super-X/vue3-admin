import axios from './axiosConfig'
import type { AxiosRequestConfig } from 'axios'
import windowIt from './windowIt'
import { WINDOW_IT_TIME } from '@constant/index'

/**
 * axios默认请求方法
 * @param config object 配置对象，参考axios.config
 * @returns promise
 */
export const request = (config: AxiosRequestConfig) => {
  const options: AxiosRequestConfig = {
    ...config,
  }

  // 将axios进行包装
  const REQUEST = windowIt(axios, WINDOW_IT_TIME)
  return REQUEST(options)
}

/**
 * get请求方法
 * @param url string 请求url
 * @param params object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const get = (url: string, params?: object, config?: AxiosRequestConfig) => {
  const method = 'get'
  const options: AxiosRequestConfig = {
    url,
    params, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...config,
  }

  const GET = windowIt(axios.get, WINDOW_IT_TIME, method)
  return GET(options)
}

/**
 * post请求方法
 * @param url string 请求url
 * @param data object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const post = (url: string, data?: object, config?: AxiosRequestConfig) => {
  const method = 'post'
  const options: AxiosRequestConfig = {
    url,
    data,
    ...config,
  }

  const POST = windowIt(axios.post, WINDOW_IT_TIME, method)
  return POST(options)
}

/**
 * put请求方法
 * @param url string 请求url
 * @param data object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const put = (url: string, data?: object, config?: AxiosRequestConfig) => {
  const method = 'put'
  const options: AxiosRequestConfig = {
    url,
    data,
    ...config,
  }

  const PUT = windowIt(axios.put, WINDOW_IT_TIME, method)
  return PUT(options)
}

/**
 * delete请求方法
 * @param url string 请求url
 * @param params object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const deletes = (url: string, params?: object, config?: AxiosRequestConfig) => {
  const method = 'delete'
  const options: AxiosRequestConfig = {
    url,
    params,
    ...config,
  }

  const DELETE = windowIt(axios.delete, WINDOW_IT_TIME, method)
  return DELETE(options)
}

/**
 * head请求方法
 * @param url string 请求url
 * @param params object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const head = (url: string, params?: object, config?: AxiosRequestConfig) => {
  const method = 'head'
  const options: AxiosRequestConfig = {
    url,
    params,
    ...config,
  }

  const HEAD = windowIt(axios.head, WINDOW_IT_TIME, method)
  return HEAD(options)
}

/**
 * options请求方法
 * @param url string 请求url
 * @param params object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const options = (url: string, params?: object, config?: AxiosRequestConfig) => {
  const method = 'options'
  const options: AxiosRequestConfig = {
    url,
    params,
    ...config,
  }

  const OPTIONS = windowIt(axios.options, WINDOW_IT_TIME, method)
  return OPTIONS(options)
}

/**
 * patch请求方法
 * @param url string 请求url
 * @param data object 请求参数对象
 * @param config object 配置覆盖对象，参考axios.config
 * @returns promise
 */
export const patch = (url: string, data?: object, config?: AxiosRequestConfig) => {
  const method = 'patch'
  const options: AxiosRequestConfig = {
    url,
    data, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...config,
  }

  const PATCH = windowIt(axios.patch, WINDOW_IT_TIME, method)
  return PATCH(options)
}
