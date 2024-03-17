import { useGetWishlistApi } from '@/shared/api/queries/get-wishlist';
import { TypographyH1 } from '@/shared/ui/typography';
import { ProductCard } from '../product-card/product-card';

export const WishlistView = (): JSX.Element => {
	const { data: wish } = useGetWishlistApi();

	return (
		<>
			<TypographyH1 className='mb-5 font-normal'>Избранное</TypographyH1>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-3'>
				{wish?.map(w => (
					<ProductCard key={w.model_id} card={w} withSelectSize />
				))}
			</div>
		</>
	);
};
