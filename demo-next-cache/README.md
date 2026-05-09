# demo-next-cache

基于 Next.js + TypeScript 的缓存能力演示项目，覆盖：

- 请求记忆化（Request Memoization）
- 数据缓存（Data Cache）
- 全路由缓存（Full Route Cache）
- 路由器缓存（Router Cache）
- Cookie 多币种缓存策略（动态渲染 + 数据缓存）

## 启动

```bash
pnpm dev
```

打开 `http://localhost:3000`。

## 路由说明

- `/memoization`：同次渲染重复调用同参数函数，仅触发一次真实数据源请求
- `/data-cache`：`unstable_cache + revalidate + revalidateTag`
- `/full-route-cache`：`revalidate = 90` 的整页缓存示例
- `/router-cache`：客户端路由缓存体验入口（Step A / Step B）
- `/currency`：Cookie 读币种，页面动态渲染，但数据按币种参数缓存

## 生产模式验证建议

开发模式下部分缓存行为会弱化。建议在生产模式验证：

```bash
pnpm build
pnpm start
```

重点观察：

- `/memoization`：一次请求中的两次调用只增加一次真实命中
- `/data-cache`：60 秒内重复访问命中缓存；点击按钮后立即失效
- `/full-route-cache`：90 秒内页面渲染时间戳不变
- `/currency`：不同 Cookie 币种对应不同缓存条目
