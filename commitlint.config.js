module.exports = {
  extends: [
    // '@commitlint/config-conventional',
    'cz',
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      // ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
      ['dddd'],
    ],
  },
}
