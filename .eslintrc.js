// http://eslint.cn/
// https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration.html

module.exports = {
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。
  // 如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。
  // 为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件
  // 或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。
  // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 指定你想启用的环境
  env: {
    node: true,
    browser: true,
  },
  // 指定继承的规则
  // plugin:vue/vue3-essential 为vue-cli设计的vue3官方eslint插件
  // plugin:prettier/recommended 作用是解决prettier和eslint冲突，需要安装eslint-plugin-prettier
  // .eslintrc-auto-import.json 由AutoImport插件自动生成，参考vue.config.js配置eslintrc.enabled，解决自动导入的eslint报错
  extends: ['plugin:vue/vue3-essential', 'plugin:prettier/recommended', './.eslintrc-auto-import.json'],
  // 指定你想要支持的 JavaScript 语言选项。
  // 默认情况下，ESLint 支持 ECMAScript 5 语法。你可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持
  parserOptions: {
    // 解决eslint报错Parsing error: '>' expected
    // 该错误是由设置顶层parser的"plugin:@typescript-eslint/recommended"引起的，它与Vue的vue-eslint-parser冲突
    // 参考：https://www.jianshu.com/p/73d169024a20
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  // rules 属性可以做下面的任何事情以扩展（或覆盖）规则：
  // 启用额外的规则
  // 改变继承的规则级别而不改变它的选项
  // 覆盖基础配置中的规则的选项
  rules: {
    // 生产环境使用console报警告，开发环境关闭
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 生产环境使用debugger报警告，开发环境关闭
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭在ts中使用require的警告
    '@typescript-eslint/no-var-requires': ['off'],
    // 关闭在ts中使用any类型时的警告
    '@typescript-eslint/no-explicit-any': ['off'],
    // 关闭检测组件名称是否使用驼峰或多单词命名
    'vue/multi-word-component-names': 0,
    // 关闭使用symbol时一定要传入描述
    'symbol-description': 0,
  },
  // 解决使用未导入的全局变量报错
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  // 禁用一组文件的配置文件中的规则
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
