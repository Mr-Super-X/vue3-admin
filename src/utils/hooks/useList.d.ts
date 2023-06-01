import type { Ref } from 'vue'

// 返回数据的类型定义
export interface ListReturn<T = any> {
  list: T[]
  total: number
}

// 参数定义
export interface OptionsType<T = any> {
  filterOption?: Ref<T> // 查询参数（必须是ref定义的可响应类型，否则无效，vue将在后续版本把reactive脱离官方包）
  transformResFn?: (...args: any) => ListReturn // 转换响应数据的方法
}
