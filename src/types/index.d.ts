/**
 * 数组类型子项定义，用于解决template中报错类型“never”上不存在属性“xx”
 * 对于不确定子项是什么类型的（如接口请求回来的数据），可以使用该类型
 */
export interface IListItem {
  [key: string]: any
}
