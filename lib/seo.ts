import type { Metadata } from "next";
import type { BlogPost } from "./api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://slsweepofficial.com";
const SITE_NAME = "SL Sweep";
const SITE_DESCRIPTION =
  "SL Sweep is an automated gaming platform for sweepstakes games online. Instant deposits and cash-outs for Orion Stars, GameVault, Juwa, Fire Kirin & more.";

export function siteUrl(path = "") {
  return `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Returns an absolute, crawlable image URL — or undefined for inline
 * `data:` images, which search engines and social networks can't fetch.
 */
export function publicImage(src: string | null | undefined) {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return siteUrl(src);
  return undefined;
}

/** Branded 1200×630 social card, used when a page has no image of its own. */
export function ogImageUrl(title: string, eyebrow?: string) {
  const qs = new URLSearchParams({ title });
  if (eyebrow) qs.set("eyebrow", eyebrow);
  return siteUrl(`/og/?${qs}`);
}

/**
 * Open Graph / Twitter defaults. Next.js replaces (not merges) `openGraph`
 * when a page sets it, so pages spread this to keep site-wide fields.
 */
export function socialMetadata({
  title,
  description,
  url,
  image,
  imageAlt,
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const img = image || ogImageUrl(title);
  return {
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: img, width: 1200, height: 630, alt: imageAlt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
  };
}

/**
 * Full metadata for a regular page: exact title (no template suffix),
 * description, self-referencing canonical, robots and social tags.
 * `path` must be the page's trailing-slash path, e.g. "/games/juwa/".
 */
export function pageMetadata({
  path,
  title,
  description,
  index = true,
  image,
}: {
  path: string;
  title: string;
  description: string;
  index?: boolean;
  image?: string;
}): Metadata {
  const url = siteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    ...socialMetadata({ title, description, url, image }),
  };
}

export function postMetaTitle(post: BlogPost) {
  return post.metaTitle || `${post.title} | ${SITE_NAME}`;
}

export function postMetaDescription(post: BlogPost) {
  return (
    post.metaDescription ||
    post.excerpt ||
    `Read ${post.title} on the ${SITE_NAME} blog.`
  );
}

export function postUrl(post: Pick<BlogPost, "slug" | "canonicalUrl">) {
  return post.canonicalUrl || siteUrl(`/blog/${post.slug}/`);
}

/** Posts that should appear in the sitemap / feeds. */
export function isIndexable(post: Pick<BlogPost, "allowIndexing" | "canonicalUrl">) {
  if (!post.allowIndexing) return false;
  // A canonical pointing at another site means this copy shouldn't be listed.
  return !post.canonicalUrl || post.canonicalUrl.startsWith(siteUrl("/"));
}

export function slugify(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Serializes JSON-LD safely for a <script> tag (no `</script>` breakouts). */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const publisher = {
  "@type": "Organization",
  "@id": siteUrl("/#organization"),
  name: SITE_NAME,
  url: siteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: siteUrl("/logo.png"),
    width: 512,
    height: 512,
  },
};

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      publisher,
      {
        "@type": "WebSite",
        "@id": siteUrl("/#website"),
        url: siteUrl("/"),
        name: SITE_NAME,
        alternateName: ["SLSweep", "SL Sweep Official"],
        description: SITE_DESCRIPTION,
        publisher: { "@id": siteUrl("/#organization") },
        inLanguage: "en-US",
      },
    ],
  };
}

export type Faq = { question: string; answer: string };

/** FAQPage schema — must mirror the Q&As visibly rendered on the page. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogListJsonLd(
  name: string,
  url: string,
  posts: Pick<BlogPost, "slug" | "title" | "canonicalUrl">[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    isPartOf: { "@id": siteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: postUrl(post),
        name: post.title,
      })),
    },
  };
}

export function articleJsonLd(post: BlogPost, wordCount?: number) {
  const url = postUrl(post);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.slice(0, 110),
    description: postMetaDescription(post),
    image: [
      publicImage(post.ogImage) ||
        publicImage(post.featuredImage) ||
        ogImageUrl(post.title, post.category || "Blog"),
    ],
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": post.authorName && post.authorName !== SITE_NAME ? "Person" : "Organization",
      name: post.authorName || SITE_NAME,
      url: siteUrl("/"),
    },
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "en-US",
    articleSection: post.category || undefined,
    keywords: [post.focusKeyword, ...(post.tags || [])].filter(Boolean).join(", ") || undefined,
    wordCount,
    isPartOf: { "@id": siteUrl("/#website") },
  };
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

/**
 * Makes editor HTML search-friendly:
 * - a single <h1> per page (content h1s become h2)
 * - anchor ids on h2/h3 for a table of contents and "jump to" links in Google
 * - lazy-loaded images with alt text
 * - safe attributes on external links
 */
export function prepareArticleHtml(html: string, fallbackAlt: string) {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  let out = html.replace(/<h1(\s[^>]*)?>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");

  out = out.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs = "", inner: string) => {
      const text = stripTags(inner);
      if (!text) return match;
      const existing = /\sid=["']([^"']+)["']/i.exec(attrs)?.[1];
      let id = existing || slugify(text) || "section";
      if (!existing) {
        const base = id;
        for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      }
      used.add(id);
      toc.push({ id, text, level: Number(level) as 2 | 3 });
      const nextAttrs = existing ? attrs : `${attrs} id="${id}"`;
      return `<h${level}${nextAttrs}>${inner}</h${level}>`;
    }
  );

  out = out.replace(/<img\b([^>]*)>/gi, (_m, attrs: string) => {
    let a = attrs.replace(/\s*\/$/, "");
    if (!/\sloading=/i.test(a)) a += ' loading="lazy"';
    if (!/\sdecoding=/i.test(a)) a += ' decoding="async"';
    if (!/\salt=["'][^"']+["']/i.test(a)) {
      a = a.replace(/\salt=["']["']/i, "");
      a += ` alt="${fallbackAlt.replace(/"/g, "&quot;")}"`;
    }
    return `<img${a}>`;
  });

  const ownHost = new URL(siteUrl("/")).host;
  out = out.replace(/<a\b([^>]*)>/gi, (m, attrs: string) => {
    const href = /\shref=["']([^"']+)["']/i.exec(attrs)?.[1];
    if (!href || !/^https?:\/\//i.test(href)) return m;
    try {
      if (new URL(href).host === ownHost) return m;
    } catch {
      return m;
    }
    let a = attrs;
    if (!/\starget=/i.test(a)) a += ' target="_blank"';
    if (!/\srel=/i.test(a)) a += ' rel="noopener noreferrer"';
    return `<a${a}>`;
  });

  const wordCount = stripTags(out.replace(/<\/(p|h\d|li)>/gi, " ")).split(/\s+/).filter(Boolean).length;

  return { html: out, toc, wordCount };
}

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION };
