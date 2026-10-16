import LegalPage, { legalMetadata } from "@/components/LegalPage";
import { legalPages } from "@/lib/legal";

export const metadata = legalMetadata(legalPages.privacy);

export default function PrivacyPage() {
  return <LegalPage page={legalPages.privacy} crumb="Privacy Policy" />;
}
