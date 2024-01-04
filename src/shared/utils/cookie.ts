export function getCookie(key: string) {
	let matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : null;
}

export function setCookie(key: string, value: string, options: any = {}) {
	if (!options.path) {
		options.path = '/';
	}

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

export function deleteCookie(key: string) {
	setCookie(key, '', {
		'max-age': -1,
	});
}
