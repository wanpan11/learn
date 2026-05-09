# Next.js 缓存命中逻辑图

这个图按请求真实执行顺序展示 Router Cache、Full Route Cache、Request Memoization、Data Cache 的命中与回源路径。

```mermaid
flowchart TD
    A[用户操作: 首次访问 / 导航 / 刷新] --> B{是否客户端路由导航?}

    B -- 是 --> C{Router Cache 命中?}
    C -- 是 --> C1[直接恢复 RSC Payload\n页面快速显示]
    C -- 否 --> D[请求服务端 RSC]

    B -- 否 --> D

    D --> E{Full Route Cache 命中?}
    E -- 是 --> E1[返回整页缓存结果\nHTML + RSC]
    E -- 否 --> F[执行页面渲染逻辑]

    F --> G{同次渲染内\n相同参数函数重复调用?}
    G -- 是 --> G1[Request Memoization 去重\n只触发一次真实调用]
    G -- 否 --> H[继续数据读取]
    G1 --> H

    H --> I{Data Cache 命中?}
    I -- 是 --> I1[返回缓存数据]
    I -- 否 --> J[请求真实数据源 Origin/DB]
    J --> K[写入 Data Cache\n按 key/tag/revalidate]
    K --> L[完成本次渲染并返回]
    I1 --> L

    M[动态信号: cookies/headers/searchParams] -.-> N[使路由变动态\n通常不走 Full Route Cache]
    N -.-> F

    O[revalidateTag 或 revalidatePath] -.-> P[失效 Data Cache/相关路由结果]
    P -.-> I

    Q[时间窗口到期 revalidate] -.-> R[触发重新获取并更新缓存]
    R -.-> J

    style C1 fill:#E8F5E9,stroke:#2E7D32
    style E1 fill:#E3F2FD,stroke:#1565C0
    style G1 fill:#FFF8E1,stroke:#EF6C00
    style I1 fill:#E8F5E9,stroke:#2E7D32
    style J fill:#FFEBEE,stroke:#C62828
```

## 如何使用

- 在支持 Mermaid 的 Markdown 预览中直接查看图。
- 可把此文件链接到项目 README，作为缓存机制速查图。
- 结合以下页面验证图中的每一层缓存：
  - app/memoization/page.tsx
  - app/data-cache/page.tsx
  - app/full-route-cache/page.tsx
  - app/router-cache/page.tsx
  - app/currency/page.tsx
