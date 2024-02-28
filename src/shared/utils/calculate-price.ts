import { ModelCartItem } from '../api/generated';

export function calculatePrice(items: ModelCartItem[]): {
	productPrice: number;
	discountPrice: number;
} {
	let productPrice = 0;
	let discountPrice = 0;

	for (const item of items) {
		productPrice += item.cart_item_model_size.model.price * item.quantity;
		if (item.cart_item_model_size.model.discount) {
			discountPrice +=
				Math.round(
					(item.cart_item_model_size.model.price / 100) *
						item.cart_item_model_size.model.discount
				) * item.quantity;
		}
	}

	return { productPrice, discountPrice };
}
