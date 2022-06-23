/*
 * @Description: 自定义验证commit msg功能
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-06-23 17:21:54
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-06-23 17:57:35
 * @FilePath: \vue3-admin\verifyCommit.js
 */

const msg = require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim()

/**
 * 正则匹配以下四种类型，类型 + 冒号 + 空格 + 1~100个文字描述
 *
 * [!]: Bug修改
 * [+]: 新增功能
 * [*]: 常规修改
 * [-]: 删除功能
 */
const commitRE = /^(\[\+\]|\[!\]|\[\*\]|\[-\])(\(.+\))?: .{1,100}/
// 正则匹配合并代码，以Merge pull request或者Merge branch开头
const mergeRe = /^(Merge pull request|Merge branch)/

if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log('git commit信息校验不通过')

    console.log(`git commit信息正确格式为：类型 + 冒号(不能用中文输入法键入) + 空格 + 1-100个文字描述

      例如：

      [!]: Bug修改
      [+]: 新增功能
      [*]: 常规修改
      [-]: 删除功能
    `)
    process.exit(1)
  }
} else {
  console.log('git commit信息校验通过')
}
