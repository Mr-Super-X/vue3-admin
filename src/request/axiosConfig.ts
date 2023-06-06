// axios配置文件

import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import qs from 'qs'
import { getToken } from '@/utils'

// baseUrl
const baseURL = () => {
  return ['development'].includes(process.env.NODE_ENV!) ? '' : process.env.VUE_APP_API_PATH
}

// axios配置
// 文档：http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE
const config: AxiosRequestConfig = {
  // `url` 是用于请求的服务器 URL
  url: '',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: baseURL(),

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function (data: any, headers: any) {
      // 对 data 进行任意转换处理
      return data instanceof FormData ? data : qs.stringify(data, { arrayFormat: 'indices' })
    },
  ],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data: any) {
      // 对 data 进行任意转换处理
      return JSON.parse(data)
    },
  ],

  // `headers` 是即将被发送的自定义请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    token: getToken() || '',
  },

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {},

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params: any) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {},

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 5000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  // adapter: function (config: any) {

  // },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  // auth: {},

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` 表示用于解码响应数据的编码
  // 注意：忽略"stream"或客户端请求的"responseType"
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是携带 xsrf token 值的 http 标头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` 允许为上传处理进度事件
  // 注意：配置中不能使用这个函数，否则会导致mock环境下报错
  // TypeError: request.upload.addEventListener is not a function
  // onUploadProgress: function (progressEvent: any) {
  //   // Do whatever you want with the native progress event
  // },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent: any) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: undefined,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status: number) {
    return status >= 200 && status < 300 // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` 定义要在 node.js 中使用的 UNIX 套接字
  // 例如 '/var/run/docker.sock' 向 docker 守护进程发送请求
  // 只能指定 `socketPath` 或 `proxy`
  // 如果两者都指定，则使用 `socketPath`
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  // proxy: {
  // host: '127.0.0.1',
  // port: 9000,
  // auth: {
  //   username: '',
  //   password: ''
  // }
  // },

  // `cancelToken` 指定用于取消请求的 cancel token
  // 文档：http://www.axios-js.com/zh-cn/docs/#%E5%8F%96%E6%B6%88
  // cancelToken: new CancelToken(function (cancel) {
  // })
}

// 创建axios实例
const instance: AxiosInstance = axios.create(config)

// 请求拦截
// config 代表发起请求的参数的实体
instance.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
    if (error?.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误，未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }

      window.console.error(error.message) // 服务器响应类用error弹出错误信息
    }

    return Promise.reject(error)
  }
)

export default instance
