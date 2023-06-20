/**
 * @description 对全局对象进行扩展
 */

export {}

declare global {
  // 扩展window对象
  interface Window {
    // 添加一个全局loading效果
    nextLoading: boolean
  }

  // 鼠标滚轮滚动类型
  declare interface WheelEventType extends WheelEvent {
    wheelDelta: number
  }
}
