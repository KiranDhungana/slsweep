import { faqJsonLd, type Faq } from "@/lib/seo";
import JsonLd from "./JsonLd";

type Props = {
  faqs: Faq[];
  heading?: string;
  id?: string;
  className?: string;
};

/** Visible FAQ list with FAQPage schema generated from the same text. */
export default function FaqSection({ faqs, heading = "FAQ", id = "faq", className = "" }: Props) {
  if (faqs.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      <h2 id={`${id}-heading`} className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {heading}
      </h2>
      <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {faqs.map((f) => (
          <div key={f.question} className="px-5 py-5 sm:px-6">
            <h3 className="text-lg font-bold text-ink">{f.question}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{f.answer}</p>
          </div>
        ))}
      </div>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
