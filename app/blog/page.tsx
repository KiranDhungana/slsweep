import { BlogIndex, blogIndexMetadata } from "@/lib/blog-pages";

// Static HTML, refreshed every 5 minutes or instantly when a post is saved.
export const revalidate = 300;

export const metadata = blogIndexMetadata(1);

export default function BlogIndexPage() {
  return <BlogIndex page={1} />;
}
