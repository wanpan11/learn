# demo-next-cache 项目指南

## 快速参考

Next.js 16 + React 19 + TypeScript 缓存机制演示。详见 [CLAUDE.md](CLAUDE.md)。

## 常用命令

```bash
pnpm dev        # 开发服务器 http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 启动生产服务器
pnpm lint       # ESLint 检查
```

## 关键规则

<!-- BEGIN:nextjs-agent-rules -->
**This is NOT the Next.js you know**

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 架构亮点

| 路由 | 缓存策略 | 核心特性 |
|---|---|---|
| `/memoization` | 请求记忆化 | React `cache()` 去重 |
| `/data-cache` | 数据缓存 | `unstable_cache` + `tags` |
| `/full-route-cache` | 全路由缓存 | 页面级 `revalidate` |
| `/router-cache` | 路由器缓存 | 客户端 RSC 缓存 |
| `/currency` | 动态 + 数据缓存 | `cookies()` 触发动态 |
| `/currency-static/[currency]` | 静态化 | `generateStaticParams` |

## 工作区上下文

- 项目位于 `learn/` 根目录下，使用独立的 `pnpm-lock.yaml`
- `next.config.ts` 配置 `turbopack.root: "."` 确保项目隔离
- 所有页面为 async Server Component
- 数据层统一在 `lib/simulated-backend.ts`

详细说明见 [CLAUDE.md](CLAUDE.md)。
