import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui/carousel';
import { ProductCard } from '@/features/product-card/product-card';
import { TypographyH3 } from '@/shared/ui/typography';
import { useGetViewHistory } from '../api/get-view-history';
import { useAddToHistory } from '../api/add-to-view-history';
import { useEffect } from 'react';

export const ViewHistory = ({ modelId }: { modelId: number }): JSX.Element => {
	const { data } = useGetViewHistory(modelId);
	const addToHistory = useAddToHistory();

	useEffect(() => {
		addToHistory(modelId);
	}, [modelId, addToHistory]);

	return (
		<>
			{data?.length && (
				<div className='mb-8'>
					<TypographyH3 className='mb-5'>История просмотров</TypographyH3>
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
			)}
		</>
	);
};
