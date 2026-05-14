# Next.js App Router 水合机制速记

本文总结一次关于 App Router、RSC Payload 和 hydration 的讨论重点。

## 示例组件树

```tsx
<App>
  {/* 服务端组件 */}
  <ServerComponent />

  {/* 客户端组件 */}
  <ClientComponent />

  {/* 客户端组件 */}
  <ClientComponent />

  {/* 服务端组件 */}
  <ServerComponent>
    {/* 客户端组件 */}
    <ClientComponent />
  </ServerComponent>
</App>
```

核心结论：

- 服务端组件不会在浏览器里水合。
- 客户端组件会形成 client boundary，并在浏览器里水合。
- 客户端组件即使被服务端组件包裹，仍然会水合。
- 水合边界由 `'use client'` 决定，不由组件树层级决定。

## Next 客户端入口做什么

App Router 不是简单执行：

```tsx
hydrateRoot(document.getElementById('__next'), <App />)
```

更接近：

```tsx
const appElement = document
const initialServerResponse = createFromReadableStream(readable)

function ServerRoot() {
  const initialRSCPayload = use(initialServerResponse)

  return (
    <AppRouter
      actionQueue={createActionQueueFrom(initialRSCPayload)}
      globalErrorComponentAndStyles={initialRSCPayload.G}
      assetPrefix={initialRSCPayload.p}
    />
  )
}

hydrateRoot(document, <ServerRoot />)
```

重点：

- App Router 下的 `rootElement` 是 `document`，不是 `#__next`。
- 因为 `app/layout.tsx` 返回的是 `<html>` 和 `<body>`。
- 客户端实际水合的是 Next 内部的 `<ServerRoot />` / `<AppRouter />`，不是直接水合用户写的 `<App />`。

## 服务端返回什么

服务端返回的不是单一 HTML，而是一组内容：

```txt
HTML
RSC / Flight 数据流
客户端 JS bundle 引用
Next runtime bootstrap script
```

HTML 用来让浏览器先显示首屏：

```html
<main>
  <section class="server">
    <h2>server title</h2>
  </section>

  <button>client: A</button>
  <button>client: B</button>

  <section class="server">
    <h2>server title</h2>
    <button>client: C</button>
  </section>
</main>
```

RSC Payload 用来告诉 React 当前树的结构、客户端组件的位置和模块引用。

页面里会有类似这样的脚本不断把 Flight chunk 塞给客户端：

```js
self.__next_f = self.__next_f || []
self.__next_f.push([1, '...flight chunk...'])
self.__next_f.push([1, '...flight chunk...'])
```

客户端启动后会把 `self.__next_f` 转成 `ReadableStream`，再交给 React Flight：

```ts
const initialServerResponse = createFromReadableStream(readable)
```

## Payload 示例

真实 RSC Payload 是 React Flight 协议，不是普通 JSON。为了理解，可以先看语义化版本：

```js
{
  root: {
    type: '$server-result',
    name: 'App',
    children: [
      {
        type: '$server-result',
        name: 'ServerComponent',
        rendered: {
          type: 'section',
          props: {
            className: 'server',
            children: [
              {
                type: 'h2',
                props: {
                  children: 'server title',
                },
              },
            ],
          },
        },
      },
      {
        type: '$client-reference',
        name: 'ClientComponent',
        id: 'app/components/ClientComponent.tsx#ClientComponent',
        chunks: ['static/chunks/app/components/ClientComponent.js'],
        props: {
          name: 'A',
        },
      },
      {
        type: '$client-reference',
        name: 'ClientComponent',
        id: 'app/components/ClientComponent.tsx#ClientComponent',
        chunks: ['static/chunks/app/components/ClientComponent.js'],
        props: {
          name: 'B',
        },
      },
      {
        type: '$server-result',
        name: 'ServerComponent',
        rendered: {
          type: 'section',
          props: {
            className: 'server',
            children: [
              {
                type: 'h2',
                props: {
                  children: 'server title',
                },
              },
              {
                type: '$client-reference',
                name: 'ClientComponent',
                id: 'app/components/ClientComponent.tsx#ClientComponent',
                chunks: ['static/chunks/app/components/ClientComponent.js'],
                props: {
                  name: 'C',
                },
              },
            ],
          },
        },
      },
    ],
  },
}
```

