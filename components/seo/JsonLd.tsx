import { jsonLd } from "@/lib/seo";

/** Renders a schema.org JSON-LD block into the server HTML. */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  );
}
