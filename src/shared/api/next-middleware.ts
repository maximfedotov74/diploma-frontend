import { NextRequest, NextResponse } from 'next/server';
import { ModelLoginResponse } from './generated';
import { AUTH_ROUTE, HOME_ROUTE } from '../constants/routes/public';

export const nextMiddlewareCheckAuthPage = async (request: NextRequest) => {
	const API_URl = process.env.API_URL as string;

	const accessToken = request.cookies.get('access_token')?.value;
	const refreshToken = request.cookies.get('refresh_token')?.value;
	const userAgent = request.headers.get('User-Agent') ?? 'Next.js server';

	const home = request.nextUrl.clone();
	home.pathname = HOME_ROUTE;
	const newNextResponse = NextResponse.redirect(home);
	try {
		const sessionResponse = await fetch(`${API_URl}/api/user/session`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'User-Agent': userAgent,
			},
		});

		if (!sessionResponse.ok) {
			if (sessionResponse.status === 401) {
				const refreshResponse = await fetch(
					`${API_URl}/api/auth/refresh-token`,
					{
						method: 'GET',
						headers: {
							Cookie: `refresh_token=${refreshToken};`,
							'User-Agent': userAgent,
						},
					}
				);
				if (refreshResponse.ok) {
					const refreshData =
						(await refreshResponse.json()) as ModelLoginResponse;
					const newSessionResponse = await fetch(
						`${API_URl}/api/user/session`,
						{
							method: 'GET',
							headers: {
								Authorization: `Bearer ${refreshData.tokens.access_token}`,
								'User-Agent': userAgent,
							},
						}
					);

					if (newSessionResponse.ok) {
						newNextResponse.cookies.set(
							'access_token',
							refreshData.tokens.access_token,
							{
								path: '/',
								expires: new Date(refreshData.tokens.access_exp_time).getTime(),
							}
						);
						newNextResponse.cookies.set(
							'refresh_token',
							refreshData.tokens.refresh_token,
							{
								path: '/',
								expires: new Date(refreshData.tokens.refresh_exp_time),

								httpOnly: true,
							}
						);
						return newNextResponse;
					}
					return NextResponse.next();
				}
				return NextResponse.next();
			}
			return NextResponse.next();
		}
		return newNextResponse;
	} catch (err) {
		return NextResponse.next();
	}
};

export const nextMiddlewareCheckAuth = async (request: NextRequest) => {
	const API_URl = process.env.API_URL as string;

	const accessToken = request.cookies.get('access_token')?.value;
	const refreshToken = request.cookies.get('refresh_token')?.value;
	const userAgent = request.headers.get('User-Agent') ?? 'Next.js server';

	const auth = request.nextUrl.clone();
	auth.pathname = AUTH_ROUTE;
	const newNextResponse = NextResponse.next();
	try {
		const sessionResponse = await fetch(`${API_URl}/api/user/session`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'User-Agent': userAgent,
			},
		});

		if (!sessionResponse.ok) {
			if (sessionResponse.status === 401) {
				const refreshResponse = await fetch(
					`${API_URl}/api/auth/refresh-token`,
					{
						method: 'GET',
						headers: {
							Cookie: `refresh_token=${refreshToken};`,
							'User-Agent': userAgent,
						},
					}
				);
				if (refreshResponse.ok) {
					const refreshData =
						(await refreshResponse.json()) as ModelLoginResponse;
					const newSessionResponse = await fetch(
						`${API_URl}/api/user/session`,
						{
							method: 'GET',
							headers: {
								Authorization: `Bearer ${refreshData.tokens.access_token}`,
								'User-Agent': userAgent,
							},
						}
					);

					if (newSessionResponse.ok) {
						newNextResponse.cookies.set(
							'access_token',
							refreshData.tokens.access_token,
							{
								path: '/',
								expires: new Date(refreshData.tokens.access_exp_time).getTime(),
							}
						);
						newNextResponse.cookies.set(
							'refresh_token',
							refreshData.tokens.refresh_token,
							{
								path: '/',
								expires: new Date(refreshData.tokens.refresh_exp_time),

								httpOnly: true,
							}
						);

						return newNextResponse;
					}
					return NextResponse.redirect(auth);
				}
				return NextResponse.redirect(auth);
			}

			return NextResponse.redirect(auth);
		}

		return newNextResponse;
	} catch (err) {
		return NextResponse.redirect(auth);
	}
};
