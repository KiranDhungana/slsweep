"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, PenSquare, Eye } from "lucide-react";
import { fetchAdminPosts, type BlogPost } from "@/lib/api";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAdminPosts();
        setPosts(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    })();
  }, []);

  const published = posts.filter((p) => p.status === "PUBLISHED").length;
  const drafts = posts.filter((p) => p.status === "DRAFT").length;

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Overview</p>
        <h1 className="mt-1 text-3xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-slate-600">Manage SL Sweep blog content.</p>
      </div>

      {error && (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Articles</p>
          <p className="mt-2 text-3xl font-bold text-ink">{posts.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Published</p>
          <p className="mt-2 text-3xl font-bold text-brand-700">{published}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Drafts</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">{drafts}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/blog/new" className="btn-primary !px-4 !py-2.5 text-sm">
          <PenSquare className="h-4 w-4" /> Add article
        </Link>
        <Link href="/admin/blog" className="btn-outline !px-4 !py-2.5 text-sm">
          <FileText className="h-4 w-4" /> All articles
        </Link>
        <Link href="/blog/" target="_blank" className="btn-outline !px-4 !py-2.5 text-sm">
          <Eye className="h-4 w-4" /> View public blog
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3">
          <h2 className="font-semibold text-ink">Recent articles</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id} className="flex items-center justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="truncate font-medium text-ink hover:text-brand-700"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-slate-500">/{post.slug}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  post.status === "PUBLISHED"
                    ? "bg-brand-100 text-brand-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {post.status}
              </span>
            </li>
          ))}
          {posts.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-slate-500">
              No articles yet.{" "}
              <Link href="/admin/blog/new" className="font-semibold text-brand-700">
                Create one
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
