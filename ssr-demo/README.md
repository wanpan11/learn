# Manual SSR Demo With TypeScript

这个示例只用 Node.js + Express + React 手动实现 SSR，重点展示 SSR 的完整链路，而不是依赖 Next.js 之类的框架。

## 运行方式

```bash
pnpm install
pnpm run dev
```

浏览器打开 `http://localhost:3000`

## 这个示例体现了什么

1. 服务端在 `server.tsx` 中调用 `renderToString`，把 React 组件先渲染成 HTML。
2. 服务端把首屏数据注入到 `window.__INITIAL_DATA__`。
3. 浏览器加载 `src/client.tsx` 打包后的脚本后，调用 `hydrateRoot` 接管已有 HTML。
4. 接管完成后，按钮点击这样的交互才在客户端真正生效。

## 关键文件

- `server.tsx`: SSR 服务端入口
- `src/App.tsx`: 服务端和客户端共用的 React 组件
- `src/client.tsx`: 客户端 hydration 入口
- `src/types.ts`: 服务端和客户端共享类型
- `build-client.mjs`: 用 esbuild 打包客户端 TSX

## 请求流程

1. 浏览器请求 `/`
2. 服务端创建初始数据
3. 服务端执行 React 渲染并返回完整 HTML
4. 浏览器先看到首屏内容
5. 浏览器下载并执行客户端脚本完成 hydration
6. 页面获得交互能力
