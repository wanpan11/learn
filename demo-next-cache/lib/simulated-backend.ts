export const SUPPORTED_CURRENCIES = ["usd", "eur", "jpy", "cny"] as const;

export type Currency = (typeof SUPPORTED_CURRENCIES)[number];

// 用于观察是否真正触发了"回源"，方便在页面上对比缓存命中效果。
type CounterKey = "memoHits" | "newsHits" | "priceHits";

const counters: Record<CounterKey, number> = {
  memoHits: 0,
  newsHits: 0,
  priceHits: 0,
};

// 模拟真实后端/数据库延迟，放大缓存命中与未命中的体验差异。
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const bump = (key: CounterKey) => {
  counters[key] += 1;
  return counters[key];
};

// 将任意输入归一为受支持币种，避免非法参数污染缓存分桶。
export function toCurrency(value: string | undefined): Currency {
  if (SUPPORTED_CURRENCIES.includes(value as Currency)) {
    return value as Currency;
  }
  return "usd";
}

// 返回快照，避免外部直接修改内部计数器引用。
export const getCounters = () => ({ ...counters });

// 用于 Request Memoization 演示的数据源。
export async function fetchProfileFromOrigin(userId: string) {
  const hit = bump("memoHits");
  await wait(300);

  return {
    userId,
    nickname: "cache-student",
    sourceHit: hit,
    fetchedAt: new Date().toISOString(),
  };
}

// 用于 Data Cache + tag 失效演示的数据源。
export async function fetchNewsFromOrigin(locale: string) {
  const hit = bump("newsHits");
  await wait(450);

  return {
    locale,
    sourceHit: hit,
    fetchedAt: new Date().toISOString(),
    list: ["请求记忆化只在单次渲染周期生效", "数据缓存可跨请求复用", "全路由缓存依赖路由静态化条件"],
  };
}

const PRICE_FACTOR: Record<Currency, number> = {
  usd: 1,
  eur: 0.92,
  jpy: 155,
  cny: 7.2,
};

// 用于"动态页 + 数据缓存按参数隔离"场景（按 currency 分桶）。
export async function fetchPricesFromDB(currency: Currency) {
  const hit = bump("priceHits");
  await wait(500);

  const factor = PRICE_FACTOR[currency];

  return {
    currency,
    sourceHit: hit,
    fetchedAt: new Date().toISOString(),
    products: [
      { name: "Starter", price: (19 * factor).toFixed(2) },
      { name: "Pro", price: (49 * factor).toFixed(2) },
      { name: "Enterprise", price: (199 * factor).toFixed(2) },
    ],
  };
}
