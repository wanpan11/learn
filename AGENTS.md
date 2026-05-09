# AGENTS.md

快速参考文件。完整说明见 [CLAUDE.md](CLAUDE.md)。

## 仓库结构

学习/练习仓库，每个顶级目录是独立子项目，各自有 `package.json`。

| 目录 | 说明 | 包管理器 | 模块系统 |
|------|------|----------|----------|
| `AST/` | Babel AST 转换 | npm | CommonJS |
| `server/` | Node.js 服务端示例 | npm | CommonJS |
| `ssr-demo/` | TypeScript + React 18 + Express SSR | pnpm | ESM |
| `case/` | 实用工具脚本 | — | CommonJS |
| `demo/` | 学习练习（含 `test-demo/`） | — | CommonJS |
| `utils/` | 通用工具方法 | — | CommonJS |

## 常用命令

- 根目录: `npm run lint`（ESLint，规则宽松）
- ssr-demo: `pnpm install` / `pnpm run dev` / `pnpm run build:client` / `pnpm run typecheck`
- AST: `cd AST && npm install && node index.js`（端口 4999）
- 详见各子项目的 CLAUDE.md 或 README

## 关键规则

- 回复使用中文
- 子项目间依赖隔离，不提升到根目录
- `ssr-demo/` 是最完整的项目，有独立的 CLAUDE.md 和 AGENTS.md
- 无测试框架，`demo/test-demo/` 中的文件用 `node` 单独运行
