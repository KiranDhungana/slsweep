import { playUrl } from "./site";

export type Game = {
  slug: string;
  name: string;
  /** Two-line title as shown on the tile art */
  title: [string, string?];
  /** Tailwind gradient classes for the tile background */
  bg: string;
  /** Tailwind gradient classes for the title text fill */
  text: string;
  /** Optional artwork in /public/games. When set, it replaces the generated tile. */
  image?: string;
  href: string;
};

export const games: Game[] = [
  {
    slug: "gamevault",
    name: "GameVault",
    title: ["Game", "Vault"],
    bg: "from-amber-950 via-amber-700 to-yellow-500",
    text: "from-yellow-100 via-yellow-300 to-amber-500",
    image: "/games/gamevault.png",
    href: playUrl,
  },
  {
    slug: "juwa",
    name: "Juwa",
    title: ["Juwa", "777"],
    bg: "from-yellow-950 via-amber-700 to-red-600",
    text: "from-yellow-100 via-amber-300 to-red-400",
    image: "/games/juwa.png",
    href: playUrl,
  },
  {
    slug: "orion-stars",
    name: "Orion Stars",
    title: ["Orion", "Stars"],
    bg: "from-purple-950 via-fuchsia-800 to-orange-500",
    text: "from-yellow-100 via-amber-300 to-orange-500",
    image: "/games/orion-stars.png",
    href: playUrl,
  },
  {
    slug: "firekirin",
    name: "FireKirin",
    title: ["Fire", "Kirin"],
    bg: "from-red-950 via-red-700 to-orange-500",
    text: "from-yellow-100 via-orange-300 to-red-500",
    image: "/games/firekirin.png",
    href: playUrl,
  },
  {
    slug: "cashfrenzy",
    name: "CashFrenzy",
    title: ["Cash", "Frenzy"],
    bg: "from-emerald-950 via-green-600 to-lime-400",
    text: "from-yellow-100 via-yellow-300 to-lime-400",
    image: "/games/cashfrenzy.png",
    href: playUrl,
  },
  {
    slug: "milky-way",
    name: "Milky Way",
    title: ["Milky", "Way"],
    bg: "from-indigo-950 via-violet-700 to-sky-500",
    text: "from-white via-sky-200 to-violet-300",
    image: "/games/milky-way.png",
    href: playUrl,
  },
  {
    slug: "lasvegas-sweeps",
    name: "Vegas Sweeps",
    title: ["Vegas", "Sweeps"],
    bg: "from-indigo-950 via-purple-800 to-pink-600",
    text: "from-white via-rose-200 to-red-400",
    image: "/games/lasvegas-sweeps.png",
    href: playUrl,
  },
];
