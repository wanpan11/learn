import Link from "next/link";

export default function Home() {
  const demos = [
    {
      href: "/memoization",
      title: "请求记忆化",
      desc: "同一次渲染里重复调用同参数函数，只触发一次真实后端请求。",
    },
    {
      href: "/data-cache",
      title: "数据缓存",
      desc: "跨请求复用数据，支持 revalidate 时间窗口与标签失效。",
    },
    {
      href: "/full-route-cache",
      title: "全路由缓存",
      desc: "缓存整页 HTML + RSC 载荷，跳过重复渲染。",
    },
    {
      href: "/router-cache",
      title: "路由器缓存",
      desc: "客户端缓存已访问路由的 RSC 载荷，加速前进后退。",
    },
    {
      href: "/currency",
      title: "Cookie 多币种",
      desc: "页面动态渲染，但数据缓存按币种参数隔离。",
    },
    {
      href: "/currency-static",
      title: "URL 多币种（静态路由）",
      desc: "不读取 Cookie，通过 URL 参数切币种，同时观察整页缓存和数据缓存。",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-600">demo-next-cache</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">
          Next.js 缓存机制能力演示（TypeScript）
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-700">
          基于文档中的缓存要点实现：请求记忆化、数据缓存、全路由缓存、路由器缓存，以及 Cookie 多币种场景。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {demos.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{item.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700">
        <p>建议在生产模式观察缓存效果：</p>
        <p className="mt-2 font-mono">pnpm build && pnpm start</p>
      </section>
    </main>
  );
}
