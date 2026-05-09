# AGENTS

本文件用于帮助 AI 编码代理在当前仓库快速进入可执行状态。

## Project Snapshot

- 技术栈: TypeScript + React 18 + Express 4 + esbuild
- 包管理器: pnpm
- 目标: 展示手写 SSR 到 hydration 的完整链路（非框架化）
- 详细背景: [README.md](README.md)

## Essential Commands

- 安装依赖: pnpm install
- 本地开发: pnpm run dev
- 类型检查: pnpm run typecheck
- 构建客户端包: pnpm run build:client

## Architecture Map

- 服务端入口与 SSR HTML 拼装: [server.tsx](server.tsx)
- 客户端 hydration 入口: [src/client.tsx](src/client.tsx)
- 共享组件: [src/App.tsx](src/App.tsx)
- 共享类型: [src/types.ts](src/types.ts)
- 客户端打包脚本: [build-client.mjs](build-client.mjs)
- 静态资源输出目录: [public](public)

## Working Rules For Agents

- 先保持“最小改动可运行”，避免把示例项目演变为复杂脚手架。
- 涉及 SSR/CSR 对比时，必须说明首屏 HTML 来源与交互生效时机。
- 改动服务端注入数据逻辑时，确保服务端与客户端使用同一份数据结构，避免 hydration mismatch。
- 修改后至少执行类型检查；若涉及客户端入口或打包流程，同时执行 build:client。

## Known Pitfalls

- tsconfig 中 baseUrl 在新版本 TypeScript 语义下会持续提示迁移信息；当前项目通过 ignoreDeprecations 静音，后续升级需专项迁移。
- 首屏数据通过内联脚本注入，任何序列化调整都需要保证 XSS 安全转义策略不被破坏。

## Existing Specialized Agent

- 当前仓库已有 SSR 专项代理定义: [.github/agents/ssr-coach.agent.md](.github/agents/ssr-coach.agent.md)
- 适用场景: SSR 链路讲解、hydration 排查、手写 SSR 扩展重构。
