# check-node-version 说明

不知道你有没有遇到过这样的场景，在接手一个新项目时安装完开发环境后运行npm install总是装不了依赖，然后百般折腾后发现原来是node版本不匹配，浪费不少时间在启动项目上。

另一种场景是团队成员node版本不同，导致安装依赖时package-lock锁包版本不同，当对方提交代码后你拉取代码发现又遇到了问题，然后一顿折腾。

这也是为什么需要在工程中建立强制限制node版本的原因。

## 接入

安装依赖

> npm i semver -D --force

- semver 用于检查是否符合[Semantic Versioning](https://semver.org/)规范

项目根目录下创建check-node-version.js

```javascript
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
```

配置package.json文件

```json
{
   "name": "my package",
   "scripts": {
     "check-node-version": "node check-node-version.js",
     "postinstall": "npm run check-node-version"
   },
   "engines": {
     "node": ">=16.0.0"  // 按照自己的需求配置
   }
}
```

完成以上配置后，执行 npm install 时，node版本不符合的安装将会被拦截。
