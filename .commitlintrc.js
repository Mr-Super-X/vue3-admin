module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ]
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: '新增功能',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: '修复 bug',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: '文档变更',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description: '代码格式（不影响功能，例如空格、分号等格式修正）',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description: '代码重构（不包括 bug 修复、功能新增）',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: '性能优化',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: '添加缺失的测试或纠正现有的测试',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description: '构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
            title: 'Builds',
            emoji: '🛠'
          },
          ci: {
            description: '对 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs）',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: '对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: '恢复之前的提交',
            title: 'Reverts',
            emoji: '🗑'
          }
        }
      },
      scope: {
        description: '此更改的范围是什么（例如组件或文件名）'
      },
      subject: {
        description: '填写简短精炼的变更描述'
      },
      body: {
        description: '提供更详细的更改说明'
      },
      isBreaking: {
        description: '有什么重大变化吗？'
      },
      breakingBody: {
        description: '一个 BREAKING CHANGE 提交需要一个主体(body)。 请输入对提交本身的更详细描述'
      },
      breaking: {
        description: '列举非兼容性重大的变更'
      },
      isIssueAffected: {
        description: '此更改是否会影响任何未解决的问题？'
      },
      issuesBody: {
        description: '如果问题已关闭，则提交需要一个主体(body)。 请输入更加详细的变更描述'
      },
      issues: {
        description: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34'
      }
    }
  }
}
