import {
	ModelCartItem,
	ModelOrderConditions,
	ModelPaymentMethodEnum,
} from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { TypographySmall } from '@/shared/ui/typography';
import { useCreateOrderApi } from '../api/create-order-api';
import { useState } from 'react';
import { getCookie } from '@/shared/utils/cookie';

export const CheckoutView = ({
	selected,
	setCheckoutHidden,
	discountPrice,
	productPrice,
	quantity,
}: {
	selected: ModelCartItem[];
	setCheckoutHidden: () => void;
	discountPrice: number;
	productPrice: number;
	quantity: number;
}): JSX.Element => {
	const createOrder = useCreateOrderApi();

	const [paymentMethod, setPaymentMethod] =
		useState<ModelPaymentMethodEnum>('online');

	const [conditions, setConditions] =
		useState<ModelOrderConditions>('with_fitting');

	const onSubmit = async () => {
		await createOrder({
			delivery_point_id: 1,
			model_size_ids: selected.map(
				item => item.cart_item_model_size.model_size_id
			),
			order_conditions: conditions,
			payment_method: paymentMethod,
			recipient_firstname: 'Maxim',
			recipient_lastname: 'Fedotov',
			recipient_phone: '+79517765144',
		});
	};

	return (
		<div>
			<div className='mb-10'>
				<Button onClick={setCheckoutHidden} variant='outline'>
					<Icon icon='arrow_left_outline_24' className='mr-2' />
					<TypographySmall>В корзину</TypographySmall>
				</Button>
			</div>

			<div>
				<Button onClick={onSubmit}>Оформить заказ</Button>
			</div>
		</div>
	);
};
