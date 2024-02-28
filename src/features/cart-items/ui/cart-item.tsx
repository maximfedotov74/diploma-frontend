import Image from 'next/image';
import { ModelCartItem } from '../../../shared/api/generated';
import { TypographySmall } from '../../../shared/ui/typography';
import { QuantityManager } from './quantity-manager';
import { Price } from '@/shared/ui/price';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { ToggleToWishlist } from '@/features/toggle-to-wishlist/toggle-to-wishlist';
import { Checkbox } from '@/shared/ui/checkbox';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteCartItemApi } from '../api/delete-cart-item-api';

export const CartItem = ({
	item,
	setSelected,
	selectedItems,
}: {
	item: ModelCartItem;
	setSelected: Dispatch<SetStateAction<ModelCartItem[]>>;
	selectedItems: ModelCartItem[];
}): JSX.Element => {
	const onChecked = (checked: boolean) => {
		if (checked) {
			setSelected(p => [...p, item]);
		} else {
			setSelected(p =>
				p.filter(
					c =>
						c.cart_item_model_size.model_size_id !==
						item.cart_item_model_size.model_size_id
				)
			);
		}
	};

	const deleteCartItem = useDeleteCartItemApi();

	const checked = selectedItems.find(
		c =>
			c.cart_item_model_size.model_size_id ===
			item.cart_item_model_size.model_size_id
	);

	return (
		<div className='flex mb-3 last:mb-0'>
			<div className='mr-2'>
				<Checkbox
					className='w-6 h-6'
					checked={checked ? true : false}
					onCheckedChange={onChecked}
				/>
			</div>
			<div className='flex w-full'>
				<Image
					src={item.cart_item_model_size.model.image_path}
					alt='Изображение товара'
					width={200}
					height={200}
					className='w-[115px] h-[170px]'
				/>
				<div className='ml-4'>
					<div className='flex flex-col'>
						<TypographySmall className='mb-2'>
							{item.cart_item_model_size.model.title}{' '}
							{item.cart_item_model_size.model.brand.title}
						</TypographySmall>
						<TypographySmall className='mb-2'>
							{item.cart_item_model_size.size_value} (
							{item.cart_item_model_size.literal_size})
						</TypographySmall>
					</div>
					<QuantityManager
						modelSizeId={item.cart_item_model_size.model_size_id}
						quantity={item.quantity}
					/>
				</div>
				<div className='ml-auto flex flex-col'>
					{item.cart_item_model_size.in_stock > 0 ? (
						<Price
							price={item.cart_item_model_size.model.price}
							discount={item.cart_item_model_size.model.discount}
						/>
					) : (
						<TypographySmall>Нет в наличии</TypographySmall>
					)}
					<div className='mt-auto flex items-center'>
						<div className='mr-4'>
							<ToggleToWishlist
								modelId={item.cart_item_model_size.model.model_id}
							/>
						</div>
						<div>
							<Button
								variant='outline'
								onClick={() =>
									deleteCartItem(item.cart_item_model_size.model_size_id)
								}
							>
								<Icon icon='delete_outline_24' className='mr-2' />
								<TypographySmall>Удалить</TypographySmall>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
