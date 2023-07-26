/**
 * @description 检查本地node版本是否符合项目node版本要求，不符合则拦截 install，支持npm yarn
 *
 * 步骤：
 *  1. 安装依赖：npm i @babel/node semver -D
 *  2. package.json script配置脚本
 *
 *      "check-node-version": "babel-node check-node-version.mjs",
 *      "postinstall": "npm run check-node-version"
 *
 *     增加engines，按需求修改
 *
 *      "engines": {
 *        "node": ">=16.0.0 <17.0.0"
 *      }
 *  3. 将该文件放在项目根目录下
 */
import semver from 'semver'
import fs from 'fs'

const packageJson = fs.readFileSync('./package.json', 'utf8')
const packageObj = JSON.parse(packageJson)
const version = packageObj.engines.node

console.log('项目规定 node 版本：' + version)
console.log('当前本地 node 版本：' + process.version)

if (!semver.satisfies(process.version, version)) {
  console.log(`node 版本校验不通过，所需的 node 版本 ${version} 不匹配当前版本 ${process.version}.`)
  process.exit(1)
} else {
  console.log('node 版本校验通过')
}
