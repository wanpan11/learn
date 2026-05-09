import { cache } from "react";
import Link from "next/link";
import { fetchProfileFromOrigin, getCounters } from "@/lib/simulated-backend";

const getProfile = cache(fetchProfileFromOrigin);

export default async function MemoizationPage() {
  const first = await getProfile("u-1001");
  const second = await getProfile("u-1001");
  const counters = getCounters();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">请求记忆化（Request Memoization）</h1>
      <p className="text-zinc-700">
        同一次服务器渲染中，连续两次调用同参数函数，底层真实数据源只会命中一次。
      </p>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p>第一次调用 sourceHit：{first.sourceHit}</p>
        <p>第二次调用 sourceHit：{second.sourceHit}</p>
        <p>当前进程累计 memoHits：{counters.memoHits}</p>
        <p className="mt-2 text-sm text-zinc-500">刷新页面后，你会看到累计次数 +1（不是 +2）。</p>
      </section>

      <Link href="/" className="text-sm text-blue-700 hover:underline">
        返回首页
      </Link>
    </main>
  );
}
