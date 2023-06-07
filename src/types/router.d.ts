/**
 * vue-router类型扩展文件
 */

export {}

/**
 * 扩展 RouteMeta 接口
 * ts特性：同名interface接口会被合并
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    isLink?: string
    isHide?: boolean
    isKeepAlive?: boolean
    isAffix?: boolean
    isIframe?: boolean
    icon?: string
  }
}
