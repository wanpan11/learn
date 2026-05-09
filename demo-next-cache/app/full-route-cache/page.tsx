import Link from "next/link";

export const revalidate = 90;

export default function FullRouteCachePage() {
  const renderedAt = new Date().toISOString();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">全路由缓存（Full Route Cache）</h1>
      <p className="text-zinc-700">
        此页面不读取 cookies/headers 等动态请求信息，并设置了 revalidate=90，可被整页缓存。
      </p>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p>页面渲染时间戳：{renderedAt}</p>
        <p className="mt-2 text-sm text-zinc-500">
          在生产模式（pnpm build && pnpm start）连续刷新，90 秒内时间戳保持不变。
        </p>
      </section>

      <Link href="/" className="text-sm text-blue-700 hover:underline">
        返回首页
      </Link>
    </main>
  );
}
