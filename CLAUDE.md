# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概览

一个学习/练习仓库，涵盖 JavaScript、Node.js、AST、SSR、流、算法等内容。每个顶级目录都是独立的子项目，各自拥有自己的 `package.json`，没有 monorepo 工具串联。

## 常用命令

**根目录（仅 lint）：**

- `npm run lint` — 使用 `@antfu/eslint-config` 的 ESLint（规则宽松：`no-console`、`no-debugger`、`no-unused-vars` 均允许）

**demo-ssr/（TypeScript + React 18 + Express）：**

- `pnpm install` / `pnpm run dev` / `pnpm run build:client` / `pnpm run typecheck`
- 详见 [demo-ssr/CLAUDE.md](demo-ssr/CLAUDE.md)

**demo-next-cache/（Next.js 16 + React 19 + TypeScript）：**

- `pnpm install` / `pnpm dev` / `pnpm build` / `pnpm lint`
- 详见 [demo-next-cache/CLAUDE.md](demo-next-cache/CLAUDE.md)

**AST/（Babel AST 转换）：**

- `npm install` 然后 `node index.js` — 启动 Express 服务，端口 4999

**server/（Node.js 服务端示例）：**

- `npm install` 然后运行各文件：`node server_demo/express_server.js`、`node socket/index.js` 等

**根目录脚本：**

- `npm run start:car` — 运行车牌号 CSV 计算器

## 架构

**子项目隔离：** 每个目录（`AST/`、`server/`、`demo-ssr/`、`demo-next-cache/`、`case/`、`demo/`、`utils/`）都是自包含的。依赖按子项目安装，不提升到根目录。在子项目中工作时，需 `cd` 进入对应目录并使用其自身的包管理器（大部分用 npm，demo-ssr 和 demo-next-cache 用 pnpm）。

**模块系统混用：**

- 根目录、`AST/`、`server/` — CommonJS（`require`/`module.exports`）
- `demo-ssr/`、`demo-next-cache/` — ESM（`import`/`export`）

**无测试框架** — 根目录的 `test` 脚本是占位符。`demo/test-demo/` 包含独立的 JS 文件，用 `node` 单独运行以学习 JS 概念（非自动化测试）。

**重点子项目：demo-ssr/** — 最完整的项目。手写 SSR + React 18 hydration + esbuild 打包 + Express 服务。拥有独立的 CLAUDE.md 和 AGENTS.md，包含详细架构和踩坑记录。

## 约定

- 代码注释和 README 使用中文
- ESLint 规则宽松 — 这是学习仓库，非生产代码
- 无 CI/CD、无 Docker、无 `.env` 文件
- 根目录的 lock 文件被 gitignore；`demo-ssr/` 和 `demo-next-cache/` 提交了 `pnpm-lock.yaml`

## 回复语言

请使用中文回复。