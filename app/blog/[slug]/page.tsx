import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/blog/PostCard";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  fetchAllPublishedPosts,
  fetchPublishedPost,
  fetchPublishedPosts,
  fetchTaxonomy,
  type BlogPost,
} from "@/lib/api";
import {
  articleJsonLd,
  jsonLd,
  ogImageUrl,
  postMetaDescription,
  postMetaTitle,
  postUrl,
  prepareArticleHtml,
  publicImage,
  siteUrl,
  socialMetadata,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

/** Loads the post, 301-redirecting old slugs to the post's current URL. */
const loadPost = cache(async (slug: string): Promise<BlogPost> => {
  const { post, movedTo } = await fetchPublishedPost(slug);
  if (post) return post;
  if (movedTo) permanentRedirect(`/blog/${movedTo}/`);
  notFound();
});

async function categoryHref(name: string | null) {
  if (!name) return null;
  try {
    const { categories } = await fetchTaxonomy();
    const match = categories.find((c) => c.name === name);
    return match ? `/blog/category/${match.slug}/` : null;
  } catch {
    return null;
  }
}

async function relatedPosts(post: BlogPost) {
  try {
    const pick = (items: BlogPost[]) => items.filter((p) => p.id !== post.id);
    // Fetch same-category and latest posts in parallel rather than one after the other.
    const [sameCategory, latest] = await Promise.all([
      post.category
        ? fetchPublishedPosts({ category: post.category, limit: 4 }).then((r) => pick(r.items))
        : Promise.resolve([] as BlogPost[]),
      fetchPublishedPosts({ limit: 6 }).then((r) => pick(r.items)),
    ]);
    const items = [...sameCategory, ...latest.filter((p) => !sameCategory.some((i) => i.id === p.id))];
    return items.slice(0, 3);
  } catch {
    return [];
  }
}

// Prebuild every published post so each one is served as static HTML.
export async function generateStaticParams() {
  try {
    return (await fetchAllPublishedPosts()).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);

  const title = postMetaTitle(post);
  const description = postMetaDescription(post);
  const url = postUrl(post);
  const image =
    publicImage(post.ogImage) ||
    publicImage(post.featuredImage) ||
    ogImageUrl(post.title, post.category || "Blog");
  const social = socialMetadata({
    title,
    description,
    url,
    image,
    imageAlt: post.featuredImageAlt || post.title,
    type: "article",
  });

  return {
    // metaTitle already carries the brand suffix, so skip the layout template.
    title: { absolute: title },
    description,
    keywords: [post.focusKeyword, ...(post.tags || [])].filter((k): k is string => Boolean(k)),
    authors: [{ name: post.authorName }],
    category: post.category || undefined,
    alternates: { canonical: url },
    robots: post.allowIndexing
      ? { index: true, follow: true, "max-image-preview": "large" }
      : { index: false, follow: true },
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      section: post.category || undefined,
      tags: post.tags,
    },
    twitter: social.twitter,
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  const [catHref, related] = await Promise.all([categoryHref(post.category), relatedPosts(post)]);
  const { html, toc, wordCount } = prepareArticleHtml(post.contentHtml, post.title);

  const published = post.publishedAt ? formatDate(post.publishedAt) : null;
  const updated =
    post.publishedAt &&
    new Date(post.updatedAt).getTime() - new Date(post.publishedAt).getTime() > 24 * 3600 * 1000
      ? formatDate(post.updatedAt)
      : null;

  const showToc = toc.filter((t) => t.level === 2).length >= 3;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Blog", path: "/blog/" },
              ...(post.category && catHref ? [{ name: post.category, path: catHref }] : []),
              { name: post.title, path: `/blog/${post.slug}/` },
            ]}
          />

          {post.category &&
            (catHref ? (
              <Link href={catHref} className="eyebrow hover:text-brand-900">{post.category}</Link>
            ) : (
              <p className="eyebrow">{post.category}</p>
            ))}
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span>
              By {post.authorName}
            </span>
            {published && (
              <>
                <span aria-hidden>·</span>
                <time dateTime={post.publishedAt || undefined}>{published}</time>
              </>
            )}
            {updated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{updated}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{post.readingTimeMin} min read</span>
          </div>

          {post.featuredImage && (
            <figure className="mt-8 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              {post.featuredImageAlt && (
                <figcaption className="mt-2 text-center text-sm text-slate-500">
                  {post.featuredImageAlt}
                </figcaption>
              )}
            </figure>
          )}

          {post.excerpt && (
            <p className="mt-8 text-xl leading-relaxed text-slate-600">{post.excerpt}</p>
          )}

          {showToc && (
            <nav
              aria-label="Table of contents"
              className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-slate-700">
                In this article
              </p>
              <ol className="mt-3 space-y-1.5 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
                    <a href={`#${item.id}`} className="text-brand-700 hover:text-brand-900">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="prose prose-slate prose-lg mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-brand-700 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.tags?.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-100 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="border-t border-slate-100 bg-slate-50/60">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
              <h2 id="related-heading" className="text-2xl font-extrabold tracking-tight text-ink">
                Keep reading
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.id} post={p} headingLevel="h3" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd(post, wordCount)) }}
      />
    </>
  );
}
