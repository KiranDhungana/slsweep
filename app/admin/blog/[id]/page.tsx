"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogEditorForm from "@/components/blog/BlogEditorForm";
import { fetchAdminPost, type BlogPost } from "@/lib/api";

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchAdminPost(params.id);
        if (alive) setPost(data);
      } catch (err) {
        if (alive) {
          setError(err instanceof Error ? err.message : "Failed to load post.");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [params.id]);

  if (loading) {
    return <p className="text-slate-500">Loading editor…</p>;
  }

  if (error || !post) {
    return <p className="text-rose-600">{error || "Post not found."}</p>;
  }

  return <BlogEditorForm initial={post} />;
}
