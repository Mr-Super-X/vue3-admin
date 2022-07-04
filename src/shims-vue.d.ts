/* eslint-disable */

// 修复找不到mockjs模块的ts报错
declare module 'mockjs'
// 修复找不到pinia模块的ts报错
declare module 'pinia'
// 修复找不到vue模块的ts报错
// 如果遇到找不到vue模块的报错，不要在这里定义vue模块，会导致在script setup ts语法中定义的变量
// 在template中找不到，提示报错any 类型“{}”上不存在属性“xxx”
// declare module 'vue'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
