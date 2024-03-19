import {
	ModelCartItem,
	ModelCreateOrderDto,
	ModelDeliveryPoint,
	ModelOrderConditions,
	ModelPaymentMethodEnum,
} from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { TypographyH1, TypographySmall } from '@/shared/ui/typography';
import { useCreateOrderApi } from '../api/create-order-api';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import {
	orderConditionsTranslate,
	orderPaymentMethodTranslate,
} from '@/shared/translation';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validPhone } from '@/shared/constants/regexp';
import Image from 'next/image';
import { Link } from '@/shared/ui/link';
import { PRODUCT_ROUTE } from '@/shared/constants/routes/public';
import { formatWord } from '@/shared/utils/format-product-word';
import { parsePriceRUB } from '@/shared/utils/parse-price';
import { Separator } from '@/shared/ui/separator';
import { SelectDelivery } from './select-delivery';
import { useToast } from '@/shared/ui/use-toast';

type FormState = Pick<
	ModelCreateOrderDto,
	'recipient_firstname' | 'recipient_lastname' | 'recipient_phone'
>;

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
	const createOrder = useCreateOrderApi(setCheckoutHidden);

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<FormState>({ mode: 'onChange' });

	const { toast } = useToast();

	const [paymentMethod, setPaymentMethod] =
		useState<ModelPaymentMethodEnum>('online');

	const [conditions, setConditions] =
		useState<ModelOrderConditions>('with_fitting');

	const [delivery, setDelivery] = useState<ModelDeliveryPoint | undefined>();

	const onSubmit: SubmitHandler<FormState> = async data => {
		if (delivery) {
			await createOrder({
				delivery_point_id: delivery.delivery_point_id,
				model_size_ids: selected.map(
					item => item.cart_item_model_size.model_size_id
				),
				order_conditions: conditions,
				payment_method: paymentMethod,
				recipient_firstname: data.recipient_firstname,
				recipient_lastname: data.recipient_lastname,
				recipient_phone: data.recipient_phone,
			});
		} else {
			toast({ title: 'Выберите пункт выдачи!' });
		}
	};

	return (
		<>
			<div className='mb-5'>
				<Button onClick={setCheckoutHidden} variant='outline'>
					<Icon icon='arrow_left_outline_24' className='mr-2' />
					<TypographySmall>В корзину</TypographySmall>
				</Button>
			</div>
			<div className='flex items-center mb-5'>
				<TypographyH1 className='font-normal'>Оформление заказа</TypographyH1>
			</div>

			<div className='lg:grid grid-cols-[4fr_2fr] gap-x-6'>
				<div className='mb-8 lg:mb-0'>
					<div className='mb-5'>
						<SelectDelivery setDelivery={setDelivery} point={delivery} />
					</div>
					<div className='mb-5'>
						<div className='text-xl mb-4'>Способ оплаты</div>
						<RadioGroup
							value={paymentMethod}
							onValueChange={v => setPaymentMethod(v as ModelPaymentMethodEnum)}
						>
							<div>
								<RadioGroupItem
									value={ModelPaymentMethodEnum.online}
									id={ModelPaymentMethodEnum.online}
								/>
								<Label htmlFor={ModelPaymentMethodEnum.online} className='ml-2'>
									{orderPaymentMethodTranslate['online']}
								</Label>
							</div>
							<div>
								<RadioGroupItem
									value={ModelPaymentMethodEnum.upon_receipt}
									id={ModelPaymentMethodEnum.upon_receipt}
								/>
								<Label
									htmlFor={ModelPaymentMethodEnum.upon_receipt}
									className='ml-2'
								>
									{orderPaymentMethodTranslate['upon_receipt']}
								</Label>
							</div>
						</RadioGroup>
					</div>
					<div className='mb-5'>
						<div className='text-xl mb-4'>Условия доставки</div>
						<RadioGroup
							value={conditions}
							onValueChange={v => setConditions(v as ModelOrderConditions)}
						>
							<div>
								<RadioGroupItem
									value={ModelOrderConditions.with_fitting}
									id={ModelOrderConditions.with_fitting}
								/>
								<Label
									htmlFor={ModelOrderConditions.with_fitting}
									className='ml-2'
								>
									{orderConditionsTranslate['with_fitting']}
								</Label>
							</div>
							<div>
								<RadioGroupItem
									value={ModelOrderConditions.without_fitting}
									id={ModelOrderConditions.without_fitting}
								/>
								<Label
									htmlFor={ModelOrderConditions.without_fitting}
									className='ml-2'
								>
									{orderConditionsTranslate['without_fitting']}
								</Label>
							</div>
						</RadioGroup>
					</div>

					<div>
						<div className='text-xl mb-4'>Кто заберет заказ?</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Input
								placeholder='Имя'
								className='mb-3'
								{...register('recipient_firstname', {
									required: 'Имя - обязательное поле!',
									minLength: {
										value: 2,
										message: 'Длина имени должна быть от 2 символов!',
									},
								})}
								error={errors.recipient_firstname?.message}
							/>
							<Input
								placeholder='Фамилия'
								className='mb-3'
								{...register('recipient_lastname', {
									required: 'Фамилия - обязательное поле!',
									minLength: {
										value: 2,
										message: 'Длина фамилии должна быть от 2 символов!',
									},
								})}
								error={errors.recipient_lastname?.message}
							/>
							<Input
								placeholder='Телефон'
								className='mb-3'
								type='tel'
								{...register('recipient_phone', {
									required: 'Телефон - обязательное поле!',
									pattern: {
										value: validPhone,
										message: 'Неверный формат телефона!',
									},
								})}
								error={errors.recipient_phone?.message}
							/>
							<Button>Оформить заказ</Button>
						</form>
					</div>
				</div>
				<div className='shadow-2xl p-3 rounded-lg flex flex-col'>
					<div className='text-xl sm:text-2xl'>Ваш заказ</div>
					<div className='grid grid-cols-4 gap-3 mb-5'>
						{selected.map(item => (
							<Link
								key={item.cart_item_id}
								className='relative block'
								href={`${PRODUCT_ROUTE}/${item.cart_item_model_size.model.slug}`}
							>
								<Image
									src={item.cart_item_model_size.model.image_path}
									alt='Изображение модели товара'
									width={140}
									className='w-full h-'
									height={140}
								/>
								<div className='bg-slate-400 text-xs w-2/3 absolute bottom-0 left-0'>
									{item.quantity} шт.
								</div>
							</Link>
						))}
					</div>
					<div className='flex justify-between text-sm sm:text-base'>
						<div>{formatWord(quantity)} на сумму</div>
						<div>{parsePriceRUB(productPrice)}</div>
					</div>
					<div className='flex justify-between text-sm sm:text-base'>
						<div>Скидка</div>
						<div className='text-action'>{parsePriceRUB(discountPrice)}</div>
					</div>
					{conditions === 'with_fitting' && (
						<div className='flex justify-between text-sm sm:text-base'>
							<div>Доставка</div>
							<div>{parsePriceRUB(199)}</div>
						</div>
					)}
					<Separator className='my-5' />
					<div className='flex justify-between text-xl sm:text-2xl'>
						<div>Итого</div>
						<div>
							{conditions === 'with_fitting'
								? parsePriceRUB(productPrice - discountPrice + 199)
								: parsePriceRUB(productPrice - discountPrice)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
