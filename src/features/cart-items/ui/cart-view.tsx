import { TypographyH1, TypographySmall } from '@/shared/ui/typography';
import { Dispatch, SetStateAction } from 'react';
import { CartItem } from './cart-item';
import { formatWord } from '@/shared/utils/format-product-word';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteSeveralCartItemApi } from '../api/delete-several-cart-items-api';
import { ModelCartItem } from '@/shared/api/generated';
import { parsePriceRUB } from '@/shared/utils/parse-price';
import { Separator } from '@/shared/ui/separator';

export const CartView = ({
	selected,
	setSelected,
	setCheckoutVisible,
	cart,
	discountPrice,
	productPrice,
	quantity,
}: {
	selected: ModelCartItem[];
	setSelected: Dispatch<SetStateAction<ModelCartItem[]>>;
	setCheckoutVisible: () => void;
	cart?: ModelCartItem[];
	quantity: number;
	discountPrice: number;
	productPrice: number;
}): JSX.Element => {
	const deleteSeveralCartItems = useDeleteSeveralCartItemApi();

	const selectAll = (checked: boolean) => {
		if (checked) {
			if (cart?.length) {
				setSelected(cart);
			}
		} else {
			setSelected([]);
		}
	};

	const onDeleteSeveralClick = () => {
		const ids = selected.map(item => item.cart_item_model_size.model_size_id);
		deleteSeveralCartItems(ids);
	};

	const selectedAllChecked = cart?.length === selected.length;

	return (
		<>
			<div className='flex items-center mb-5'>
				<TypographyH1 className='font-normal'>Корзина</TypographyH1>
				{cart && cart.length > 0 && (
					<div className='text-xl text-foreground/60 ml-3'>
						{formatWord(cart.length)}
					</div>
				)}
			</div>
			<div className='mb-10 flex items-center'>
				<div className='flex items-center'>
					<Checkbox
						className='w-6 h-6'
						id='cart-select-all'
						checked={selectedAllChecked}
						onCheckedChange={selectAll}
					/>
					<Label className='ml-2' htmlFor='cart-select-all'>
						Выбрать все
					</Label>
				</div>
				{quantity > 0 && (
					<div className='ml-5'>
						<Button variant='outline' onClick={onDeleteSeveralClick}>
							<Icon icon='delete_outline_24' className='mr-2' />
							<TypographySmall>Удалить {quantity}</TypographySmall>
						</Button>
					</div>
				)}
			</div>
			<div className='grid grid-cols-[4fr_2fr] gap-x-6'>
				<div>
					{cart?.map(item => (
						<CartItem
							item={item}
							key={item.cart_item_id}
							setSelected={setSelected}
							selectedItems={selected}
						/>
					))}
				</div>
				<div className='shadow-2xl p-3 rounded-lg flex flex-col'>
					<div className='text-2xl'>Сумма заказа</div>
					<Separator className='my-3' />
					{selected.length > 0 && (
						<>
							<div className='flex justify-between'>
								<div>{formatWord(quantity)} на сумму</div>
								<div>{parsePriceRUB(productPrice)}</div>
							</div>
							<div className='flex justify-between'>
								<div>Скидка</div>
								<div className='text-action'>
									{parsePriceRUB(discountPrice)}
								</div>
							</div>
						</>
					)}
					<div className='flex justify-between text-2xl mt-5'>
						<div>Итого</div>
						<div>{parsePriceRUB(productPrice - discountPrice)}</div>
					</div>
					<div className='text-xs text-foreground/60 my-3'>
						Без учета возможной стоимости доставки
					</div>
					<Button
						className='flex-col'
						disabled={selected.length === 0}
						onClick={setCheckoutVisible}
					>
						{selected.length === 0 ? (
							'Выберите товары, чтобы продолжить'
						) : (
							<>
								<TypographySmall>Перейти к оформлению</TypographySmall>
								<TypographySmall className='text-xs'>
									{formatWord(quantity)}
								</TypographySmall>
							</>
						)}
					</Button>
				</div>
			</div>
		</>
	);
};
