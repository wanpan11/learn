import { NextResponse, type NextRequest } from "next/server";
import { SUPPORTED_CURRENCIES, type Currency } from "@/lib/simulated-backend";

const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  CN: "cny",
  JP: "jpy",
  DE: "eur",
  FR: "eur",
  ES: "eur",
  IT: "eur",
  NL: "eur",
  US: "usd",
  GB: "usd",
  CA: "usd",
  AU: "usd",
};

// 与 toCurrency 的区别：无效输入返回 undefined（而非默认 "usd"），以区分"无 cookie"和"无效 cookie"。
function normalizeCurrency(input: string | undefined): Currency | undefined {
  if (!input) return undefined;
  return SUPPORTED_CURRENCIES.includes(input.toLowerCase() as Currency)
    ? (input.toLowerCase() as Currency)
    : undefined;
}

function inferCurrencyFromHeaders(request: NextRequest): Currency | undefined {
  const country =
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? undefined;

  if (!country) return undefined;
  return COUNTRY_TO_CURRENCY[country.toUpperCase()];
}

export function middleware(request: NextRequest) {
  const fromCookie = normalizeCurrency(request.cookies.get("currency")?.value);
  const fromIP = inferCurrencyFromHeaders(request);
  const currency = fromCookie ?? fromIP ?? "usd";

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = `/currency-static/${currency}`;

  const response = NextResponse.redirect(targetUrl);

  if (!fromCookie) {
    response.cookies.set("currency", currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ["/currency-static", "/currency-static/"],
};
