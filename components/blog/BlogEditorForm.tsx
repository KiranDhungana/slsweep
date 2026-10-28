"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import SeoPanel from "./SeoPanel";
import {
  BLOG_SITES,
  createPost,
  updatePost,
  type BlogPost,
  type BlogSite,
  type PostStatus,
} from "@/lib/api";

type Props = {
  initial?: BlogPost | null;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogEditorForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));

  const [site, setSite] = useState<BlogSite>(initial?.site || "SLSWEEP");
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [contentHtml, setContentHtml] = useState(initial?.contentHtml || "");
  const [contentJson, setContentJson] = useState<unknown>(initial?.contentJson || null);
  const [featuredImage, setFeaturedImage] = useState(initial?.featuredImage || "");
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    initial?.featuredImageAlt || ""
  );
  const [authorName, setAuthorName] = useState(initial?.authorName || "SL Sweep");
  const [category, setCategory] = useState(initial?.category || "");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [status, setStatus] = useState<PostStatus>(initial?.status || "DRAFT");
  const [metaTitle, setMetaTitle] = useState(initial?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initial?.metaDescription || ""
  );
  const [focusKeyword, setFocusKeyword] = useState(initial?.focusKeyword || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initial?.canonicalUrl || "");
  const [allowIndexing, setAllowIndexing] = useState(
    initial?.allowIndexing ?? true
  );

  const siteMeta = BLOG_SITES.find((item) => item.id === site) || BLOG_SITES[0];

  const canSave = useMemo(
    () => title.trim().length > 0 && contentHtml.replace(/<[^>]+>/g, "").trim().length > 0,
    [title, contentHtml]
  );

  const onSeoChange = (field: string, value: string | boolean) => {
    if (field === "focusKeyword") setFocusKeyword(String(value));
    if (field === "metaTitle") setMetaTitle(String(value));
    if (field === "metaDescription") setMetaDescription(String(value));
    if (field === "canonicalUrl") setCanonicalUrl(String(value));
    if (field === "allowIndexing") setAllowIndexing(Boolean(value));
  };

  const save = async (nextStatus?: PostStatus) => {
    if (!canSave) {
      setError("Title and content are required.");
      return;
    }

    setSaving(true);
    setError("");
    const payload = {
      title: title.trim(),
      site,
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      contentHtml,
      contentJson: contentJson || undefined,
      featuredImage: featuredImage.trim() || undefined,
      featuredImageAlt: featuredImageAlt.trim() || undefined,
      authorName: authorName.trim() || siteMeta.author,
      category: category.trim() || undefined,
      tags,
      status: nextStatus || status,
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
      focusKeyword: focusKeyword.trim() || undefined,
      canonicalUrl: canonicalUrl.trim() || undefined,
      ogImage: featuredImage.trim() || undefined,
      allowIndexing,
    };

    try {
      const post = initial?.id
        ? await updatePost(initial.id, payload)
        : await createPost(payload);

      if (!initial?.id) {
        router.replace(`/admin/blog/${post.id}`);
      } else {
        setStatus(post.status);
        setSlug(post.slug);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Blog editor</p>
          <h1 className="text-2xl font-bold text-ink">
            {initial ? "Edit article" : "Add new article"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={saving || !canSave}
            onClick={() => save("DRAFT")}
            className="btn-outline !px-4 !py-2 text-sm disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            disabled={saving || !canSave}
            onClick={() => save("PUBLISHED")}
            className="btn-primary !px-4 !py-2 text-sm disabled:opacity-50"
          >
            {saving ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => {
              const next = e.target.value;
              setTitle(next);
              if (!slugTouched) setSlug(slugify(next));
              if (!metaTitle) setMetaTitle(next ? `${next} | ${siteMeta.brand}` : "");
            }}
            placeholder="Article title"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-2xl font-bold outline-none focus:border-brand-500"
          />

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <span className="shrink-0 font-medium">Permalink</span>
            <span className="text-slate-400">/blog/</span>
            <input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className="min-w-0 flex-1 rounded-md border border-slate-200 px-2 py-1 outline-none focus:border-brand-500"
            />
          </label>

          <RichTextEditor
            contentJson={initial?.contentJson}
            contentHtml={initial?.contentHtml}
            onChange={({ html, json }) => {
              setContentHtml(html);
              setContentJson(json);
            }}
          />

          <label className="block space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Excerpt
            </span>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Short summary shown on the blog list and used as a fallback meta description"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
          </label>
        </div>

        <div className="space-y-4">
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Publish
            </h2>
            <label className="block space-y-1 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Site
              </span>
              <select
                value={site}
                onChange={(e) => {
                  const next = e.target.value as BlogSite;
                  const prev = BLOG_SITES.find((item) => item.id === site) || BLOG_SITES[0];
                  const dest = BLOG_SITES.find((item) => item.id === next) || BLOG_SITES[0];
                  setSite(next);
                  setAuthorName((name) => (name === prev.author ? dest.author : name));
                  setMetaTitle((current) => {
                    const auto = title ? `${title} | ${prev.brand}` : "";
                    if (!current || current === auto) {
                      return title ? `${title} | ${dest.brand}` : "";
                    }
                    return current;
                  });
                }}
                className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
              >
                {BLOG_SITES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <span className="block text-xs text-slate-500">
                Published articles show on {siteMeta.host}.
              </span>
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Author
              </span>
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
              />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </span>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Guides, News, Tips…"
                className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
              />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tags (comma separated)
              </span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="sweepstakes, tips, rewards"
                className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-brand-500"
              />
            </label>
          </div>

          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Featured image
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 1.5 * 1024 * 1024) {
                  setError("Image must be under 1.5MB. Compress it or use an image URL.");
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  setFeaturedImage(String(reader.result || ""));
                  if (!featuredImageAlt) setFeaturedImageAlt(file.name.replace(/\.[^.]+$/, ""));
                };
                reader.readAsDataURL(file);
              }}
              className="w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100"
            />
            <input
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Or paste https://… image URL"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
            <input
              value={featuredImageAlt}
              onChange={(e) => setFeaturedImageAlt(e.target.value)}
              placeholder="Alt text for accessibility & SEO"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
            {featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featuredImage}
                alt={featuredImageAlt || title}
                className="mt-2 max-h-40 w-full rounded-md object-cover"
              />
            ) : null}
          </div>

          <SeoPanel
            title={title}
            slug={slug}
            host={siteMeta.host}
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            focusKeyword={focusKeyword}
            canonicalUrl={canonicalUrl}
            allowIndexing={allowIndexing}
            onChange={onSeoChange}
          />
        </div>
      </div>
    </div>
  );
}
