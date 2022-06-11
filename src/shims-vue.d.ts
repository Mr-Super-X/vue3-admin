/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 修复找不到mockjs模块的ts报错
declare module 'mockjs'
// 修复找不到pinia模块的ts报错
declare module 'pinia'
// 修复找不到vue模块的ts报错
declare module 'vue'
