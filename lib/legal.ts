/**
 * Legal pages. Their text must come from you (ideally reviewed by a lawyer),
 * so they ship as drafts: `draft: true` pages are served with
 * "noindex, follow" and left out of the sitemap until real text is added.
 * Paste the text into `sections`, then set `draft: false`.
 */
export type LegalPageContent = {
  path: string;
  title: string;
  h1: string;
  description: string;
  draft: boolean;
  /** ISO date shown as "Last updated" once the page is published */
  updated?: string;
  sections: { heading: string; body: string[] }[];
  /** What the page needs to cover (shown as TODO in dev while drafting) */
  outline: string[];
};

export const legalPages: Record<"terms" | "privacy" | "sweepstakesRules", LegalPageContent> = {
  terms: {
    path: "/terms/",
    title: "Terms of Service | SL Sweep",
    h1: "SL Sweep Terms of Service",
    description:
      "The SL Sweep terms of service: the rules for using the SL Sweep website and player dashboard, your account, and our sweepstakes game platforms.",
    draft: true,
    sections: [],
    outline: [
      "Eligibility (age and US states where play is allowed)",
      "Accounts, one account per person, and account security",
      "Deposits, cash-outs and payment methods",
      "Prohibited conduct and account suspension",
      "Disclaimers, limitation of liability and governing law",
      "How to contact you about these terms",
    ],
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy Policy | SL Sweep",
    h1: "SL Sweep Privacy Policy",
    description:
      "The SL Sweep privacy policy explains what personal information we collect, how it is used and protected, and the choices players have about their data.",
    draft: true,
    sections: [],
    outline: [
      "What data you collect (account details, payment data, device/usage data, cookies, analytics)",
      "How the data is used and who it is shared with (payment processors, game platforms, analytics)",
      "Data retention and security",
      "Player rights and how to request access or deletion",
      "Contact details for privacy questions",
    ],
  },
  sweepstakesRules: {
    path: "/sweepstakes-rules/",
    title: "Sweepstakes Rules | SL Sweep",
    h1: "SL Sweep Sweepstakes Rules",
    description:
      "Official SL Sweep sweepstakes rules: who can take part, how entries and prizes work, and the terms that apply to sweepstakes games on SL Sweep.",
    draft: true,
    sections: [],
    outline: [
      "Sponsor name and address",
      "Eligibility and excluded states",
      "How to enter, including the free alternative method of entry if one applies",
      "Prizes, odds and redemption",
      "General conditions and dispute resolution",
    ],
  },
};
