import type { AxiosResponse, AxiosError } from 'axios'
import type { IWindowIt } from './index.d'

function hash(params: any): string {
  return JSON.stringify(params)
}

/**
 * 时间窗口架构封装
 * @description 基于promise的时间窗口架构，
 * 在一定时间内参数相同的请求无论发起多少次，最终只会发起一次请求
 * 并将该次请求的结果返回给所有发起该请求的方法
 * @param f promise 请求方法，如axios、axios.get、axios.post、...，必传
 * @param time number 窗口时间 必传，默认时间常量 WINDOW_IT_TIME 配置在src/constant/api.ts中，默认值50
 * @param method string 请求方法（get/post/...） 非必传
 * @returns promise 返回值与直接调用axios的返回一致，包含config、data、headers、request、status、statusText等信息，
 * 查看axios响应结构文档：http://www.axios-js.com/zh-cn/docs/#%E5%93%8D%E5%BA%94%E7%BB%93%E6%9E%84
 */
function windowIt(f: any, time: number, method?: string) {
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

            // 创建请求方法，根据类型method进行参数绑定
            let requestFn: () => Promise<any>
            switch (method) {
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
