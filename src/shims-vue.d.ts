/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// ts提示找不到模块xxx或其相应的类型声明时，在此处声明即可
declare module 'mockjs';
declare module 'axios';
declare module 'qs';
