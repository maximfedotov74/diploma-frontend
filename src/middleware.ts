import { NextRequest } from 'next/server';
import {
	nextMiddlewareCheckAuth,
	nextMiddlewareCheckAuthPage,
} from './shared/api/next-middleware';
import {
	AUTH_ROUTE,
	CART_ROUTE,
	LK_ROUTE,
	WISHLIST_ROUTE,
} from './shared/constants/routes/public';

export async function middleware(request: NextRequest) {
	const currentPath = request.nextUrl.clone();

	if (currentPath.pathname.startsWith(AUTH_ROUTE)) {
		return nextMiddlewareCheckAuthPage(request);
	}

	if (
		currentPath.pathname.startsWith(LK_ROUTE) ||
		currentPath.pathname.startsWith(CART_ROUTE) ||
		currentPath.pathname.startsWith(WISHLIST_ROUTE)
	) {
		return nextMiddlewareCheckAuth(request);
	}
}

export const config = {
	matcher: [
		'/admin/:path*',
		'/auth/:path*',
		'/lk/:path*',
		'/wishlist/:path*',
		'/cart/:path*',
	],
};

//TODO - wishlist and cart pages
