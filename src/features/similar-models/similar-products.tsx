import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui/carousel';
import { useGetSimilarProducts } from './get-similar-products';
import { ProductCard } from '@/features/product-card/product-card';
import { TypographyH3 } from '@/shared/ui/typography';

export const SimilarProducts = ({
	brandId,
	categoryId,
	modelId,
}: {
	modelId: number;
	categoryId: number;
	brandId: number;
}): JSX.Element => {
	const { data } = useGetSimilarProducts(modelId, categoryId, brandId);

	return (
		<div className='mb-8'>
			<TypographyH3 className='mb-5'>Похожие</TypographyH3>
			<Carousel opts={{ dragFree: true }}>
				<CarouselContent>
					{data?.map(item => (
						<CarouselItem key={item.model_id} className='basis-[180px]'>
							<ProductCard
								key={item.model_id}
								card={item}
								withHover={false}
								withWish={false}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className='-left-0' />
				<CarouselNext className='-right-0' />
			</Carousel>
		</div>
	);
};
