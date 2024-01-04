var API_URL = 'http://localhost:5000/api';

type QueryParams = Record<string, string>;

type FetchOptions = RequestInit & {
	query: QueryParams;
};

export var publicApi = (path: string, options?: FetchOptions) => {
	var url = new URL(API_URL + path);
	if (options?.query) {
		for (var key in options.query) {
			var value = options.query[key];
			url.searchParams.set(key, value);
		}
	}

	fetch(url, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
