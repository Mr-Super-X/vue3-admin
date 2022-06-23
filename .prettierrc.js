// https://www.prettier.cn/

module.exports = {
  printWidth: 120, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  singleQuote: true, // 使用单引号代替双引号
  semi: false, // 句尾添加分号
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  stylelintIntegration: false, // 不让prettier使用stylelint的代码格式进行校验
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  requireConfig: false, // Require a 'prettierconfig' to format prettier
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
}
