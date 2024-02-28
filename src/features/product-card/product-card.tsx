import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { HoverCarousel } from '@/shared/ui/hover-carousel';
import { cn } from '../../shared/utils/cn';
import { Price } from '../../shared/ui/price';
import { TypographySmall } from '../../shared/ui/typography';
import { ToggleToWishlist } from '@/features/toggle-to-wishlist/toggle-to-wishlist';
import { ModelCatalogProductModel } from '../../shared/api/generated';
import { Link } from '../../shared/ui/link';
import { PRODUCT_ROUTE } from '../../shared/constants/routes/public';
import { SizeSelectToCart } from '@/features/size-select-to-basket/ui/size-select-to-cart';

export const ProductCard = ({
	className,
	card,
	withSelectSize = false,
}: {
	className?: string;
	card: ModelCatalogProductModel;
	withSelectSize?: boolean;
}): JSX.Element => {
	const images = [
		card.model_main_image_path,
		...card.images.slice(0, 3).map(img => img.img_path),
	];

	const sizes = card.sizes.map(s => s.size_value).join(' ');

	return (
		<Card className={cn('p-2 relative', className)}>
			<div className='absolute top-4 z-[1] right-4'>
				<ToggleToWishlist modelId={card.model_id} />
			</div>
			<CardContent>
				<Link href={`${PRODUCT_ROUTE}/${card.product_slug}`}>
					<HoverCarousel images={images} />
				</Link>
			</CardContent>
			<CardFooter>
				<Price
					price={card.model_price}
					discount={card.model_discount}
					className='my-2'
				/>
				<div className='flex flex-col'>
					<TypographySmall className='mb-1'>{card.brand.title}</TypographySmall>
					<TypographySmall>{card.category.short_title}</TypographySmall>
				</div>
				{withSelectSize ? (
					<SizeSelectToCart sizes={card.sizes || []} className='mt-2' />
				) : (
					<TypographySmall>{sizes}</TypographySmall>
				)}
			</CardFooter>
		</Card>
	);
};
