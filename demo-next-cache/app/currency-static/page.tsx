import Link from "next/link";
import { SUPPORTED_CURRENCIES } from "@/lib/simulated-backend";

export default function CurrencyStaticIndexPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-10">
      <h1 className="text-2xl font-bold">URL 多币种缓存（静态路由）</h1>
      <p className="text-zinc-700">
        该示例不读取 cookies，币种通过 URL 参数传入。这样路由可静态化，能观察 Full Route Cache 与 Data Cache 叠加效果。
      </p>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="text-sm text-zinc-700">选择一个币种进入演示页：</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {SUPPORTED_CURRENCIES.map((currency) => (
            <Link
              key={currency}
              href={`/currency-static/${currency}`}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
            >
              {currency.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      <Link href="/" className="text-sm text-blue-700 hover:underline">
        返回首页
      </Link>
    </main>
  );
}
