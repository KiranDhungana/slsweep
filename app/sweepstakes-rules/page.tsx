import LegalPage, { legalMetadata } from "@/components/LegalPage";
import { legalPages } from "@/lib/legal";

export const metadata = legalMetadata(legalPages.sweepstakesRules);

export default function SweepstakesRulesPage() {
  return <LegalPage page={legalPages.sweepstakesRules} crumb="Sweepstakes Rules" />;
}
