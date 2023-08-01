// https://github.com/conventional-changelog/commitlint
const getConfig = require('commitlint-config-cz/lib/config').get
const czConfig = require('./.cz-config.js')

const defaultConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
  },
}

// 合并cz配置
const config = getConfig(czConfig, defaultConfig)

module.exports = config
