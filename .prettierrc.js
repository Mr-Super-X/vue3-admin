// https://www.prettier.cn/docs/options.html

module.exports = {
  printWidth: 120, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  singleQuote: true, // 使用单引号代替双引号
  semi: false, // 句尾添加分号
  quoteProps: 'as-needed', // （默认值）仅仅当必须的时候才会加上双引号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: 'ignore', // vue template 中的结束标签结尾尖括号掉到了下一行
  ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  jsxBracketSameLine: false, // 是否把 > 符号放在多行的 JSX 元素的最后一行
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  requireConfig: true, // 需要“prettierconfig”来格式化prettier
  stylelintIntegration: false, // 不让prettier使用stylelint的代码格式进行校验
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  vueIndentScriptAndStyle: false, // （默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
  embeddedLanguageFormatting: 'auto', // （默认值）允许自动格式化内嵌的代码块
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
}
