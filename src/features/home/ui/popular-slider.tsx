import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui/carousel';
import { ProductCard } from '@/features/product-card/product-card';
import { TypographyH3 } from '@/shared/ui/typography';
import { useGetPopularModels } from '@/shared/api/queries/get-popular-models';

export const PopularSlider = ({
	genderSlug,
}: {
	genderSlug: string;
}): JSX.Element => {
	const { data } = useGetPopularModels(genderSlug);

	return (
		<div className='mb-8'>
			<TypographyH3 className='mb-5'>Популярное</TypographyH3>
			{data && data.length > 0 ? (
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
			) : (
				<div className='text-xl'>Ничего не найдено!</div>
			)}
		</div>
	);
};
