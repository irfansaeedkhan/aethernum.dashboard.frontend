import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated, getUserRoleFromRequest } from '@/utils/middleware-helpers';
import { AppRoutes } from '@/constants/app-routes';
import {
  isPublicRoute,
  isAdminOnlyRoute,
  requiresAuthentication,
  canUserAccessRoute,
} from '@/constants/protected-routes';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes only
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  try {
    const isAuth = await isAuthenticated(request);

    if (!isAuth) {
      const loginUrl = new URL(AppRoutes.auth.login, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin routes
    if (isAdminOnlyRoute(pathname)) {
      const userRole = await getUserRoleFromRequest(request);
      if (userRole !== 'admin') {
        const userDashboardUrl = new URL(AppRoutes.dashboard.index, request.url);
        return NextResponse.redirect(userDashboardUrl);
      }
    }

    return NextResponse.next();
  } catch (error) {
    const loginUrl = new URL(AppRoutes.auth.login, request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.svg (favicon files)
     * - images (public images)
     * - fonts (public fonts)
     * - site.webmanifest, manifest.webmanifest (PWA manifests)
     */
    '/((?!api|_next/static|_next/image|favicon|images|fonts|.*\\.webmanifest).*)',
  ],
};
