import axios from './axiosConfig'
import { windowIt } from './index'
import { WINDOW_IT_TIME } from '@constant/index'
console.log(axios.get)
/**
 * get请求方法
 * @param url string
 * @param data object
 * @param config object
 * @returns promise
 */
export const get = (url: string, data: object, config: object) => {
  const options: object = Object.assign(
    {
      params: data ?? {},
    },
    config ?? {}
  )

  const GET = windowIt(axios.get, WINDOW_IT_TIME)
  return GET(options)
}
