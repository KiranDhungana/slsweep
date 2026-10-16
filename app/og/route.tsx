import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const runtime = "edge";

/** Branded 1200×630 social share card: /og?title=...&eyebrow=... */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || SITE_NAME).slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") || SITE_NAME).slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #04291b 0%, #074d31 55%, #079455 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#6ce9a6" }}>
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 60 : 76,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#32d583",
              marginRight: 16,
            }}
          />
          {SITE_NAME}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    }
  );
}
