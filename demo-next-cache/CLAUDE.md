# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概览

Next.js 16 + React 19 + TypeScript 的缓存机制演示项目，通过 5 个独立路由分别展示请求记忆化、数据缓存、全路由缓存、路由器缓存、Cookie 多币种缓存策略。UI 和文档使用中文。

## 常用命令

```bash
pnpm dev        # 开发服务器 http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 启动生产服务器
pnpm lint       # ESLint 检查
```

无测试框架。验证缓存行为建议使用生产模式：`pnpm build && pnpm start`。

## 工作区上下文

本项目位于上层 `learn/` 目录内，该目录包含多个独立子项目。`next.config.ts` 中设置了 `turbopack.root: "."` 以确保 Next.js 正确识别项目根目录，避免误用上层目录的 lockfile。

## 重要：Next.js 版本注意事项

本项目使用 Next.js 16.2.6，API、约定和文件结构可能与旧版本不同。编写代码前请先阅读 `node_modules/next/dist/docs/` 中的相关指南，注意废弃通知。

## 架构

**路由结构（App Router）：**

| 路由 | 缓存策略 | 关键 API |
|---|---|---|
| `/memoization` | 请求记忆化 | React `cache()` 包裹函数，同渲染周期同参数只触发一次后端调用 |
| `/data-cache` | 数据缓存 | `unstable_cache` + `revalidate: 60` + `tags` + `revalidateTag` |
| `/full-route-cache` | 全路由缓存 | 页面级 `revalidate = 90` 导出 |
| `/router-cache` | 路由器缓存 | 在 step-a / step-b 间导航，体验客户端 RSC payload 缓存 |
| `/currency` | 动态渲染 + 数据缓存 | `cookies()` 读币种使页面动态化，`unstable_cache` 按币种参数缓存 |

**数据层：** `lib/simulated-backend.ts` 是唯一的后端模拟，提供三个带延迟和命中计数的异步函数（`fetchProfileFromOrigin`、`fetchNewsFromOrigin`、`fetchCurrencyPrices`），所有页面共享。

**代码约定：**

- 所有页面为 async Server Component，无 `"use client"` 指令
- Server Action 放在路由目录下的 `actions.ts` 中，标记 `"use server"`
- 样式使用 Tailwind v4 工具类（通过 `@tailwindcss/postcss`）
- 路径别名 `@/*` 映射到项目根目录
- 包管理器为 pnpm
