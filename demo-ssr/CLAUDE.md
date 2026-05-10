# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

- `pnpm install` — 安装依赖
- `pnpm run dev` — 构建客户端包并启动 SSR 服务（端口 3000，可通过 `PORT` 环境变量覆盖）
- `pnpm run build:client` — 将 `src/client.tsx` 打包为 `public/client.js`（esbuild）
- `pnpm run typecheck` — 运行 `tsc --noEmit`

修改客户端入口或构建配置后，需执行 `build:client`。修改服务端/共享代码后，需执行 `typecheck`。

`public/client.js` 是生成产物，请勿直接编辑，源文件在 `src/` 目录下。`public/style.css` 是手写的。

## 架构

手写 SSR 演示（不使用 Next.js 等框架）。TypeScript + React 18 + Express 4 + esbuild。ESM 项目（`"type": "module"`），使用 `tsx` 直接运行 TypeScript 服务端代码。

**SSR 流程：**
1. `server.tsx` — Express 服务。`GET /` 路由调用 `renderToString(<App />)` 生成 HTML，通过内联 `<script>` 注入初始数据到 `window[INITIAL_DATA_KEY]`，返回完整 HTML 响应。同时提供 `/api/data` 接口和 `public/` 静态文件服务。
2. `src/client.tsx` — 浏览器端入口。读取 `window[INITIAL_DATA_KEY]`，调用 `hydrateRoot` 将 React 事件处理器挂载到服务端渲染的 HTML 上。
3. `src/App.tsx` — 服务端和客户端共用的组件。包含 `Counter` 子组件，演示 hydration 后的交互效果（按钮在客户端 JS 加载前不可用）。
4. `src/types.ts` — 服务端和客户端共享的 `InitialData` 接口和 `INITIAL_DATA_KEY` 常量。
5. `build-client.mjs` — esbuild 配置，将客户端 TSX 打包为 `public/client.js`（ESM、es2020、automatic JSX）。

**关键约束：** 服务端和客户端必须使用相同的 `InitialData` 类型，并从 `src/types.ts` 引用 `INITIAL_DATA_KEY`（不能硬编码字符串）。任何不一致都会导致 hydration 错误。`server.tsx` 中的内联脚本序列化会对 `&`、`<`、`>` 以及行/段落分隔符进行转义以防止 XSS — 修改数据注入时需保留此逻辑。
