"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { toCurrency } from "@/lib/simulated-backend";

export async function switchCurrency(formData: FormData) {
  const value = String(formData.get("currency") ?? "usd").toLowerCase();
  const currency = toCurrency(value);

  const cookieStore = await cookies();
  const current = cookieStore.get("currency")?.value;
  if (current === currency) return;

  cookieStore.set("currency", currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    httpOnly: false,
  });
}

export async function invalidateCurrencyPriceTag() {
  revalidateTag("currency-prices", "max");
}
