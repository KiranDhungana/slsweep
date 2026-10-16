import Link from "next/link";
import { breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import JsonLd from "./JsonLd";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList schema. "Home" is added automatically. */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm text-slate-500 ${className}`}>
        <ol className="flex flex-wrap items-center gap-y-1">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden className="mx-2">
                    /
                  </span>
                )}
                {last ? (
                  <span aria-current="page" className="line-clamp-1 text-slate-700">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="inline-flex min-h-[48px] items-center hover:text-brand-700 sm:min-h-0">
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail.map((c) => ({ name: c.name, url: siteUrl(c.path) })))} />
    </>
  );
}
