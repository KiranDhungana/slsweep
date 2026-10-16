import type { Faq } from "./seo";

/**
 * SEO copy for each /games/{slug}/ page.
 *
 * Everything here is written to be accurate for SL Sweep as it exists today.
 * `todo` lists the game-specific facts only you can supply. They show up as
 * amber boxes in `npm run dev` and are hidden in production builds.
 * Replace them with real copy, then delete the todo entry.
 */
export type GameContent = {
  slug: string;
  /** Exact <title> */
  metaTitle: string;
  /** ≤155 characters, contains the keyword */
  description: string;
  keyword: string;
  h1: string;
  /** Descriptive alt text for the game artwork */
  imageAlt: string;
  intro: string[];
  /** "About {game}" paragraphs. Leave undefined until you have real copy. */
  about?: string[];
  /** A unique angle for this game, rendered as its own section */
  spotlight: { heading: string; body: string[] };
  faqs: Faq[];
  related: string[];
  todo: string[];
};

export const gameContent: Record<string, GameContent> = {
  "orion-stars": {
    slug: "orion-stars",
    metaTitle: "Play Orion Stars Online – Login & Access | SL Sweep",
    description:
      "Play Orion Stars online through SL Sweep. Open Orion Stars from one player dashboard, add funds, and request cash-outs without juggling separate accounts.",
    keyword: "orion stars online",
    h1: "Play Orion Stars Online",
    imageAlt: "Orion Stars sweepstakes game logo on SL Sweep",
    intro: [
      "Orion Stars online is one of the most requested platforms on SL Sweep, and you reach it from the same player dashboard you use for every other game. Players know Orion Stars for its mix of fish table games and slot-style titles.",
      "Instead of keeping a separate sign-up for each platform, your SL Sweep account holds your balance and your game access. When you feel like Orion Stars, you open it from your dashboard.",
    ],
    spotlight: {
      heading: "Why play Orion Stars through SL Sweep",
      body: [
        "Orion Stars sits next to GameVault, Juwa, Fire Kirin and the rest of our lineup. That means one place to add funds, one place to check your activity and one place to ask for help, no matter which platform you are playing that day.",
      ],
    },
    faqs: [
      {
        question: "What kinds of games are on Orion Stars?",
        answer:
          "Orion Stars is known for fish table games and slot-style titles. The exact lineup can change, so check the current game list after you open Orion Stars from your SL Sweep dashboard.",
      },
      {
        question: "Why play Orion Stars on SL Sweep instead of on its own?",
        answer:
          "SL Sweep puts Orion Stars alongside our other sweepstakes platforms, so you manage one account and one balance instead of a separate setup for every game.",
      },
    ],
    related: ["fire-kirin", "gamevault", "milky-way"],
    todo: [
      "About Orion Stars: 2–3 paragraphs on its game library, standout titles and what players like about it.",
      "Supported devices for Orion Stars itself (browser, Android, iOS) and whether players need anything besides the SL Sweep dashboard.",
      "Any Orion Stars–specific minimums, limits or promotions on SL Sweep.",
    ],
  },

  gamevault: {
    slug: "gamevault",
    metaTitle: "Game Vault 999 Online – Play & Login | SL Sweep",
    description:
      "Play Game Vault online with SL Sweep. Find GameVault (gamevault999) in your player dashboard, add funds and cash out from one account.",
    keyword: "game vault online",
    h1: "Play Game Vault Online (GameVault 999)",
    imageAlt: "GameVault 999 sweepstakes game logo on SL Sweep",
    intro: [
      "Looking for Game Vault online? GameVault, which players also search for as Game Vault 999 or gamevault999, is available through the SL Sweep player dashboard.",
      "Your SL Sweep account handles the parts around the game: adding funds, tracking your activity and requesting cash-outs. GameVault is one click away whenever you want to play it.",
    ],
    spotlight: {
      heading: "GameVault, Game Vault 999, gamevault999: the same platform",
      body: [
        "Players type the name a few different ways, so it is easy to land on lookalike pages. On SL Sweep the platform is simply listed as GameVault, and you reach it from your dashboard rather than from a link someone sends you in a chat.",
      ],
    },
    faqs: [
      {
        question: "Is GameVault the same as Game Vault 999?",
        answer:
          "Yes. GameVault, Game Vault 999 and gamevault999 are names players use for the same platform. On SL Sweep it appears as GameVault in your game list.",
      },
      {
        question: "How do I find GameVault after signing up?",
        answer:
          "Sign in to your SL Sweep player dashboard and choose GameVault from your list of game platforms.",
      },
    ],
    related: ["orion-stars", "juwa", "vegas-sweeps"],
    todo: [
      "About GameVault: describe its game library and standout titles in your own words.",
      "Supported devices for GameVault and whether a separate app is involved.",
      "Any GameVault-specific minimums, limits or promotions on SL Sweep.",
    ],
  },

  juwa: {
    slug: "juwa",
    metaTitle: "Juwa 777 Online – Play Juwa Games | SL Sweep",
    description:
      "Play Juwa online on SL Sweep. Open Juwa 777 from your player dashboard, keep one balance for all your games, and cash out from the same account.",
    keyword: "juwa online",
    h1: "Play Juwa Online (Juwa 777)",
    imageAlt: "Juwa 777 sweepstakes game logo on SL Sweep",
    intro: [
      "Juwa online, often called Juwa 777, is part of the SL Sweep lineup. You can open it from your player dashboard next to Orion Stars, GameVault, Fire Kirin and our other platforms.",
      "Juwa is a long-standing name among sweepstakes players, with fish table games and slot-style titles. On SL Sweep you get to it without setting up a separate account for every game.",
    ],
    spotlight: {
      heading: "Juwa and Juwa 2.0 on SL Sweep",
      body: [
        "SL Sweep lists the original Juwa and Juwa 2.0 as separate platforms. If you have played Juwa before, this page is the one you know. If you want the newer edition, see our Juwa 2.0 page.",
      ],
    },
    faqs: [
      {
        question: "What is the difference between Juwa and Juwa 2.0?",
        answer:
          "They are listed as two separate platforms on SL Sweep. Juwa (Juwa 777) is the original, and Juwa 2.0 is the newer edition. You can open either one from your dashboard.",
      },
      {
        question: "Why do players call it Juwa 777?",
        answer:
          "777 is part of the Juwa branding, and many players search for it that way. Juwa and Juwa 777 refer to the same platform on SL Sweep.",
      },
    ],
    related: ["juwa-2", "orion-stars", "fire-kirin"],
    todo: [
      "About Juwa: what its game library includes and which titles your players like most.",
      "Supported devices for Juwa and whether a separate app is involved.",
      "Any Juwa-specific minimums, limits or promotions on SL Sweep.",
    ],
  },

  "juwa-2": {
    slug: "juwa-2",
    metaTitle: "Juwa 2.0 Online | SL Sweep",
    description:
      "Play Juwa 2.0 online with SL Sweep, the newer edition of Juwa. Open it from your player dashboard and manage funds and cash-outs in one account.",
    keyword: "juwa 2.0 online",
    h1: "Play Juwa 2.0 Online",
    imageAlt: "Juwa 2.0 sweepstakes game logo on SL Sweep",
    intro: [
      "Juwa 2.0 online is the newer edition of the Juwa platform, and SL Sweep lists it as its own platform so you can pick it directly from your player dashboard.",
      "If you already play the original Juwa, Juwa 2.0 is a short step away. Both live in the same dashboard and draw on the same SL Sweep account.",
    ],
    spotlight: {
      heading: "Choosing between Juwa and Juwa 2.0",
      body: [
        "There is no wrong choice. Start with the edition you already know, and try the other one whenever you like. Your balance and account details stay in SL Sweep either way.",
      ],
    },
    faqs: [
      {
        question: "Which should I try first, Juwa or Juwa 2.0?",
        answer:
          "Start with the one you are familiar with. Both are listed in the SL Sweep dashboard, so switching to the other later only takes a click.",
      },
      {
        question: "Is Juwa 2.0 a separate platform from Juwa?",
        answer:
          "Yes. SL Sweep lists Juwa 2.0 and the original Juwa (Juwa 777) as two separate platforms in your game list.",
      },
    ],
    related: ["juwa", "milky-way", "cash-frenzy"],
    todo: [
      "What is new in Juwa 2.0 compared to Juwa: new games, features and look.",
      "Supported devices for Juwa 2.0 and whether a separate app is involved.",
      "Confirm whether Juwa 2.0 uses its own game login inside SL Sweep or shares one with Juwa.",
    ],
  },

  "fire-kirin": {
    slug: "fire-kirin",
    metaTitle: "Fire Kirin Play Online – Fish Games | SL Sweep",
    description:
      "Fire Kirin play online on SL Sweep: open Fire Kirin fish table games from your player dashboard, with funds and cash-outs handled in one account.",
    keyword: "fire kirin play online",
    h1: "Fire Kirin: Play Fish Games Online",
    imageAlt: "Fire Kirin fish table game logo on SL Sweep",
    intro: [
      "Want to play Fire Kirin online? Fire Kirin is best known for fish table games, where you aim at targets swimming across the screen, and it is part of the SL Sweep lineup.",
      "You open Fire Kirin from your SL Sweep player dashboard, the same place you add funds, follow your activity and request cash-outs.",
    ],
    spotlight: {
      heading: "More fish table games on SL Sweep",
      body: [
        "If fish games are your thing, Fire Kirin is not the only option. Orion Stars, Juwa and GameVault also carry fish table games, and all of them sit in the same SL Sweep dashboard.",
      ],
    },
    faqs: [
      {
        question: "Is Fire Kirin a fish game?",
        answer:
          "Fire Kirin is best known for fish table games, where you aim and fire at targets on screen. Check the current game list after opening Fire Kirin from your dashboard.",
      },
      {
        question: "Can I find other fish table games besides Fire Kirin?",
        answer:
          "Yes. Orion Stars, Juwa and GameVault also offer fish table games, and you can open all of them from the same SL Sweep player dashboard.",
      },
    ],
    related: ["orion-stars", "juwa", "gamevault"],
    todo: [
      "About Fire Kirin: favorite fish table titles and what makes them stand out.",
      "Supported devices for Fire Kirin and whether a separate app is involved.",
      "Any Fire Kirin–specific minimums, limits or promotions on SL Sweep.",
    ],
  },

  "milky-way": {
    slug: "milky-way",
    metaTitle: "Milky Way Sweepstakes Online | SL Sweep",
    description:
      "Play Milky Way sweepstakes online through SL Sweep. Open Milky Way from your player dashboard and keep funds and cash-outs in one place.",
    keyword: "milky way sweepstakes online",
    h1: "Play Milky Way Sweepstakes Online",
    imageAlt: "Milky Way sweepstakes game logo on SL Sweep",
    intro: [
      "Milky Way sweepstakes online is available on SL Sweep, and you open it from the same player dashboard as every other platform we carry.",
      "Your SL Sweep account covers funds, activity and support, so moving from Milky Way to another game, or back again, does not mean starting over somewhere new.",
    ],
    spotlight: {
      heading: "If you like Milky Way, try these next",
      body: [
        "Players who enjoy Milky Way often explore Orion Stars and Vegas Sweeps too. Each one is a separate platform in your dashboard, and your SL Sweep account carries across all of them.",
      ],
    },
    faqs: [
      {
        question: "Is Milky Way a sweepstakes platform?",
        answer:
          "Yes. Milky Way is a sweepstakes platform, and SL Sweep players open it from the same dashboard as our other games.",
      },
      {
        question: "What games are similar to Milky Way?",
        answer:
          "Players who like Milky Way often also try Orion Stars and Vegas Sweeps, both available from the SL Sweep dashboard.",
      },
    ],
    related: ["orion-stars", "vegas-sweeps", "juwa-2"],
    todo: [
      "About Milky Way: game library, theme and standout titles.",
      "Supported devices for Milky Way and whether a separate app is involved.",
      "Any Milky Way–specific minimums, limits or promotions on SL Sweep.",
    ],
  },

  "vegas-sweeps": {
    slug: "vegas-sweeps",
    metaTitle: "Vegas Sweeps Online – Play & Login | SL Sweep",
    description:
      "Play Vegas Sweeps online on SL Sweep. Sign in once, open Vegas Sweeps from your player dashboard, and handle funds and cash-outs in one account.",
    keyword: "vegas sweeps online",
    h1: "Play Vegas Sweeps Online",
    imageAlt: "Vegas Sweeps sweepstakes game logo on SL Sweep",
    intro: [
      "Vegas Sweeps online brings a Las Vegas casino theme to sweepstakes play, and SL Sweep gives you access to it from your player dashboard.",
      "You sign in to SL Sweep once. From there you can open Vegas Sweeps, add funds and request cash-outs without hunting for a separate login page.",
    ],
    spotlight: {
      heading: "Vegas Sweeps or Las Vegas Sweeps?",
      body: [
        "Players search for this platform under both names. On SL Sweep it is listed as Vegas Sweeps, and the dashboard is the place to open it.",
      ],
    },
    faqs: [
      {
        question: "Is Vegas Sweeps the same as Las Vegas Sweeps?",
        answer:
          "Players use both names for this platform. On SL Sweep it is listed as Vegas Sweeps in your game list.",
      },
      {
        question: "Do I sign in to Vegas Sweeps through SL Sweep?",
        answer:
          "You sign in to your SL Sweep account, then open Vegas Sweeps from your player dashboard.",
      },
    ],
    related: ["gamevault", "milky-way", "cash-frenzy"],
    todo: [
      "Confirm that “Vegas Sweeps” and “Las Vegas Sweeps” are the same platform (the artwork file is named lasvegas-sweeps).",
      "About Vegas Sweeps: game library and standout titles.",
      "Supported devices for Vegas Sweeps and whether a separate app is involved.",
    ],
  },

  "cash-frenzy": {
    slug: "cash-frenzy",
    metaTitle: "Cash Frenzy Online | SL Sweep",
    description:
      "Play Cash Frenzy online with SL Sweep. Open Cash Frenzy from your player dashboard next to Orion Stars, Juwa and more, with one account for funds.",
    keyword: "cash frenzy online",
    h1: "Play Cash Frenzy Online",
    imageAlt: "Cash Frenzy sweepstakes game logo on SL Sweep",
    intro: [
      "Cash Frenzy online is one of the platforms in the SL Sweep lineup. You open it from your player dashboard, right next to Orion Stars, Juwa, GameVault and the rest.",
      "Because your SL Sweep account handles funds and cash-outs, trying Cash Frenzy does not mean setting up yet another account somewhere else.",
    ],
    spotlight: {
      heading: "Where Cash Frenzy fits in your game list",
      body: [
        "Cash Frenzy is a good pick when you want a change from the fish table platforms. If you enjoy it, Vegas Sweeps and Juwa 2.0 are worth a look too.",
      ],
    },
    faqs: [
      {
        question: "Where do I find Cash Frenzy on SL Sweep?",
        answer:
          "Cash Frenzy appears in the game list in your SL Sweep player dashboard, alongside our other sweepstakes platforms.",
      },
      {
        question: "What games are similar to Cash Frenzy?",
        answer:
          "If you like Cash Frenzy, try Vegas Sweeps and Juwa 2.0. Both are available from the same SL Sweep dashboard.",
      },
    ],
    related: ["vegas-sweeps", "juwa-2", "orion-stars"],
    todo: [
      "About Cash Frenzy: game library and standout titles. Make clear which Cash Frenzy platform this is.",
      "Supported devices for Cash Frenzy and whether a separate app is involved.",
      "Any Cash Frenzy–specific minimums, limits or promotions on SL Sweep.",
    ],
  },
};
