# 代码规范与工程架构

优秀的后台项目离不开标准化的代码约束和对提交管理的限制。`vue3-admin` 致力于“约定大于配置”理念。

## 1. 代码格式化与Lint规则

项目内置了三大检查利器保障编写质量：

### TypeScript / Vue 代码验证机制 (ESlint)
- 利用 `eslint`、`eslint-plugin-vue` 和 `@vue/eslint-config-typescript` 来约束所有的 ts、vue 文件，检查语法问题、无用变量或高危写法等。
- 如项目中的配置：`lintOnSave: false` 等不阻塞热更新，但在提交和发包时通过 Lint 校验确保底层安全。

### 样式格式约束 (Stylelint)
- 增加了 `stylelint` 以及大量标准插件如 `stylelint-config-standard-scss` 和 `stylelint-config-recess-order` 不仅仅解决样式正确与格式一致性，还帮助实现 CSS 内部语法的严格排序规则，让 CSS 的阅读更合乎逻辑。
- 允许通过 `npm run stylelint:fix` 进行快速纠正样式文件。

### 代码美化格式对齐 (Prettier)
- 提供统一对齐标准，消除“制表符 VS 空格”、“双引号 VS 单引号”之争，作为所有检查工具的格式兜底。

## 2. Git Commit 规约 (Husky 与 Commitizen)

对于 Git 的追踪防范，项目中引入了以下插件联合机制卡住代码的合规性：

1. **`lint-staged`** 搭配 pre-commit (基于环境的 `gitHooks` 或者 husky)：
   - 当你在控制台输入 `git commit -m "xxx"` 点击提交前，自动化触发机制会检测当前 `Stash` 需要暂存的文件，如果代码里面存在显而易见的 Eslint 或 Stylelint 错误则中断提交。

2. **自定义 Commit 指令化 (`cz`)**
   - 抛弃了传统的自发想撰写 Git 信息的方式，配置了 `commitizen` 及 `cz-customizable`。
   - 当开发者完成特性应该在终端执行 `npm run commit` （或者 `npm run push`）。
   - 系统将跳开命令行文字撰写，而是一步步地通过下拉询问你：
     - 这是什么类型的更改？ (feat: 特性, fix: 修复, docs: 文档, style: 格式优化, refactor: 重构...)
     - 涉及的具体模块名？
     - 提交详情概述是什么？
     - 需求/缺陷对应的关联单号是多少？
   - 这对于日后如果利用工具生成全局 `Changelog` （发布版本变更日记）非常有利。目前项目 `package.json` 中的 `npm run release` 即支持这种自动化发版和 CHANGELOG的编写流程。