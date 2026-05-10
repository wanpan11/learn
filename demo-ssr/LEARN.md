# SSR 逐步学习指南

按顺序阅读，每章聚焦一个核心概念。

---

## 第 1 步 — 跑起来

```bash
cd demo-ssr
pnpm install
pnpm run dev
```

浏览器打开 `http://localhost:3000`，做两件事：

1. **右键 → 查看网页源代码** — 内容已经在 HTML 里了（不是空的 `<div id="root"></div>`）
2. **点击按钮** — 能计数，说明 hydration 成功

---

## 第 2 步 — 服务端渲染

核心就一行：[server.tsx:17](server.tsx#L17)

```ts
const appHtml = renderToString(<App initialData={initialData} />);
```

在 Node.js 里执行 React 组件，输出 HTML 字符串。

然后拼成完整 HTML 返回给浏览器（[server.tsx:19-34](server.tsx#L19-L34)）：

```html
<div id="root">${appHtml}</div>           <!-- 服务端渲染的内容 -->
<script>window.__INITIAL_DATA__ = ...</script>  <!-- 传数据给客户端 -->
<script src="/client.js"></script>              <!-- 客户端 JS -->
```

**动手**：修改 `createInitialData()` 里的 `message`，重启看变化。

---

## 第 3 步 — 共享代码

SSR 的核心：**同一份代码跑两次**。

- [src/types.ts](src/types.ts) — 服务端和客户端共用的类型，保证数据结构一致
- [src/App.tsx](src/App.tsx) — 服务端 `renderToString` 用它生成 HTML，客户端 `hydrateRoot` 用它接管 HTML

**关键原则**：服务端和客户端必须用完全相同的数据结构，否则 hydration 会报错。

**动手**：只改 `types.ts` 里的 `INITIAL_DATA_KEY` 值，观察页面是否还正常。

---

## 第 4 步 — Hydration（注水）

核心就一行：[src/client.tsx:18](src/client.tsx#L18)

```ts
hydrateRoot(rootElement, <App initialData={initialData} />);
```

Hydration **不是重新渲染**，而是：
1. React 遍历已有的 DOM
2. 把事件处理器（`onClick`）挂上去
3. 建立内部状态（`useState`）

所以 hydration 前：页面可见但按钮不工作。hydration 后：按钮可点击。

**动手**：注释掉 `hydrateRoot` 调用，重新构建，点击按钮试试。

---

## 第 5 步 — 客户端打包

[build-client.mjs](build-client.mjs) 用 esbuild 把 `src/client.tsx` 及其依赖打包成一个 `public/client.js`。

为什么服务端不需要打包？因为服务端用 `tsx` 直接运行 TypeScript，而浏览器不能。

**动手**：在 `build-client.mjs` 中把 `bundle` 改为 `false`，重新构建看看区别。

---

## 第 6 步 — 完整流程

```
浏览器 GET / ──→ 服务端 renderToString ──→ 返回 HTML（用户立刻看到内容）
                                                ↓
                      浏览器下载 client.js ──→ hydrateRoot（按钮变得可点击）
```

T1（看到内容）到 T3（可交互）之间叫 **hydration gap**。

**动手**：开发者工具 Network 标签里把 `client.js` 设为 Slow 3G，感受这个 gap。

---

## 第 7 步 — 思考

**这个项目手动做的事 vs 框架帮你的：**

| 手动 | Next.js |
|------|---------|
| `renderToString` | 自动 SSR |
| `window.__INITIAL_DATA__` | `getServerSideProps` / RSC |
| `build-client.mjs` | 内置打包 |
| `hydrateRoot` | 自动 hydration |

**下一步可以学：**
- Streaming SSR（`renderToPipeableStream`）
- 客户端路由（React Router）
- 对比 Next.js 实现同样功能

---

## 文件速查

| 文件 | 干什么 |
|------|--------|
| [server.tsx](server.tsx) | Express 服务，调 `renderToString` |
| [src/types.ts](src/types.ts) | 共享类型和常量 |
| [src/App.tsx](src/App.tsx) | 服务端/客户端共用组件 |
| [src/client.tsx](src/client.tsx) | 调 `hydrateRoot` 接管 HTML |
| [build-client.mjs](build-client.mjs) | esbuild 打包客户端 |
