export const parseDate = (d?: string) => {
	if (d) {
		try {
			let date = new Date(d);
			return date;
		} catch (error) {
			return undefined;
		}
	}
	return undefined;
};
