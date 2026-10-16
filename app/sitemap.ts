import type { MetadataRoute } from "next";
import { fetchAllPublishedPosts, fetchTaxonomy } from "@/lib/api";
import { CONTENT_UPDATED } from "@/lib/content";
import { gameContent } from "@/lib/game-content";
import { gamePath, games } from "@/lib/games";
import { legalPages } from "@/lib/legal";
import { isIndexable, publicImage, siteUrl } from "@/lib/seo";

// Rebuilt every 5 minutes, and immediately when the backend publishes a post
// (see app/api/revalidate).
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updated = new Date(CONTENT_UPDATED);
  const page = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly" | "monthly" = "weekly"
  ) => ({ url: siteUrl(path), lastModified: updated, changeFrequency, priority });

  const staticRoutes: MetadataRoute.Sitemap = [
    page("/", 1),
    page("/games/", 0.9),
    ...games
      .filter((g) => gameContent[g.slug])
      .map((g) => ({
        ...page(gamePath(g.slug), 0.85),
        images: g.image ? [siteUrl(g.image)] : undefined,
      })),
    page("/how-it-works/", 0.8, "monthly"),
    page("/about/", 0.6, "monthly"),
    page("/support/", 0.6, "monthly"),
    page("/responsible-play/", 0.4, "monthly"),
    ...Object.values(legalPages)
      .filter((p) => !p.draft)
      .map((p) => page(p.path, 0.3, "monthly")),
    page("/apps/", 0.5),
    page("/sites/", 0.5),
  ];

  const blogIndex = { ...page("/blog/", 0.8, "daily") };

  try {
    const [allPosts, taxonomy] = await Promise.all([
      fetchAllPublishedPosts(),
      fetchTaxonomy().catch(() => ({ categories: [] })),
    ]);

    // Only list posts that are indexable and canonical to this site.
    const posts = allPosts.filter(isIndexable);
    if (posts[0]) blogIndex.lastModified = new Date(posts[0].updatedAt);

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
      const image = publicImage(post.featuredImage);
      return {
        url: siteUrl(`/blog/${post.slug}/`),
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
        images: image ? [image] : undefined,
      };
    });

    const categoryRoutes: MetadataRoute.Sitemap = taxonomy.categories.map((c) => ({
      url: siteUrl(`/blog/category/${c.slug}/`),
      lastModified: blogIndex.lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

    return [...staticRoutes, blogIndex, ...categoryRoutes, ...postRoutes];
  } catch {
    return [...staticRoutes, blogIndex];
  }
}
