const msg = require('fs')
  .readFileSync('.git/COMMIT_EDITMSG', 'utf-8')
  .trim()

const commitRE = /^(revert: )?('[+]'|'[!]'|'[*]'|'[-]')(\(.+\))?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log('git commit信息校验不通过')

    console.error(`git commit的信息格式不对, 需要使用 title(scope): desc的格式
      比如 [!]: 修复Bug
      [+](test): 添加新功能
      具体校验逻辑看 verifyCommit.js
    `)
    process.exit(1)
  }
} else {
  console.log('git commit信息校验通过')
}
