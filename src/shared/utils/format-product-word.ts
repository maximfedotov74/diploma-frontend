export function formatWord(number: number) {
	let words = ['товар', 'товара', 'товаров'];
	let cases = [2, 0, 1, 1, 1, 2];
	let index;

	if (number % 100 > 4 && number % 100 < 20) {
		index = 2;
	} else {
		index = cases[Math.min(number % 10, 5)];
	}

	return number + ' ' + words[index];
}
