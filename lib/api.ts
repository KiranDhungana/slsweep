const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Public blog data is cached (ISR) so pages are served as fast static HTML,
 * which helps Core Web Vitals. The backend calls /api/revalidate on every
 * save, so edits still show up immediately.
 */
export const BLOG_CACHE_TAG = "blog";
const publicCache = { next: { revalidate: 300, tags: [BLOG_CACHE_TAG] } };

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  contentHtml: string;
  contentJson?: unknown;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  authorName: string;
  category: string | null;
  tags: string[];
  status: PostStatus;
  publishedAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  allowIndexing: boolean;
  readingTimeMin: number;
  createdAt: string;
  updatedAt: string;
};

export type BlogListResponse = {
  items: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type BlogInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  contentHtml: string;
  contentJson?: unknown;
  featuredImage?: string;
  featuredImageAlt?: string;
  authorName?: string;
  category?: string;
  tags?: string[] | string;
  status?: PostStatus;
  publishedAt?: string | null;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  allowIndexing?: boolean;
};

function adminHeaders(): HeadersInit {
  const key =
    typeof window !== "undefined"
      ? localStorage.getItem("slsweep_admin_key") || ""
      : "";

  return {
    "Content-Type": "application/json",
    ...(key ? { "x-admin-key": key } : {}),
  };
}

export async function loginAdmin(key: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: key.trim() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Login failed");
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

export async function fetchPublishedPosts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  q?: string;
}): Promise<BlogListResponse> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.category) qs.set("category", params.category);
  if (params?.tag) qs.set("tag", params.tag);
  if (params?.q) qs.set("q", params.q);

  const res = await fetch(`${API_BASE}/api/blogs?${qs}`, publicCache);
  return parseJson(res);
}

/** Every published post (walks all pages). Used by the sitemap and RSS feed. */
export async function fetchAllPublishedPosts(): Promise<BlogPost[]> {
  const first = await fetchPublishedPosts({ limit: 50, page: 1 });
  const rest = await Promise.all(
    Array.from({ length: Math.max(first.pagination.totalPages - 1, 0) }, (_, i) =>
      fetchPublishedPosts({ limit: 50, page: i + 2 })
    )
  );
  return [first, ...rest].flatMap((r) => r.items);
}

export type PostLookup =
  | { post: BlogPost; movedTo?: undefined }
  | { post: null; movedTo: string | null };

/** Looks up a post; `movedTo` is set when the slug was renamed (for a 301). */
export async function fetchPublishedPost(slug: string): Promise<PostLookup> {
  const res = await fetch(
    `${API_BASE}/api/blogs/slug/${encodeURIComponent(slug)}`,
    publicCache
  );
  if (res.status === 404) {
    const data = (await res.json().catch(() => ({}))) as { movedTo?: string | null };
    return { post: null, movedTo: data.movedTo || null };
  }
  return { post: await parseJson<BlogPost>(res) };
}

export type TaxonomyTerm = { name: string; slug: string; count: number };

export async function fetchTaxonomy(): Promise<{
  categories: TaxonomyTerm[];
  tags: TaxonomyTerm[];
}> {
  const res = await fetch(`${API_BASE}/api/blogs/taxonomy`, publicCache);
  return parseJson(res);
}

export async function fetchAdminPosts(params?: {
  page?: number;
  status?: string;
  q?: string;
}): Promise<BlogListResponse> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.status) qs.set("status", params.status);
  if (params?.q) qs.set("q", params.q);

  const res = await fetch(`${API_BASE}/api/blogs/admin?${qs}`, {
    headers: adminHeaders(),
    cache: "no-store",
  });
  return parseJson(res);
}

export async function fetchAdminPost(id: string): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/api/blogs/admin/${id}`, {
    headers: adminHeaders(),
    cache: "no-store",
  });
  return parseJson(res);
}

export async function createPost(body: BlogInput): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/api/blogs`, {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify(body),
  });
  return parseJson(res);
}

export async function updatePost(id: string, body: BlogInput): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify(body),
  });
  return parseJson(res);
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  await parseJson(res);
}

export { API_BASE };
