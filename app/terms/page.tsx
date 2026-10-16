import LegalPage, { legalMetadata } from "@/components/LegalPage";
import { legalPages } from "@/lib/legal";

export const metadata = legalMetadata(legalPages.terms);

export default function TermsPage() {
  return <LegalPage page={legalPages.terms} crumb="Terms" />;
}
