import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { legalCanonicalPath } from "@/lib/http/legal-redirects";
import { classifyLegacyRequest } from "@/lib/http/legacy-wordpress";

/**
 * Retire leftover WordPress URLs before trailing-slash normalization can
 * 308 them onto a 404 document. Content aliases 301 once; the rest 410.
 */
function legacyWordpressResponse(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return null;
  }

  const action = classifyLegacyRequest(pathname, request.nextUrl.searchParams);
  if (action.kind === "ignore") return null;

  if (action.kind === "redirect") {
    return redirectToPath(request, action.pathname, 301, "");
  }

  return new NextResponse("Gone\n", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "x-robots-tag": "noindex",
    },
  });
}

/**
 * Build a redirect from a plain URL. `NextURL` remembers the request's
 * trailing slash and would put it back on the Location header.
 */
function redirectToPath(
  request: NextRequest,
  pathname: string,
  status: 301 | 308,
  search?: string,
): NextResponse {
  const destination = new URL(request.url);
  destination.pathname = pathname;
  if (search !== undefined) destination.search = search;
  return NextResponse.redirect(destination, status);
}

function trailingSlashRedirect(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  if (pathname.length <= 1 || !pathname.endsWith("/")) return null;
  return redirectToPath(request, pathname.slice(0, -1), 308);
}

/** 301 `/privacy` and `/terms` to the canonical legal pages, including a trailing slash. */
function legalCanonicalRedirect(request: NextRequest): NextResponse | null {
  const target = legalCanonicalPath(request.nextUrl.pathname);
  if (!target) return null;
  return redirectToPath(request, target, 301);
}

/**
 * Refreshes the Auth session cookies on each matched request.
 * Gates `/admin` to editor/admin profiles when Supabase is configured.
 * Legacy WordPress URLs are answered before that, and before any trailing-slash redirect.
 */
export async function middleware(request: NextRequest) {
  const legacy = legacyWordpressResponse(request);
  if (legacy) return legacy;

  const legal = legalCanonicalRedirect(request);
  if (legal) return legal;

  const slash = trailingSlashRedirect(request);
  if (slash) return slash;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    if (!user) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Sign in required." }, { status: 401 });
      }
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/sign-in";
      redirectUrl.searchParams.set("next", path);
      return NextResponse.redirect(redirectUrl);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const role = profile?.role as string | undefined;
    if (role !== "editor" && role !== "admin") {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Editor access required." }, { status: 403 });
      }
      // Let the page render the access-denied UI for clearer messaging.
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
