/**
 * 使用git commit提交代码时会触发git hooks(pre-commit)
 *
 * 配置的命令可以填多个，使用数组即可
 */
module.exports = {
  // 对匹配的文件执行prettier格式化、eslint修复，再进行eslint检测，如果还有不通过的则需要自己手动修复
  '*.{js,jsx,vue,ts,tsx}': ['prettier --ignore-unknown --write', 'eslint --fix', 'npm run lint']
}
