# 本地svg图标说明

## 使用

所有放在 `src/assets/icons/svg` 目录下的.svg文件均支持直接使用，已封装VLocalSvgIcon全局组件，传入 `name` 即可，name为文件名，如使用文件fullscreen.svg，示例如下：

```html
<v-local-svg-icon name="fullscreen" />
```

**也可以使用VSvgIcon组件，该组件聚合了element-plus icon和local svg，用法与VLocalSvgIcon稍有不同，需要在name上增加【local-】标识，如：**

```html
<v-svg-icon name="local-fullscreen" />
```

## 接入

安装依赖

> npm i svg-sprite-loader -D

vue.config.js新增以下配置

```javascript
chainWebpack: config => {
  // set svg-sprite-loader
  config.module.rule('svg').exclude.add(resolve('src/assets/icons/svg')).end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/assets/icons/svg'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]',
    })
    .end()
},
```

在src/plugins目录下创建localSvgPlugin.ts，[getFilename代码点击此处查看](../src/utils/common.ts)

```javascript
import { getFilename } from '@utils/index'

/**
 * 功能：引入本地svg
 */
const localSvgPlugin = {
  install(vue: any, options: any) {
    if (options && options.imports && Array.isArray(options.imports) && options.imports.length > 0) {
      // 按需引入图标
      const { imports } = options
      imports.forEach((name: any) => {
        require(`@/assets/icons/svg/${name}.svg`)
      })
    } else {
      // 全量引入图标
      const ctx = require.context('@/assets/icons/svg', false, /\.svg$/)
      ctx.keys().forEach(path => {
        const name = getFilename(path)
        require(`@/assets/icons/svg/${name}.svg`)
      })
    }
  },
}

export default localSvgPlugin
```

在src/plugins/index.ts中注册该插件

```javascript
import localSvgPlugin from './localSvgPlugin' // 引入assets/icons/svg插件

const install = (app: any, options: any) => {
  app.use(localSvgPlugin)
}

export default install
```

在src/components//common目录中创建全局组件[VLocalSvgIcon.vue](../src/components/common/VLocalSvgIcon.vue) ，该目录下的所有.vue文件将会被自动注册为全局组件，请参考[自动引入全局组件说明](./auto-global-component.md)。
