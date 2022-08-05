/**
 * 请求封装：基于promise的时间窗口架构
 * 在一定时间内参数相同的请求无论发起多少次，最终只会发起一次请求
 * 并将该次请求的结果返回给对应的方法
 */

// 使用示例如下：
// 默认情况下只需要在创建方法时进行配置即可
// 如需动态传参，需提供options参数以覆盖默认配置，config所有参数与axios保持一致
/* export function demoPost(options?: AxiosRequestConfig): Promise<any> {
  const config: AxiosRequestConfig = {
    url: modulePath + '/demoPost',
    method: 'post',
    data: {}, // post请求传data
    ...options,
  }
  return request(config)
}

export function demoGet(options?: AxiosRequestConfig): Promise<any> {
  const config: AxiosRequestConfig = {
    url: modulePath + '/demoGet',
    method: 'get',
    params: {}, // get请求传params，参数会拼在url后面，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    ...options,
  }
  return request(config)
} */
import type { AxiosResponse, AxiosError } from 'axios'
import type { IWindowIt } from './index.d'

function hash(params: any): string {
  return JSON.stringify(params)
}

/**
 * 时间窗口架构
 * @param f promise 请求方法，如axios、axios.get、...，必传
 * @param time number 窗口时间 必传
 * @param type string 请求类型 非必传
 * @returns promise
 */
function windowIt(f: any, time: number, type?: string) {
  let w: IWindowIt = {}
  let flag = false

  return (params: any) => {
    return new Promise((resolve, reject) => {
      // 以请求url和参数拼接成的字符串作为key缓存起来
      if (!w[hash(params)]) {
        w[hash(params)] = {
          axios: f,
          args: { ...params },
          resolvers: [],
          rejecters: [],
        }
      }
      if (!flag) {
        flag = true // 开启标记，防止重复调用
        // time时间内的相同请求只发起一次http请求
        // 然后遍历相同时间内的所有resolvers，将请求结果resolve回去
        setTimeout(() => {
          Object.keys(w).forEach(key => {
            // 获取请求方法、请求参数、resolvers、rejecters
            const { axios, args, resolvers, rejecters } = w[key]
            // 将参数分别从args中解构出来
            const { url, data, params, ...other } = args

            // 创建请求方法，根据类型type进行参数绑定
            let requestFn: () => Promise<any>
            switch (type) {
              case 'get':
                requestFn = axios.bind(null, url, { params, ...other })
                break
              case 'post':
                requestFn = axios.bind(null, url, data, { ...other })
                break
              case 'put':
                requestFn = axios.bind(null, url, data, { ...other })
                break
              case 'delete':
                requestFn = axios.bind(null, url, { params, ...other })
                break
              case 'head':
                requestFn = axios.bind(null, url, { params, ...other })
                break
              case 'options':
                requestFn = axios.bind(null, url, { params, ...other })
                break
              case 'patch':
                requestFn = axios.bind(null, url, data, { ...other })
                break
              default:
                requestFn = axios.bind(null, args)
            }

            // 发起请求，传入的参数会跟axiosConfig合并
            requestFn()
              .then((response: AxiosResponse) => {
                resolvers.forEach(r => {
                  r(response)
                })
              })
              .catch((error: AxiosError) => {
                rejecters.forEach(r => {
                  r(error)
                })
              })
              .finally(() => {
                // 无论请求成功还是失败，完成后重置状态
                flag = false
                w = {}
              })
          })
        }, time)
      }

      // 将时间窗口内所有相同请求的resolve、reject都存到对应位置
      w[hash(params)].resolvers.push(resolve)
      w[hash(params)].rejecters.push(reject)
    })
  }
}

export default windowIt
