import Link from "next/link";
import Logo from "./Logo";

const links = ["Home", "Games", "About", "How It Works", "Support"];

function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <a href="#" aria-label={label} className="text-white/80 transition hover:text-brand-300">
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
  return (
    <footer id="support" className="bg-brand-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
          <Logo light />
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            {links.map((l) => (
              <Link key={l} href="#" className="hover:text-white">
                {l}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <SocialIcon key={s.label} {...s} />
          ))}
          <p className="ml-2 text-xs text-white/70">© {new Date().getFullYear()} SL Sweep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
