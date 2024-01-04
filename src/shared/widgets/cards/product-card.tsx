import { HoverCarousel } from '../../ui/carousel/hover-carousel';
import { Badge } from '../../ui/badge';
import { Price } from '../../ui/price';
import { WishlistBtn } from '@/shared/features/wishlist-btn';
import { SizeSelect } from '@/shared/ui/choice-lists/size-select';
import { useState } from 'react';
import { ProductCardSelect } from './product-card-select';
import { ProductCardSizes } from './product-card-sizes';

type Product = {
	images: { id: number; path: string; alt: string }[];
	title: string;
	price: number;
	id: number;
	discount?: number;
	brand: string;
	category: string;
};

type ProductCardProps = {
	product: Product;
	select?: boolean;
};

const sizes = [
	{
		size_id: 1,
		model_id: 1,
		size_model_id: 1,
		literal: 'S',
		size_value: '44',
		in_stock: 100,
	},
	{
		size_id: 2,
		model_id: 1,
		size_model_id: 2,
		literal: 'M',
		size_value: '46',
		in_stock: 150,
	},
];

export const ProductCard = ({
	product,
	select = false,
}: ProductCardProps): JSX.Element => {
	const [openSize, setOpenSize] = useState(false);
	return (
		<>
			<div
				className='p-1 transition-shadow hover:shadow-2xl relative'
				onMouseEnter={() => {
					if (!select) {
						setOpenSize(true);
					}
				}}
				onMouseLeave={() => {
					if (!select) {
						setOpenSize(false);
					}
				}}
			>
				<div className='relative'>
					<HoverCarousel images={product.images} />
					{product.discount && (
						<Badge className='absolute bottom-0 left-0'>
							-{product.discount}%
						</Badge>
					)}
					<div className='absolute top-2 right-2'>
						<WishlistBtn modelId={product.id} />
					</div>
				</div>
				<Price price={product.price} discount={product.discount} />
				<div>
					<div className='text-[13px]'>{product.brand}</div>
					<div className='text-[13px]'>{product.title}</div>
				</div>
				{select ? (
					<ProductCardSelect sizes={sizes} />
				) : (
					<ProductCardSizes open={openSize} />
				)}
			</div>
		</>
	);
};
