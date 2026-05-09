"use server";

import { revalidateTag } from "next/cache";

export async function invalidateNewsTag() {
  revalidateTag("news-list", "max");
}
