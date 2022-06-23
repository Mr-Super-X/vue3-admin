const msg = require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim()

/**
 * 匹配以下四种类型，类型 + 冒号 + 空格 + 1~50个文字描述
 *
 * [!]: Bug修改
 * [+]: 新增功能
 * [*]: 常规修改
 * [-]: 删除功能
 */
const commitRE = /^(\[\+\]|\[!\]|\[\*\]|\[-\])(\(.+\))?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log('git commit信息校验不通过')

    console.log(`git commit信息正确格式为：类型 + 冒号(不能用中文输入法键入) + 空格 + 1-50个文字描述

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
