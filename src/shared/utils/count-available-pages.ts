export const countAvailablePages = (pages: number, page: number) => {
	const pagesNumbers = Array.from({ length: pages }).map((_, idx) => {
		return idx + 1;
	});

	const leftArr: number[] = [];
	const rightArr: number[] = [];

	pagesNumbers.forEach(v => {
		if (page + 1 === v || page + 2 === v) {
			rightArr.push(v);
		}
		if (page - 1 === v || page - 2 === v) {
			leftArr.push(v);
		}
	});
	return [...leftArr, page, ...rightArr];
};
