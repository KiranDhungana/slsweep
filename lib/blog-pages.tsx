import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import BlogListing, { BLOG_PAGE_SIZE, pageHref } from "@/components/blog/BlogListing";
import { fetchPublishedPosts, fetchTaxonomy, type TaxonomyTerm } from "@/lib/api";
import { SITE_NAME, siteUrl, socialMetadata } from "@/lib/seo";

/**
 * Blog index and category listings, shared by the page-1 routes
 * (/blog/, /blog/category/x/) and their /page/N/ variants.
 *
 * Pagination uses path segments instead of ?page= so every listing can be
 * statically generated (ISR) and fully prefetched by <Link>, which makes
 * navigation instant.
 */

const BLOG_DESCRIPTION =
  "Guides, tips, how-tos and the latest updates from SL Sweep — everything you need to get more out of your favorite games.";

const loadCategories = cache(async (): Promise<TaxonomyTerm[]> => {
  try {
    return (await fetchTaxonomy()).categories;
  } catch {
    return [];
  }
});

async function findCategory(slug: string) {
  const category = (await loadCategories()).find((c) => c.slug === slug);
  if (!category) notFound();
  return category;
}

/** Validates a /page/N/ segment. Page 1 lives at the base URL. */
export function parsePageParam(basePath: string, value: string) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || String(n) !== value) notFound();
  if (n === 1) permanentRedirect(basePath);
  return n;
}

function describeCategory(name: string) {
  return `${name} articles from SL Sweep: guides, tips and the latest updates about ${name.toLowerCase()}.`;
}

// ---------- blog index ----------

export function blogIndexMetadata(page: number): Metadata {
  const title = page > 1 ? `Blog – Page ${page}` : "Blog: Guides, Tips & Updates";
  const url = siteUrl(pageHref("/blog/", page));
  return {
    title,
    description: page > 1 ? `${BLOG_DESCRIPTION} Page ${page}.` : BLOG_DESCRIPTION,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": [{ url: siteUrl("/blog/rss.xml"), title: `${SITE_NAME} Blog` }] },
    },
    ...socialMetadata({ title: `${title} | ${SITE_NAME}`, description: BLOG_DESCRIPTION, url }),
  };
}

export async function BlogIndex({ page }: { page: number }) {
  let posts: Awaited<ReturnType<typeof fetchPublishedPosts>>["items"] = [];
  let totalPages = 1;
  let loadError = false;

  const categoriesPromise = loadCategories();
  try {
    const data = await fetchPublishedPosts({ limit: BLOG_PAGE_SIZE, page });
    posts = data.items;
    totalPages = data.pagination.totalPages;
  } catch {
    loadError = true;
  }
  if (!loadError && page > totalPages) notFound();

  return (
    <BlogListing
      heading={
        <>
          <span className="sr-only">SL Sweep </span>
          <span className="uppercase tracking-[0.45em]">Blog</span>
        </>
      }
      headingText={`${SITE_NAME} Blog`}
      intro="Guides, tips, how-tos and the latest updates."
      basePath="/blog/"
      posts={posts}
      page={page}
      totalPages={totalPages}
      categories={await categoriesPromise}
      loadError={loadError}
      crumbs={[{ name: "Blog", path: "/blog/" }]}
    />
  );
}

/** Page numbers 2..N to prebuild at deploy time. */
export async function blogIndexPageParams() {
  try {
    const { pagination } = await fetchPublishedPosts({ limit: BLOG_PAGE_SIZE });
    return Array.from({ length: Math.max(pagination.totalPages - 1, 0) }, (_, i) => ({
      page: String(i + 2),
    }));
  } catch {
    return [];
  }
}

// ---------- category listings ----------

export async function categoryMetadata(slug: string, page: number): Promise<Metadata> {
  const category = await findCategory(slug);
  const url = siteUrl(pageHref(`/blog/category/${category.slug}/`, page));
  const title = page > 1 ? `${category.name} – Page ${page}` : `${category.name} Articles`;
  const description = describeCategory(category.name);
  return {
    title,
    description,
    alternates: { canonical: url },
    ...socialMetadata({ title: `${title} | ${SITE_NAME}`, description, url }),
  };
}

export async function CategoryListing({ slug, page }: { slug: string; page: number }) {
  const category = await findCategory(slug);
  const [data, categories] = await Promise.all([
    fetchPublishedPosts({ category: category.name, limit: BLOG_PAGE_SIZE, page }),
    loadCategories(),
  ]);
  if (page > data.pagination.totalPages) notFound();

  const basePath = `/blog/category/${category.slug}/`;
  return (
    <BlogListing
      heading={category.name}
      headingText={`${category.name} Articles`}
      intro={describeCategory(category.name)}
      basePath={basePath}
      posts={data.items}
      page={page}
      totalPages={data.pagination.totalPages}
      categories={categories}
      activeCategory={category.slug}
      crumbs={[
        { name: "Blog", path: "/blog/" },
        { name: category.name, path: basePath },
      ]}
    />
  );
}

/** Every category slug, prebuilt at deploy time. */
export async function categoryParams() {
  return (await loadCategories()).map((c) => ({ category: c.slug }));
}

/** Every (category, page ≥ 2) pair, prebuilt at deploy time. */
export async function categoryPageParams() {
  const categories = await loadCategories();
  return categories.flatMap((c) => {
    const pages = Math.ceil(c.count / BLOG_PAGE_SIZE);
    return Array.from({ length: Math.max(pages - 1, 0) }, (_, i) => ({
      category: c.slug,
      page: String(i + 2),
    }));
  });
}
