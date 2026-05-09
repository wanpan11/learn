import Link from "next/link";

export default function RouterCacheStepAPage() {
  const renderedAt = new Date().toISOString();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">Router Cache - Step A</h1>
      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p>Step A 服务端渲染时间：{renderedAt}</p>
      </section>
      <div className="flex gap-3">
        <Link
          href="/router-cache/step-b"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          去 Step B
        </Link>
        <Link href="/router-cache" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100">
          返回说明
        </Link>
      </div>
    </main>
  );
}
