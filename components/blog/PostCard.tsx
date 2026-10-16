import Link from "next/link";
import type { BlogPost } from "@/lib/api";

type Props = {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
  /** Above-the-fold cards load eagerly; the rest lazy-load. */
  eager?: boolean;
};

export default function PostCard({ post, headingLevel = "h2", eager = false }: Props) {
  const Heading = headingLevel;
  const href = `/blog/${post.slug}/`;

  return (
    <article className="group flex flex-col">
      <Link href={href} className="block overflow-hidden rounded-xl" tabIndex={-1} aria-hidden>
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-brand-100 font-semibold text-brand-700">
            SL Sweep
          </div>
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
          {post.category && <span>{post.category}</span>}
          {post.category && <span className="text-slate-400">·</span>}
          <span className="normal-case tracking-normal text-slate-500">
            {post.readingTimeMin} min read
          </span>
          {post.publishedAt && (
            <>
              <span className="text-slate-400">·</span>
              <time dateTime={post.publishedAt} className="normal-case tracking-normal text-slate-500">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </>
          )}
        </div>
        <Heading className="mt-2 text-xl font-bold text-ink group-hover:text-brand-800">
          <Link href={href}>{post.title}</Link>
        </Heading>
        {post.excerpt && <p className="mt-2 line-clamp-3 flex-1 text-slate-600">{post.excerpt}</p>}
        <Link
          href={href}
          className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-900"
          aria-label={`Read: ${post.title}`}
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}
