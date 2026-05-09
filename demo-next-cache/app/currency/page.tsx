import Link from "next/link";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import {
  fetchPricesFromDB,
  getCounters,
  SUPPORTED_CURRENCIES,
  toCurrency,
  type Currency,
} from "@/lib/simulated-backend";
import { invalidateCurrencyPriceTag, switchCurrency } from "./actions";

const getCachedPrices = unstable_cache(
  async (currency: Currency) => {
    return fetchPricesFromDB(currency);
  },
  ["currency-prices-demo"],
  {
    revalidate: 120,
    tags: ["currency-prices"],
  },
);

export default async function CurrencyPage() {
  const cookieStore = await cookies();
  const currency = toCurrency(cookieStore.get("currency")?.value);
  const data = await getCachedPrices(currency);
  const counters = getCounters();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">Cookie 多币种缓存（动态页 + 数据缓存）</h1>
      <p className="text-zinc-700">
        当前页面读取了 cookies()，因此全路由缓存失效；但数据缓存仍会按 currency 参数隔离。
      </p>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p>当前币种：{data.currency.toUpperCase()}</p>
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

      <form action={switchCurrency} className="flex flex-wrap items-center gap-3">
        <label htmlFor="currency" className="text-sm text-zinc-700">
          切换 Cookie 币种
        </label>
        <select
          id="currency"
          name="currency"
          defaultValue={currency}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
        >
          {SUPPORTED_CURRENCIES.map((item) => (
            <option value={item} key={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          写入 Cookie
        </button>
      </form>

      <form action={invalidateCurrencyPriceTag}>
        <button
          type="submit"
          className="w-fit rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100"
        >
          手动失效 currency-prices 标签
        </button>
      </form>

      <p className="text-sm text-zinc-500">
        提示：切换币种后再次刷新，可看到不同币种拥有各自独立的缓存命中序号。
      </p>

      <Link href="/" className="text-sm text-blue-700 hover:underline">
        返回首页
      </Link>
    </main>
  );
}
