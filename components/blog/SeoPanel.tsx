"use client";

type Props = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  allowIndexing: boolean;
  onChange: (field: string, value: string | boolean) => void;
};

function scoreSeo({
  title,
  metaTitle,
  metaDescription,
  focusKeyword,
  slug,
}: Props) {
  let score = 0;
  const tips: string[] = [];
  const keyword = focusKeyword.trim().toLowerCase();

  if (metaTitle.length >= 30 && metaTitle.length <= 60) score += 25;
  else tips.push("Meta title works best at 30–60 characters.");

  if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 25;
  else tips.push("Meta description works best at 120–160 characters.");

  if (keyword) {
    score += 10;
    if (title.toLowerCase().includes(keyword)) score += 15;
    else tips.push("Include the focus keyword in the title.");
    if (metaTitle.toLowerCase().includes(keyword)) score += 10;
    else tips.push("Include the focus keyword in the meta title.");
    if (metaDescription.toLowerCase().includes(keyword)) score += 10;
    else tips.push("Include the focus keyword in the meta description.");
    if (slug.toLowerCase().includes(keyword.replace(/\s+/g, "-"))) score += 5;
    else tips.push("Add the focus keyword to the URL slug.");
  } else {
    tips.push("Set a focus keyword for clearer SEO targeting.");
  }

  const label = score >= 70 ? "Good" : score >= 40 ? "OK" : "Needs work";
  const color =
    score >= 70 ? "text-brand-700" : score >= 40 ? "text-amber-600" : "text-rose-600";

  return { score: Math.min(score, 100), label, color, tips };
}

export default function SeoPanel(props: Props) {
  const { score, label, color, tips } = scoreSeo(props);

  return (
    <aside className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          SEO
        </h2>
        <span className={`text-sm font-semibold ${color}`}>
          {label} · {score}/100
        </span>
      </div>

      <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
        <p className="truncate text-sm text-brand-700">
          slsweepofficial.com/blog/{props.slug || "your-slug"}/
        </p>
        <p className="mt-1 line-clamp-1 text-base font-semibold text-blue-800">
          {props.metaTitle || props.title || "Meta title preview"}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
          {props.metaDescription || "Meta description preview will appear here."}
        </p>
      </div>

      <label className="block space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Focus keyword
        </span>
        <input
          value={props.focusKeyword}
          onChange={(e) => props.onChange("focusKeyword", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          placeholder="e.g. online sweepstakes tips"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Meta title ({props.metaTitle.length}/60)
        </span>
        <input
          value={props.metaTitle}
          onChange={(e) => props.onChange("metaTitle", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          placeholder="SEO title shown in Google"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Meta description ({props.metaDescription.length}/160)
        </span>
        <textarea
          value={props.metaDescription}
          onChange={(e) => props.onChange("metaDescription", e.target.value)}
          rows={3}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          placeholder="Short summary that encourages clicks from search results"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Canonical URL (optional)
        </span>
        <input
          value={props.canonicalUrl}
          onChange={(e) => props.onChange("canonicalUrl", e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          placeholder="https://slsweepofficial.com/blog/.../"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={props.allowIndexing}
          onChange={(e) => props.onChange("allowIndexing", e.target.checked)}
          className="rounded border-slate-300 text-brand-700 focus:ring-brand-500"
        />
        Allow search engines to index this post
      </label>

      {tips.length > 0 && (
        <ul className="space-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
          {tips.slice(0, 4).map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
