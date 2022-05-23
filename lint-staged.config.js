/**
 * 使用git commit提交代码时会触发git hooks(pre-commit)
 *
 * 配置的命令可以填多个，使用数组即可
 */
module.exports = {
  '*.{js,jsx,vue,ts,tsx}': ['prettier --ignore-unknown --write', 'eslint --fix', 'npm run lint']
}
