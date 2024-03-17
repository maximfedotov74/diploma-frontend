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
import { Link } from '@/shared/ui/link';
import { PRODUCT_ROUTE } from '@/shared/constants/routes/public';

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
					className='w-5 h-5 sm:w-6 sm:h-6'
					checked={checked ? true : false}
					onCheckedChange={onChecked}
				/>
			</div>
			<div className='block sm:flex w-full'>
				<div className='flex'>
					<Link
						href={`${PRODUCT_ROUTE}/${item.cart_item_model_size.model.slug}`}
					>
						<Image
							src={item.cart_item_model_size.model.image_path}
							alt='Изображение товара'
							width={200}
							height={200}
							className='w-[115px] h-[170px]'
						/>
					</Link>
					<div className='ml-2 sm:ml-4'>
						<div className='flex flex-col'>
							<TypographySmall className='text-[13px] sm:text-sm mb-2'>
								{item.cart_item_model_size.model.title}{' '}
								{item.cart_item_model_size.model.brand.title}
							</TypographySmall>
							<TypographySmall className='text-[13px] sm:text-sm mb-2'>
								{item.cart_item_model_size.size_value} (
								{item.cart_item_model_size.literal_size})
							</TypographySmall>
						</div>
						<QuantityManager
							modelSizeId={item.cart_item_model_size.model_size_id}
							quantity={item.quantity}
						/>
					</div>
				</div>
				<div className='sm:ml-auto flex items-center sm:items-stretch justify-between sm:justify-normal sm:flex-col'>
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
								size='icon'
								onClick={() =>
									deleteCartItem(item.cart_item_model_size.model_size_id)
								}
							>
								<Icon icon='delete_outline_24' />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
