import Link from "next/link";

export default function RouterCacheIntroPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">路由器缓存（Router Cache）</h1>
      <p className="text-zinc-700">
        路由器缓存是浏览器内存里的 RSC 载荷缓存。你可以在两个页面间来回导航观察体验差异。
      </p>

      <ol className="list-decimal space-y-2 pl-5 text-zinc-700">
        <li>先点击进入 Step A，再进入 Step B。</li>
        <li>使用浏览器后退/前进返回，体验更快的页面恢复。</li>
        <li>在生产模式效果更明显。</li>
      </ol>

      <div className="flex gap-3">
        <Link
          href="/router-cache/step-a"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          进入 Step A
        </Link>
        <Link href="/" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100">
          返回首页
        </Link>
      </div>
    </main>
  );
}
