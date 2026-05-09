import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import {
  fetchPricesFromDB,
  getCounters,
  SUPPORTED_CURRENCIES,
  type Currency,
} from "@/lib/simulated-backend";

export const revalidate = 120;

export function generateStaticParams() {
  return SUPPORTED_CURRENCIES.map((currency) => ({ currency }));
}

const getCachedPricesByCurrency = unstable_cache(
  async (currency: Currency) => fetchPricesFromDB(currency),
  ["currency-static-demo"],
  {
    revalidate: 120,
    tags: ["currency-static"],
  },
);

export default async function CurrencyStaticPage({
  params,
}: {
  params: Promise<{ currency: string }>;
}) {
  const { currency: input } = await params;

  if (!SUPPORTED_CURRENCIES.includes(input as Currency)) {
    notFound();
  }

  const currency = input as Currency;
  const data = await getCachedPricesByCurrency(currency);
  const counters = getCounters();
  const renderedAt = new Date().toISOString();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">URL 多币种缓存（Full Route + Data）</h1>
      <p className="text-zinc-700">
        当前页面使用 URL 币种参数，不读取 cookies。路由可静态化并设置 revalidate=120，适合观察整页缓存与数据缓存。
      </p>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p>当前币种：{data.currency.toUpperCase()}</p>
        <p>页面渲染时间：{renderedAt}</p>
        <p>真实数据源命中序号：{data.sourceHit}</p>
        <p>价格生成时间：{data.fetchedAt}</p>
        <p>进程累计 priceHits：{counters.priceHits}</p>
        <ul className="mt-3 space-y-1 text-zinc-700">
          {data.products.map((item) => (
            <li key={item.name}>
              {item.name}: {item.price} {data.currency.toUpperCase()}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        <p>验证建议：</p>
        <p>1. 连续刷新同一路由，120 秒内页面渲染时间通常保持不变。</p>
        <p>2. 切换到其他币种路由，观察各自独立缓存条目。</p>
      </section>

      <div className="flex flex-wrap gap-3">
        {SUPPORTED_CURRENCIES.map((item) => (
          <Link
            key={item}
            href={`/currency-static/${item}`}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100"
          >
            切到 {item.toUpperCase()}
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/currency-static" className="text-sm text-blue-700 hover:underline">
          返回币种入口
        </Link>
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          返回首页
        </Link>
      </div>
    </main>
  );
}
