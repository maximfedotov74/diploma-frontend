export const catalogSort = {
	price_asc: 'price_asc',
	price_desc: 'price_desc',
	discount: 'discount',
	popular: 'popular',
	new: 'new',
} as const;

export type CatalogSort = (typeof catalogSort)[keyof typeof catalogSort];
