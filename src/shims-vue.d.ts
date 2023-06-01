/* eslint-disable */

// 该文件用于定义一些全局typescript模块扩展
// 这句不能删，否则就是覆盖而不是扩展
// 官方文档：https://cn.vuejs.org/guide/typescript/options-api.html#augmenting-global-properties
export {}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 修复找不到mockjs模块的ts报错
declare module 'mockjs'

// 修复找不到nprogress模块的ts报错
declare module 'nprogress'

// 修复找不到vue模块的ts报错
// 如果遇到找不到vue模块的报错，要在这里定义vue模块，
// 但会导致在script setup ts语法中定义的变量在template中找不到，提示报错any 类型“{}”上不存在属性“xxx”
// 要在该文件顶层添加一个import或者export语句
// declare module 'vue'
