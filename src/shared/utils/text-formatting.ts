export const REMOVE_HTML_TAGS = /<[^>]+>/g;
export const REMOVE_AMPERSANDS_AND_SEMICOLONS = /&[^;]+./g;
export const REMOVE_SYMBOLS =
	/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

export const cleanText = (
	string: string,
	limit: null | number = null
): string => {
	let result = string
		.replace(REMOVE_HTML_TAGS, '')
		.replace(REMOVE_AMPERSANDS_AND_SEMICOLONS, ' ')
		.replace(REMOVE_SYMBOLS, '');
	if (limit) result = result.slice(0, limit) + '...';
	return result;
};

export const SITE_NAME = 'Family Moda';

export const titleMerge = (title: string) => `${title} | "${SITE_NAME}"`;
