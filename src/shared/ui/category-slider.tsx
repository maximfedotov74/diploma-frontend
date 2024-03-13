import Image from 'next/image';
import { ModelCategoryModel } from '../api/generated';
import { Carousel, CarouselContent, CarouselItem } from './carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from './link';
import { CATALOG_ROUTE } from '../constants/routes/public';

export const CategorySlider = ({
	lastLevelCategories,
}: {
	lastLevelCategories: ModelCategoryModel[];
}): JSX.Element => {
	return (
		<Carousel
			opts={{ dragFree: true, breakpoints: {} }}
			plugins={[Autoplay({ delay: 1000 })]}
		>
			<CarouselContent>
				{lastLevelCategories.map(item => (
					<CarouselItem key={item.category_id} className='basis-24'>
						<Link
							href={`${CATALOG_ROUTE}/${item.slug}`}
							variant='menu'
							className='flex flex-col items-center justify-center'
						>
							<Image
								className='rounded-full block w-full h-20 mb-1'
								src={item.img_path ?? '/img/category-default.jpg'}
								alt={item.title}
								width={80}
								height={80}
							/>
							<div className='text-center text-xs'>{item.short_title}</div>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};
