# 自动注册全局组件说明

在webpack中，借助了 `require.context` 这个api，vite中也有相应的plugin可以实现，如：vite-plugin-require-context 。

自动引入并注册全局组件功能放在 `src/components/index.ts` 中，会将 `src/components/common` 目录下的.vue|.ts|.js文件自动注册为全局组件，它也是递归完成的。请确保该目录中的文件均为组件代码文件。