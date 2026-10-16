import Link from "next/link";
import { games, gamePath } from "@/lib/games";
import { socialUrls } from "@/lib/site";
import Logo from "./Logo";

const columns = [
  {
    title: "Games",
    links: [
      { label: "All Games", href: "/games/" },
      ...games.map((g) => ({ label: g.name, href: gamePath(g.slug) })),
    ],
  },
  {
    title: "SL Sweep",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/how-it-works/" },
      { label: "About", href: "/about/" },
      { label: "Blog", href: "/blog/" },
      { label: "Apps", href: "/apps/" },
      { label: "Sites", href: "/sites/" },
    ],
  },
  {
    title: "Help & Legal",
    links: [
      { label: "Support", href: "/support/" },
      { label: "Terms", href: "/terms/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Sweepstakes Rules", href: "/sweepstakes-rules/" },
      { label: "Responsible Play", href: "/responsible-play/" },
    ],
  },
];

function SocialIcon({ label, path, href }: { label: string; path: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={label}
      className="grid h-12 w-12 place-items-center text-white/80 transition hover:text-brand-300"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d={path} />
      </svg>
    </a>
  );
}

const socials = [
  { label: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" },
  { label: "X", path: "M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" },
  { label: "Instagram", path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.2c-.1-1.5-.4-2.8-1.5-3.8S17.3 3.1 15.8 3c-1.5-.1-6.1-.1-7.6 0-1.5.1-2.8.4-3.8 1.4S3.1 6.7 3 8.2c-.1 1.5-.1 6.1 0 7.6.1 1.5.4 2.8 1.4 3.8s2.3 1.3 3.8 1.4c1.5.1 6.1.1 7.6 0 1.5-.1 2.8-.4 3.8-1.4s1.3-2.3 1.4-3.8c.1-1.5.1-6.1 0-7.6Zm-2 9.4a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4A3 3 0 0 1 5 17.6c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5.3c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4A3 3 0 0 1 19 7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z" },
  { label: "YouTube", path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15V9l5.8 3-5.8 3Z" },
];

export default function Footer() {
  const activeSocials = socials
    .map((s) => ({ ...s, href: socialUrls[s.label as keyof typeof socialUrls] }))
    .filter((s) => s.href);

  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <Link href="/" aria-label="SL Sweep home" className="inline-block">
              <Logo light />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              The automated gaming platform for sweepstakes games online.
            </p>
            {activeSocials.length > 0 && (
              <div className="mt-4 flex items-center gap-1">
                {activeSocials.map((s) => (
                  <SocialIcon key={s.label} {...s} />
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-sm font-bold uppercase tracking-wider text-brand-300">{col.title}</p>
                <ul className="mt-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-[48px] items-center text-sm text-white/80 hover:text-white md:min-h-[36px]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          © {new Date().getFullYear()} SL Sweep. Sweepstakes games are for entertainment. Please{" "}
          <Link href="/responsible-play/" className="underline hover:text-white">
            play responsibly
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
