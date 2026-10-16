import { fetchAllPublishedPosts } from "@/lib/api";
import { SITE_NAME, isIndexable, postMetaDescription, postUrl, publicImage, siteUrl } from "@/lib/seo";

export const revalidate = 300;

function xml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RSS 2.0 feed — helps new posts get discovered and syndicated quickly. */
export async function GET() {
  let posts: Awaited<ReturnType<typeof fetchAllPublishedPosts>> = [];
  try {
    posts = (await fetchAllPublishedPosts()).filter(isIndexable).slice(0, 50);
  } catch {
    // Serve an empty feed rather than an error if the API is down.
  }

  const items = posts
    .map((post) => {
      const url = postUrl(post);
      const date = new Date(post.publishedAt || post.createdAt).toUTCString();
      const image = publicImage(post.featuredImage);
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <pubDate>${date}</pubDate>
      <description>${xml(postMetaDescription(post))}</description>
      <dc:creator>${xml(post.authorName)}</dc:creator>${
        post.category ? `\n      <category>${xml(post.category)}</category>` : ""
      }${
        image ? `\n      <media:content url="${xml(image)}" medium="image" />`
          : ""
      }
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${xml(`${SITE_NAME} Blog`)}</title>
    <link>${siteUrl("/blog/")}</link>
    <description>Guides, tips, how-tos and the latest updates from ${xml(SITE_NAME)}.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />${
      posts[0] ? `\n    <lastBuildDate>${new Date(posts[0].updatedAt).toUTCString()}</lastBuildDate>` : ""
    }
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
