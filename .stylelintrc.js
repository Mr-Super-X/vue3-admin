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
