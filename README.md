# SL Sweep landing page (Next.js + TypeScript + Tailwind)

```bash
npm install
npm run dev   # http://localhost:3000
```

## Structure
- `app/page.tsx`: assembles the sections
- `components/`: Header, Hero, PhoneMockup, GamePlatforms, GameArt, DashboardSection, CTASection, Footer, Logo
- `lib/games.ts`: the six game platforms (name, tile colors, link)
- `tailwind.config.ts`: the `brand` green palette. Change it there to re-theme the whole site.

## Game artwork
Tiles are drawn with CSS gradients. To use real artwork, put an image in
`public/games/` and set `image: "/games/your-file.png"` on that game in `lib/games.ts`.
Make sure you have the rights to use each platform's logo/art.
