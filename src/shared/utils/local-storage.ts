import { IS_SERVER } from '../constants/env';

export const saveToLocalStorage = <T>(key: string, data: T) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch {
		throw new Error(
			'An error occurred while writing the value to the local storage'
		);
	}
};

export const getFromLocalStorage = <T>(key: string): T | null => {
	try {
		if (typeof localStorage !== 'undefined' && !IS_SERVER) {
			const item = localStorage.getItem(key);
			if (item) {
				return JSON.parse(item) as T;
			}
			return null;
		}
		return null;
	} catch (e) {
		return null;
	}
};

export const removeFromLocalStorage = (key: string) => {
	if (typeof localStorage !== 'undefined' && !IS_SERVER) {
		localStorage.removeItem('theme');
	}
};
