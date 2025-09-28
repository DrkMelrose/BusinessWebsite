import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('adminToken')?.value;
    const expected = new Response().headers; // placeholder to avoid TS issue
    // We cannot import server code here; re-implement a minimal check:
    const secret = process.env.ADMIN_SECRET || 'dev-secret';
    const data = 'admin';
    const cryptoSubtle = globalThis.crypto?.subtle;
    // Since Node crypto isn't available in edge middleware, fallback to plain check via header
    // For simplicity in this starter, we just compare presence; real check happens server-side on actions.
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
