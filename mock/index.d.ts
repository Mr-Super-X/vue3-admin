// mock项必填的数据
export interface IMockItem {
  url: string
  method: string
  response: () => object
}
