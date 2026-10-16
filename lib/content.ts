import type { Faq } from "./seo";

/**
 * Shared marketing copy (home, how-it-works, support).
 * Claims here follow what the site already states: one account, add funds and
 * cash out from the dashboard, instant deposits/cash-outs per the business
 * description. TODO(owner): confirm each claim matches how the dashboard works today.
 */

/** Date the static pages' content last changed. Used as <lastmod> in the sitemap. */
export const CONTENT_UPDATED = "2026-10-16";

export const homeFaqs: Faq[] = [
  {
    question: "What is SL Sweep?",
    answer:
      "SL Sweep is an automated gaming platform for sweepstakes games online. One player dashboard gives you access to Orion Stars, GameVault, Juwa, Fire Kirin, Milky Way and more, with your funds and account managed in one place.",
  },
  {
    question: "Which games can I play on SL Sweep?",
    answer:
      "SL Sweep currently lists Orion Stars, GameVault, Juwa, Juwa 2.0, Fire Kirin, Milky Way, Vegas Sweeps and Cash Frenzy. Each one has its own page on our Games page.",
  },
  {
    question: "How do I add funds and cash out?",
    answer:
      "Both happen in your SL Sweep player dashboard. Choose the option to add funds to load your balance. When you want to withdraw, open the cash-out option and follow the steps shown. Available payment methods are listed in the dashboard.",
  },
  {
    question: "Can I use SL Sweep on my phone?",
    answer:
      "Yes. The SL Sweep player dashboard runs in your web browser, so you can open it on a phone, tablet or computer.",
  },
  {
    question: "How do I get help with my account?",
    answer:
      "Visit the SL Sweep Support page for answers to common questions and ways to reach our player support team.",
  },
];

/** "Why our automated gaming platform is faster" points. */
export const speedPoints = [
  {
    title: "Automatic deposits",
    text: "Funds you add from the dashboard are credited by the system. Nobody has to load your account by hand.",
  },
  {
    title: "Instant game credits",
    text: "Once your balance lands, it is ready to use on the game platform you choose. No waiting on a reply in a chat.",
  },
  {
    title: "Quick cash-outs",
    text: "Request a cash-out from the same dashboard you play from and follow its progress there.",
  },
  {
    title: "24/7 access",
    text: "The player dashboard is online around the clock, so you can check your balance, add funds or open a game whenever it suits you.",
  },
];

export const steps = [
  {
    title: "Create your account",
    text: "Sign up with the Get Started button. One SL Sweep account covers every game platform we carry.",
  },
  {
    title: "Add funds",
    text: "Open your player dashboard and add funds with one of the payment methods listed there.",
  },
  {
    title: "Play and cash out",
    text: "Pick a game such as Orion Stars, Juwa or Fire Kirin. When you are ready, request a cash-out from the dashboard.",
  },
];

export const howItWorksFaqs: Faq[] = [
  {
    question: "How long does it take to get started?",
    answer:
      "Creating an SL Sweep account takes a few minutes. After that you can add funds and open your first game from the player dashboard.",
  },
  {
    question: "Do I need a separate account for each game?",
    answer:
      "No. Your SL Sweep account is the one login you use to reach every game platform listed on our Games page.",
  },
  {
    question: "Where do I request a cash-out?",
    answer:
      "Cash-outs are requested from your SL Sweep player dashboard, the same place you add funds and track your activity.",
  },
];
