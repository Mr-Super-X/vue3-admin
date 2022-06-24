// 'use strict'

// // 官方示例：https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js
// module.exports = {
//   // type 类型（定义之后，可通过上下键选择）
//   types: [
//     { value: 'feat', name: 'feat: 新增功能' },
//     { value: 'fix', name: 'fix: 修复 bug' },
//     { value: 'docs', name: 'docs: 文档变更' },
//     {
//       value: 'chore',
//       name: 'chore: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'
//     },
//     {
//       value: 'style',
//       name: 'style: 代码格式（不影响功能，例如空格、分号等格式修正）'
//     },
//     {
//       value: 'refactor',
//       name: 'refactor: 代码重构（不包括 bug 修复、功能新增）'
//     },
//     { value: 'perf', name: 'perf: 性能优化' },
//     { value: 'test', name: 'test: 添加、修改测试用例' },
//     {
//       value: 'build',
//       name: 'build: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）'
//     },
//     { value: 'ci', name: 'ci: 修改 CI 配置、脚本' },
//     {
//       value: 'test',
//       name: 'test: 添加缺失的测试或纠正现有的测试'
//     },
//     { value: 'revert', name: 'revert: 回滚 commit' }
//   ],
//   // scope 类型（定义之后，可通过上下键选择）
//   scopes: [
//     ['other', '其他修改'],
//     ['assets', '样式/图片/媒体资源 相关'],
//     ['components', '公共组件 相关'],
//     ['mock', 'mock 相关'],
//     ['request', 'request 请求相关'],
//     ['router', 'router 相关'],
//     ['store', 'store 相关'],
//     ['utils', 'utils 相关'],
//     ['views', 'views 相关'],
//     ['tests', 'tests 相关'],
//     // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
//     ['custom', '以上都不是？我要自定义']
//   ].map(([value, description]) => {
//     return { value, name: `${value.padEnd(30)} (${description})` }
//   }),
//   // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
//   // allowCustomScopes: true,

//   allowTicketNumber: false,
//   isTicketNumberRequired: false,
//   ticketNumberPrefix: 'TICKET-',
//   ticketNumberRegExp: '\\d{1,5}',

//   // 针对每一个 type 去定义对应的 scopes，例如 fix /*
//   // scopeOverrides: {
//   //   fix: [{ name: 'merge' }, { name: 'style' }, { name: 'e2eTest' }, { name: 'unitTest' }]
//   // },

//   // 交互提示信息
//   messages: {
//     type: '确保本次提交遵循 Angular 规范！文档：https://github.com/angular/angular/blob/main/CONTRIBUTING.md \n选择你要提交的类型：',
//     scope: '\n选择一个scope（可选）：',
//     // 选择 scope: custom 时会出下面的提示 customScope: '请输入自定义的 scope：',
//     customScope: '表示此更改的范围：',
//     subject: '填写简短精炼的变更描述：\n',
//     body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
//     breaking: '列举非兼容性重大的变更（可选）：\n',
//     footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
//     confirmCommit: '确认提交? (y/n)'
//   },
//   // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
//   allowBreakingChanges: ['feat', 'fix'],
//   // 跳过要询问的步骤
//   // skipQuestions: ['body', 'footer'],
//   subjectLimit: 100, // subject 限制长度
//   breaklineChar: '|' // 换行符，支持 body 和 footer
//   // footerPrefix : 'ISSUES CLOSED:'
//   // askForBreakingChangeFirst : true,
// }

'use strict'

module.exports = {
  types: [
    { value: '特性', name: '特性:    一个新的特性' },
    { value: '修复', name: '修复:    修复一个Bug' },
    { value: '文档', name: '文档:    变更的只有文档' },
    { value: '格式', name: '格式:    空格, 分号等格式修复' },
    { value: '重构', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '性能', name: '性能:    提升性能' },
    { value: '测试', name: '测试:    添加一个测试' },
    { value: '工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: '回滚', name: '回滚:    代码回退' },
  ],

  scopes: [{ name: '模块1' }, { name: '模块2' }, { name: '模块3' }, { name: '模块4' }],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],

  // limit subject length
  subjectLimit: 100,
}
