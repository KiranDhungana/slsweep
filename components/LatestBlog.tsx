import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPublishedPosts } from "@/lib/api";
import PostCard from "@/components/blog/PostCard";

export default async function LatestBlog() {
  let posts: Awaited<ReturnType<typeof fetchPublishedPosts>>["items"] = [];

  try {
    const data = await fetchPublishedPosts({ limit: 3 });
    posts = data.items;
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Blog</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
              Latest updates
            </h2>
            <p className="mt-2 text-slate-600">Tips, how-tos, and news from SL Sweep.</p>
          </div>
          <Link href="/blog/" className="btn-outline !py-2.5 text-sm">
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
