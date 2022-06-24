'use strict'

// 官方示例：https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js
module.exports = {
  // type 类型（定义之后，可通过上下键选择）
  types: [
    { value: 'tt', name: 'tt     ✨: 新功能' },
    { value: 'dd', name: 'dd     🐛: 修复' },
  ],

  // 交互提示信息
  messages: {
    type: '确保本次提交遵循 Angular 规范！文档：https://github.com/angular/angular/blob/main/CONTRIBUTING.md \n选择你要提交的类型（必选）：',
    scope: '选择一个影响范围（可选）：',
    // 选择 scope: custom 时会出下面的提示 customScope: '请输入自定义的 scope：',
    customScope: '请输入文件修改范围(可选)：',
    subject: '填写简短精炼的变更描述（必填）：',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行：',
    breaking: '列举非兼容性重大的变更（可选）：',
    footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：',
    confirmCommit: '确认提交？',
  },
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过要询问的步骤
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100, // subject 限制长度
  breaklineChar: '|', // 换行符，支持 body 和 footer
  footerPrefix: 'ISSUES CLOSED:',
}
