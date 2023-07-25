# stylelint 说明

即便当下设备、网络、浏览器性能越来越好，在前端代码性能方面关注的更多的还是js层面。但css层面也能做很多性能优化，css属性的书写顺序、选择器使用等，都会对整体应用性能产生影响。所以配置一套完善的css代码书写规范可以有效提升应用的性能，而stylelint就是现在比较流行的csslint库。

## 接入

- 安装依赖

> npm i stylelint stylelint-config-standard stylelint-config-prettier stylelint-order stylelint-config-recess-order stylelint-config-standard-scss stylelint-config-recommended-vue stylelint-less -D --force

在根目录新增 .stylelintrc.js文件，添加配置

```javascript
// @see: https://stylelint.io/user-guide/get-started
module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展css插件
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue', // vue项目需要添加
  ],
  plugins: ['stylelint-less'], // 配置对less的支持
  rules: {
    'selector-class-pattern': null, // 设置类名选择器不遵循 kebab-case
    'keyframes-name-pattern': null, // 设置keyframes动画名选择器不遵循 kebab-case
    'custom-property-pattern': null, // 设置自定义属性如--next-bg-menuBar不遵循 kebab-case
    'at-rule-no-unknown': null, // 关闭使用@use引入文件的错误提示
    'scss/at-extend-no-missing-placeholder': null, // 设置scss @extend继承错误提示
  },
}
```

- 设置保存自动修复

一般希望在保存文件css文件后自动修复css中的不合理的地方，在vscode扩展商店中安装stylelint后，需要修改一下 .vscode/settings.json 文件。

因为要使用stylelint的规则格式化代码，不使用prettier来格式化css、less、scss文件了，删除掉 .vscode/settings.json中配置的使用prettier格式化css、less、scss的配置。

```json
  // 删除相关代码
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

在 .vscode/settins.json 新增stylelint保存文件格式化样式文件配置。

```json
{
  // ...
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true // 开启stylelint自动修复
  },
  // 关闭编辑器内置样式检查（避免与stylelint冲突）
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  // 配置stylelint检查的文件类型范围
  "stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"],
  // ...
}
```

在 .vscode/settings.json 文件中添加上面styleint保存后自动修复配置代码后，来到相应的css文件，按ctrl+s保存代码即可体验效果。

- 将stylelint加入lint-staged

修改lint-staged.config文件，添加以下配置

```javascript
module.exports = {
  // ...
  // 对src中的css,less,scss进行stylelint修复
  'src/**/*.{css,less,scss}': ['stylelint --fix', 'npm run stylelint'],
}
```

完成后即可体验仅对本次提交文件进行修复和检测，如需全量修复文件，可手动执行以下命令：

> npx stylelint "src/**/*.{css,less,scss}" --fix
