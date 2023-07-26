// 定义插件接口，必须有install方法，且可以接收两个参数，非必传
declare interface Installable {
  install(vue?: any, options?: any): void
}
