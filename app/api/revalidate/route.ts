import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { BLOG_CACHE_TAG } from "@/lib/api";

/**
 * Called by the backend whenever a post is created, updated or deleted so the
 * blog pages, sitemap and RSS feed are rebuilt with fresh content right away.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { slugs?: unknown };
  const slugs = Array.isArray(body.slugs)
    ? body.slugs.filter((s): s is string => typeof s === "string" && s.length > 0)
    : [];

  revalidateTag(BLOG_CACHE_TAG);
  revalidatePath("/", "layout");
  for (const slug of slugs) revalidatePath(`/blog/${slug}/`);

  return NextResponse.json({ revalidated: true, slugs });
}
