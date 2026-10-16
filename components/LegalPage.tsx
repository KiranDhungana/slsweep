import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Todo from "@/components/seo/Todo";
import type { LegalPageContent } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export function legalMetadata(page: LegalPageContent): Metadata {
  return pageMetadata({
    path: page.path,
    title: page.title,
    description: page.description,
    index: !page.draft,
  });
}

export default function LegalPage({ page, crumb }: { page: LegalPageContent; crumb: string }) {
  const ready = !page.draft && page.sections.length > 0;

  return (
    <PageShell crumbs={[{ name: crumb, path: page.path }]}>
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{page.h1}</h1>
        {ready && page.updated && (
          <p className="mt-3 text-sm text-slate-500">
            Last updated <time dateTime={page.updated}>{page.updated}</time>
          </p>
        )}

        {ready ? (
          <div className="mt-10 space-y-10">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">{s.heading}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-slate-700">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              We are finalizing this page. If you have a question in the meantime, please contact{" "}
              <Link href="/support/" className="font-semibold text-brand-700 underline">
                SL Sweep Support
              </Link>
              .
            </p>
            <Todo>
              Paste the real text into lib/legal.ts, then set draft: false. It should cover:{" "}
              {page.outline.join("; ")}.
            </Todo>
          </>
        )}
      </article>
    </PageShell>
  );
}
