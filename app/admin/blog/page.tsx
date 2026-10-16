"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Trash2, ExternalLink } from "lucide-react";
import { deletePost, fetchAdminPosts, type BlogPost } from "@/lib/api";

export default function AdminBlogListPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminPosts({
        q: q || undefined,
        status: status || undefined,
      });
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    try {
      await deletePost(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="text-3xl font-bold text-ink">All articles</h1>
          <p className="mt-1 text-slate-600">Edit, publish, or remove posts.</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary !px-4 !py-2 text-sm">
          <Plus className="h-4 w-4" /> Add article
        </Link>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="min-w-[180px] flex-1 space-y-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Search
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            placeholder="Title or slug"
            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
          >
            <option value="">All</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                  No articles yet.{" "}
                  <Link href="/admin/blog/new" className="font-semibold text-brand-700">
                    Add your first article
                  </Link>
                </td>
              </tr>
            ) : (
              items.map((post) => (
                <tr key={post.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="font-semibold text-ink hover:text-brand-700"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-slate-500">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        post.status === "PUBLISHED"
                          ? "bg-brand-100 text-brand-800"
                          : post.status === "DRAFT"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(post.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="rounded-md border border-slate-200 px-3 py-1.5 font-medium hover:bg-slate-50"
                      >
                        Edit
                      </Link>
                      {post.status === "PUBLISHED" && (
                        <Link
                          href={`/blog/${post.slug}/`}
                          target="_blank"
                          className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50"
                          aria-label="View"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => onDelete(post.id, post.title)}
                        className="rounded-md border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
