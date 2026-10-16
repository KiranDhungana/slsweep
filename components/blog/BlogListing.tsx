import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/blog/PostCard";
import type { BlogPost, TaxonomyTerm } from "@/lib/api";
import Breadcrumbs, { type Crumb } from "@/components/seo/Breadcrumbs";
import { blogListJsonLd, jsonLd, siteUrl } from "@/lib/seo";

type Props = {
  heading: React.ReactNode;
  headingText: string;
  intro: string;
  basePath: string;
  posts: BlogPost[];
  page: number;
  totalPages: number;
  categories: TaxonomyTerm[];
  activeCategory?: string;
  loadError?: boolean;
  /** Trail after "Home", e.g. [{ name: "Blog", path: "/blog/" }] */
  crumbs: Crumb[];
};

export const BLOG_PAGE_SIZE = 12;

/** Listing URL for a page number: page 1 is the base path, then {base}page/N/. */
export function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}page/${page}/`; // basePath ends in "/"
}

export default function BlogListing({
  heading,
  headingText,
  intro,
  basePath,
  posts,
  page,
  totalPages,
  categories,
  activeCategory,
  loadError,
  crumbs,
}: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-brand-50/40 via-white to-white">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
          <Breadcrumbs items={crumbs} className="mb-8" />
          <p className="eyebrow">Resources</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{intro}</p>

          {categories.length > 0 && (
            <nav aria-label="Blog categories" className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/blog/"
                className={chip(!activeCategory)}
                aria-current={!activeCategory ? "page" : undefined}
              >
                All posts
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}/`}
                  className={chip(activeCategory === c.slug)}
                  aria-current={activeCategory === c.slug ? "page" : undefined}
                >
                  {c.name} <span className="opacity-60">({c.count})</span>
                </Link>
              ))}
            </nav>
          )}

          {loadError ? (
            <p className="mt-12 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
              Articles couldn&apos;t be loaded right now. Please try again shortly.
            </p>
          ) : posts.length === 0 ? (
            <p className="mt-12 text-slate-500">No published articles yet. Check back soon.</p>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} eager={i < 3} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2 text-sm font-semibold">
              {page > 1 && (
                <Link href={pageHref(basePath, page - 1)} rel="prev" className={chip(false)}>
                  ← Newer
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={pageHref(basePath, n)}
                  className={chip(n === page)}
                  aria-current={n === page ? "page" : undefined}
                >
                  {n}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={pageHref(basePath, page + 1)} rel="next" className={chip(false)}>
                  Older →
                </Link>
              )}
            </nav>
          )}
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(blogListJsonLd(headingText, siteUrl(pageHref(basePath, page)), posts)),
        }}
      />
    </>
  );
}

function chip(active: boolean) {
  return active
    ? "rounded-full bg-brand-700 px-4 py-1.5 text-sm font-semibold text-white"
    : "rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-800";
}
