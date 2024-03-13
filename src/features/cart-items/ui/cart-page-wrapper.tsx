import { ModelCartItem } from '@/shared/api/generated';
import { CheckoutView } from './checkout-view';
import { CartView } from './cart-view';
import { calculatePrice } from '@/shared/utils/calculate-price';
import { useGetCartApi } from '@/shared/api/queries/get-cart-api';
import { useMemo, useState } from 'react';

export const CartPageWrapper = (): JSX.Element => {
	const { data: cart } = useGetCartApi();

	const [selected, setSelected] = useState<ModelCartItem[]>([]);

	const [checkoutVisible, setCheckoutVisible] = useState(false);

	const setVisible = () => {
		setCheckoutVisible(true);
	};

	const setHidden = () => {
		setCheckoutVisible(false);
	};

	const quantity = useMemo(() => {
		const currentSelected = cart?.filter(item =>
			selected.some(
				s =>
					s.cart_item_model_size.model_size_id ===
					item.cart_item_model_size.model_size_id
			)
		);
		return currentSelected?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
	}, [selected, cart]);

	const { discountPrice, productPrice } = useMemo(() => {
		const currentSelected = cart?.filter(item =>
			selected.some(
				s =>
					s.cart_item_model_size.model_size_id ===
					item.cart_item_model_size.model_size_id
			)
		);
		return calculatePrice(currentSelected ?? []);
	}, [selected, cart]);

	return checkoutVisible ? (
		<CheckoutView
			selected={selected}
			setCheckoutHidden={setHidden}
			discountPrice={discountPrice}
			productPrice={productPrice}
			quantity={quantity}
		/>
	) : (
		<CartView
			selected={selected}
			setSelected={setSelected}
			setCheckoutVisible={setVisible}
			discountPrice={discountPrice}
			productPrice={productPrice}
			quantity={quantity}
			cart={cart}
		/>
	);
};
