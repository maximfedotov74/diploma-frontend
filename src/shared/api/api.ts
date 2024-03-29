import { IS_SERVER } from '../constants/env';
import { getCookie } from '../utils/cookie';

type QueryParams = Record<string, unknown>;

type ExecuterOptions = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	url: string;
	params?: QueryParams;
	data?: unknown;
	headers?: Record<string, string>;
};

export const api = async <T>(options: ExecuterOptions): Promise<T> => {
	const res = await executer(options);
	return res;
};

const executer = async (options: ExecuterOptions) => {
	let host = '';

	if (IS_SERVER) {
		host = (process.env.API_URL as string).replace(/\/$/, '');
	}

	const searchParams = new URLSearchParams('');
	if (options.params) {
		for (var key in options.params) {
			var value = options.params[key];
			searchParams.set(key, `${value}`);
		}
	}

	let url = `${host}${options.url}`;

	let cleanUrl = url.replace(/\/$/, '');

	if (options.params) {
		cleanUrl = `${cleanUrl}/?${searchParams.toString()}`;
	}

	if (options.headers?.['Content-Type']) {
		if (options.headers['Content-Type'] === 'multipart/form-data') {
			delete options.headers['Content-Type'];
		}
	}

	const initialRequest = async () => {
		const response = await fetch(cleanUrl, {
			...options,
			credentials: 'include',
			body: options.data
				? options.data instanceof FormData
					? options.data
					: JSON.stringify(options.data)
				: null,
			headers: {
				Authorization: `Bearer ${getCookie('access_token')}`,
				...options.headers,
			},
		});

		return response;
	};

	try {
		const response = await initialRequest();

		if (!response.ok) {
			if (response.status === 401) {
				let refreshUrl = `${host}/api/auth/refresh-token`;
				const refreshResponse = await fetch(refreshUrl, {
					credentials: 'include',
					method: 'GET',
				});
				if (refreshResponse.ok) {
					const newResponse = await initialRequest();

					const data = await newResponse.json();
					if (newResponse.ok) {
						return data;
					}
					throw data;
				}
			}
			const err = await response.json();
			throw err;
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
};

export type BodyType<Data> = Data;
export type ErrorType = {
	message: string;
	status: number;
	errors?: { key: string; message: string }[];
};
