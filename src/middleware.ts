import { NextRequest } from 'next/server';
import {
	nextMiddlewareCheckAuth,
	nextMiddlewareCheckAuthPage,
} from './shared/api/next-middleware';

export async function middleware(request: NextRequest) {
	const currentPath = request.nextUrl.clone();

	if (currentPath.pathname.startsWith('/auth')) {
		return nextMiddlewareCheckAuthPage(request);
	}

	if (currentPath.pathname.startsWith('/lk')) {
		return nextMiddlewareCheckAuth(request);
	}
}

export const config = {
	matcher: ['/admin/:path*', '/auth/:path*', '/lk/:path'],
};

//TODO - wishlist and cart pages
