# element-plus icons说明

## 使用说明

已接入unplugin-icons按需引入icon功能，如需使用element-plus自带的icon，在组件中直接使用即可，示例：

```html
<el-icon>
  <i-ep-location />
</el-icon>
```
> 注意前缀是 **【i-ep-】** 后面接上图标名称的单词小写

如在el-button等组件的icon属性上使用时遇到无效的问题，可以尝试手动引入后再进行使用

```
import { Edit } from '@element-plus/icons-vue'

<el-button type="success" size="small" :icon="Edit" round>新增用户</el-button>
```

## 接入说明

安装依赖

> npm i unplugin-icons -D

vue.config.js新增以下配置

```javascript
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')

plugins: [
  AutoImport({
    resolvers: [
      // 自动导入 Element Icon
      IconsResolver({
        prefix: 'Icon',
      }),
    ],
  }),
  Components({
    resolvers: [
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep'],
      }),
    ],
  }),
  Icons({
    autoInstall: true,
  }),
],
```

此时会遇到以下问题

1. eslint报错
2. ts报错

解决报错，vue.config.js添加配置

```javascript
AutoImport({
    // 解决自动导入组件引起的eslint报错，如： ‘ElMessageBox’ is not defined.eslint(no-undef)
    // 会自动生成.eslintrc-auto-import.json文件，需要在.eslintrc.js中extends该文件
    eslintrc: {
      enabled: true,
    },
    // 解决自动导入组件引起的tslint报错，仅在ts下才需要开启
    // 需要在tsconfig.json中include auto-imports.d.ts文件
    dts: true,
}),
```

.eslintrc.js添加配置

```javascript
// .eslintrc-auto-import.json 由AutoImport插件自动生成，参考vue.config.js配置eslintrc.enabled，解决自动导入的eslint报错
extends: ['./.eslintrc-auto-import.json'],
```
tsconfig.json添加配置

```json
"include": [
  // vue.config.js中AutoImport插件配置dts: true时需要确保该文件被include，否则ts会报错找不到模块
  "auto-imports.d.ts"
],
```