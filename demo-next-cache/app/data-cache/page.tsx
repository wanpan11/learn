import Link from "next/link";
import { unstable_cache } from "next/cache";
import { invalidateNewsTag } from "./actions";
import { fetchNewsFromOrigin, getCounters } from "@/lib/simulated-backend";

const getCachedNews = unstable_cache(
  async (locale: string) => {
    return fetchNewsFromOrigin(locale);
  },
  ["news-list-demo"],
  {
    revalidate: 60,
    tags: ["news-list"],
  },
);

export default async function DataCachePage() {
  const data = await getCachedNews("zh-CN");
  const counters = getCounters();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">数据缓存（Data Cache）</h1>
      <p className="text-zinc-700">
        该页面使用 unstable_cache 将数据缓存 60 秒，并绑定 tag 方便手动失效。
      </p>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p>locale：{data.locale}</p>
        <p>真实数据源命中序号：{data.sourceHit}</p>
        <p>本次数据生成时间：{data.fetchedAt}</p>
        <p>进程累计 newsHits：{counters.newsHits}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
          {data.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <form action={invalidateNewsTag}>
        <button
          type="submit"
          className="w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          立即使 news-list 标签失效
        </button>
      </form>

      <Link href="/" className="text-sm text-blue-700 hover:underline">
        返回首页
      </Link>
    </main>
  );
}
