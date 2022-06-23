/**
 * 使用git commit提交代码时会触发git hooks(pre-commit)
 *
 * 之所以能在package.json中配置githooks生效，是因为使用vue-create创建的项目会安装
 * 尤大fork自husky的yorkie包，使用起来更方便
 *
 * 配置的命令可以填多个，使用数组即可
 */
module.exports = {
  // 对匹配的文件执行eslint检测
  '*.{js,jsx,vue,ts,tsx}': ['npm run lint']
}
