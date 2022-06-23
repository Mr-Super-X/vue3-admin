const msg = require('fs')
  .readFileSync('.git/COMMIT_EDITMSG', 'utf-8')
  .trim()

const commitRE = /^(revert: )?(\[\+\]|\[!\]|\[\*\]|\[-\])(\(.+\))?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log('git commit信息校验不通过')

    console.error(`git commit的信息格式不对, 需要使用 type: desc的格式
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
