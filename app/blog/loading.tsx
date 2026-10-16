import Header from "@/components/Header";

/**
 * Shown instantly while a blog page that isn't cached yet (e.g. a brand-new
 * post) renders on the server, so clicks never feel unresponsive.
 */
export default function BlogLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-brand-50/40 via-white to-white" aria-busy="true">
        <div className="mx-auto max-w-6xl animate-pulse px-4 py-14 sm:px-8">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-6 h-10 w-2/3 rounded bg-slate-200" />
          <div className="mt-4 h-5 w-1/2 rounded bg-slate-100" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div className="aspect-[16/10] rounded-xl bg-slate-200" />
                <div className="mt-4 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-full rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Loading…</span>
      </main>
    </>
  );
}
