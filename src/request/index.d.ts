import type { AxiosRequestConfig } from 'axios'

// 定义w对象的数据格式
export interface IWindowIt {
  // key为string
  [key: string]: {
    axios: (value: any) => Promise<any> // 符合函数定义
    args: AxiosRequestConfig // 符合axios类型定义
    resolvers: Array<(value: unknown) => void> // 类型为数组，每一个成员都是一个函数
    rejecters: Array<(value: unknown) => void> // 类型为数组，每一个成员都是一个函数
  }
}