真实协议更像一行行序列化记录：

```txt
0:["$","main",null,{
  "children":[
    ["$","section",null,{
      "className":"server",
      "children":["$","h2",null,{"children":"server title"}]
    }],
    ["$","$L1",null,{"name":"A"}],
    ["$","$L1",null,{"name":"B"}],
    ["$","section",null,{
      "className":"server",
      "children":[
        ["$","h2",null,{"children":"server title"}],
        ["$","$L1",null,{"name":"C"}]
      ]
    }]
  ]
}]
1:I["app/components/ClientComponent.tsx",["client-component-chunk.js"],"ClientComponent"]
```

读法：

- `0:` 表示当前页面的树结果。
- `"$"` 表示 React element。
- `"main"`、`"section"`、`"h2"` 表示普通 HTML 标签。
- `"$L1"` 表示客户端组件引用。
- `1:I[...]` 表示编号 1 对应的客户端组件模块信息。

## 服务端组件在 Payload 里是什么

服务端组件执行完后，payload 里通常不是：

```js
{
  type: 'ServerComponent',
  module: 'app/ServerComponent.tsx',
  props: {},
}
```

而更像：

```js
{
  type: 'section',
  props: {
    className: 'server',
    children: [
      {
        type: 'h2',
        props: {
          children: 'server title',
        },
      },
    ],
  },
}
```

原因是 `ServerComponent` 已经在服务端执行完了。客户端拿到的是它的渲染结果，而不是它的组件函数。

客户端组件则不同，payload 必须保留模块引用：

```js
{
  type: '$client-reference',
  module: 'app/components/ClientComponent.tsx',
  exportName: 'ClientComponent',
  chunks: ['client-component-chunk.js'],
  props: {
    name: 'A',
  },
}
```

## Payload 不是 DOM，也不是 Fiber

RSC Payload 里的服务端组件结果不是真实 DOM，也不是 Fiber。

它更准确地说是：React element 的序列化描述。

```txt
RSC Payload
  不是 DOM
  不是 Fiber
  是一种 wire format，用来描述 React 树

React Element
  是内存里的轻量对象描述
  例如 { type: 'section', props: {...} }

Fiber
  是 React reconciler 内部用来调度、diff、挂载的节点结构
  hydrate 时才会在客户端创建

DOM
  是浏览器已经 parse 出来的真实节点
  例如 <section>...</section>
```

完整链路：

```txt
服务端组件执行结果
  ↓
序列化进 RSC Payload
  ↓
客户端解码成 React element 描述
  ↓
React 创建 Fiber
  ↓
Fiber 对齐已有 DOM
  ↓
客户端组件边界加载 JS、绑定事件、初始化状态
```

不是：

```txt
服务端组件执行结果
  ↓
直接把 DOM / Fiber 传给客户端
```

Fiber 不能直接从服务端传给客户端，因为 Fiber 里包含运行时状态、指针、调度信息、effect 链、lanes、alternate 等内部结构。这些不是可序列化协议的一部分。

## 一句话总结

Next 服务端返回 HTML 和 `self.__next_f` Flight 数据。客户端把 `__next_f` 转成 stream，用 `createFromReadableStream` 解出 RSC Payload，然后执行 `hydrateRoot(document, <ServerRoot />)`。服务端组件在 payload 里是已经执行后的 React element 描述；客户端组件在 payload 里是模块引用加 props。React 会复用已有 DOM，并只在客户端组件边界下载 JS、创建组件实例、绑定事件。
