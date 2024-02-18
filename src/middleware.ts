import { NextRequest, NextResponse } from 'next/server';
import { api } from './shared/api/api';

export async function middleware(request: NextRequest) {
	const user = request.headers.get('User-Agent');
	// const cats = api({
	// 	method: 'GET',
	// 	url: `/api/category/`,
	// 	headers: {
	// 		Authorization: 'Beared middleware-token',
	// 		'User-Agent': user || 'Next.js Middleware',
	// 	},
	// });

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*'],
};
