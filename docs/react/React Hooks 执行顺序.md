# React Hooks 执行顺序简明版

## 执行流程总览

```text
初始渲染
  ↓
useInsertionEffect（同步，DOM 更新前）
  ↓
DOM 更新（同步）
  ↓
useLayoutEffect（同步，DOM 更新后、绘制前）
  ↓
浏览器绘制（Paint）
  ↓
useEffect（异步，绘制后，MessageChannel 调度）
```

---

## 三个 Hook 的核心差异

### 1. useInsertionEffect

- 执行：同步，直接调用
- 时机：DOM mutation 前
- DOM 访问：通常不可用（`ref.current` 还没就绪）
- 作用：给 CSS-in-JS 提前注入样式，避免样式闪动

```tsx
useInsertionEffect(() => {
  const style = document.createElement("style");
  style.textContent = "body { color: blue; }";
  document.head.appendChild(style);
}, []);
```

关键路径：

```text
commitBeforeMutationEffects() -> useInsertionEffect
commitMutationEffects() -> DOM 更新
```

### 2. useLayoutEffect

- 执行：同步，直接调用
- 时机：DOM 更新后、浏览器绘制前
- DOM 访问：可用
- 风险：会阻塞绘制，逻辑过重会拖慢首屏
- 作用：测量布局、同步修正 UI，减少可见闪烁

```tsx
useLayoutEffect(() => {
  const height = ref.current?.offsetHeight;
  setHeight(height);
}, []);
```

关键路径：

```text
commitMutationEffects() -> DOM 更新
commitLayoutEffects() -> useLayoutEffect
schedulePassiveEffects() -> 调度 useEffect
```

### 3. useEffect

- 执行：异步
- 时机：浏览器绘制后
- 调度：Scheduler + MessageChannel
- DOM 访问：可用，且不阻塞绘制
- 作用：请求、订阅、日志、定时器等副作用

```tsx
useEffect(() => {
  fetchData();
}, []);
```

#### 回调收集（render/commit）

```text
Render Phase:
  useEffect 回调被记录到 fiber effect 链表（passive effect）

Commit Phase:
  先完成 mutation/layout
  再把 passive effects 交给 Scheduler
```

#### 回调执行（Scheduler 触发）

```text
scheduleCallback(..., flushPassiveEffects)
  -> MessageChannel.postMessage
  -> 事件循环触发 flushPassiveEffects
  -> commitPassiveMountEffects
  -> 遍历 effect 链表并执行 effect.create()
```

一句话：`useEffect` 回调先被收集，再由 `flushPassiveEffects` 在绘制后统一执行。

---

## 时间线（示意）

```text
t=0ms   Render 开始
t=0.1   useInsertionEffect + DOM mutation
t=0.2   useLayoutEffect（仍是同步）
t=0.3   浏览器开始绘制
t=1.5   MessageChannel 任务出队
t=1.6   useEffect 执行
```

结论：`useEffect` 相比前两个 Hook 是“绘制后延迟执行”。

---

## 对比表

| 属性 | useInsertionEffect | useLayoutEffect | useEffect |
| --- | --- | --- | --- |
| 执行性质 | 同步 | 同步 | 异步 |
| 实现机制 | 直接调用 | 直接调用 | MessageChannel 调度 |
| 执行时机 | DOM 更新前 | DOM 更新后、绘制前 | 绘制后 |
| DOM 访问 | 通常不可用 | 可用 | 可用 |
| 是否阻塞绘制 | 会（但在绘制前） | 会（需谨慎） | 不会 |
| 典型用途 | 样式注入 | 布局测量/同步修正 | 数据请求/订阅/副作用 |

---

## 最短记忆版

- `useInsertionEffect`：最早，同步，给样式系统用。
- `useLayoutEffect`：中间，同步，读写布局但会阻塞绘制。
- `useEffect`：最晚，异步，绘制后执行，大多数副作用优先用它。

---

## 本次更新优先级结论

- `useInsertionEffect`：不能调用 `setState`，不讨论“是否同步更新/是否优先于本次更新”。
- `useLayoutEffect`：在这里触发的 `setState` 会在浏览器本次绘制前处理，效果上优先于本次可见更新（通常看不到中间态）。
- `useEffect`：在这里触发的 `setState` 不会优先于本次可见更新；它发生在绘制后，属于下一轮更新。

一句话：若只看“会不会抢在本次画面前生效”，结论是 `useLayoutEffect` 会，`useEffect` 不会，`useInsertionEffect` 不允许 `setState`。
