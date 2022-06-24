module.exports = {
  // 继承cz配置，依赖commitlint-config-cz包（实测这两个都要写，否则不生效）
  extends: ['@commitlint/config-conventional', 'cz'],
}
