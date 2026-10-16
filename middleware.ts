import { NextResponse, type NextRequest } from "next/server";

const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://slsweepofficial.com");
const CANONICAL_HOST = SITE_URL.host;
const WWW_VARIANT = CANONICAL_HOST.startsWith("www.")
  ? CANONICAL_HOST.slice(4)
  : `www.${CANONICAL_HOST}`;

/**
 * One public origin: https + the canonical host. Requests for the www/non-www
 * twin or plain http get a 301 to the same path on the canonical origin.
 * Local and preview hosts are left alone.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const proto = (request.headers.get("x-forwarded-proto") || "").split(",")[0].trim();

  const wrongHost = host === WWW_VARIANT;
  const insecure = host === CANONICAL_HOST && proto === "http";

  if (wrongHost || insecure) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_URL.origin);
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
