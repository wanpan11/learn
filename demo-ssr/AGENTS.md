# demo-ssr 项目指南

## 快速参考

这是一个使用 TypeScript、React 18、Express 4 和 esbuild 搭建的手写 SSR 示例项目，重点展示从服务端渲染到客户端 hydration 的完整链路。详见 [CLAUDE.md](CLAUDE.md)。

## 常用命令

```bash
pnpm install
pnpm run dev
pnpm run build:client
pnpm run typecheck
```

修改客户端入口或构建配置后，需执行 `pnpm run build:client`；修改服务端或共享代码后，需执行 `pnpm run typecheck`。详见 [CLAUDE.md](CLAUDE.md)。

## 架构概览

| 路径 | 作用 |
|------|------|
| [server.tsx](server.tsx) | Express 服务入口，负责 SSR、内联初始数据和静态资源服务 |
| [src/client.tsx](src/client.tsx) | 客户端 hydration 入口，读取服务端注入的数据并挂载事件 |
| [src/App.tsx](src/App.tsx) | 服务端与客户端共用的 React 组件 |
| [src/types.ts](src/types.ts) | 服务端与客户端共享类型和 `INITIAL_DATA_KEY` 常量 |
| [build-client.mjs](build-client.mjs) | esbuild 打包脚本，输出 [public/client.js](public/client.js) |
| [public/style.css](public/style.css) | 手写样式文件 |

详见 [CLAUDE.md](CLAUDE.md)。

## 关键规则

- 保持“最小改动可运行”，不要把示例项目扩展成复杂脚手架。
- 涉及 SSR/CSR 对比时，必须明确首屏 HTML 的生成位置和交互生效时机。
- 服务端和客户端必须共用 [src/types.ts](src/types.ts) 中的类型与常量，避免 hydration mismatch。
- 调整初始数据注入逻辑时，必须保留现有的安全转义策略，避免引入 XSS 风险。
- 不要直接编辑 [public/client.js](public/client.js)，源文件应修改 [src/client.tsx](src/client.tsx) 或相关共享代码。

详见 [CLAUDE.md](CLAUDE.md)。
