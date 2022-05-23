/**
 * 使用git commit提交代码时会触发git hooks(pre-commit)
 *
 * 配置的命令可以填多个，规则与package.json中的scripts保持一致
 */
module.exports = {
  '*.{js,jsx,vue,ts,tsx}': ['npm run lint', 'npm run release']
}
