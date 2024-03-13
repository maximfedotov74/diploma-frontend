import {
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	Carousel,
} from '@/shared/ui/carousel';
import Image from 'next/image';

export const ImagesCarouselMobile = ({
	images,
}: {
	images: string[];
}): JSX.Element => {
	return (
		<Carousel className='w-full max-w-2xl'>
			<CarouselContent>
				{images.map(img => (
					<CarouselItem key={img}>
						<div className='p-1'>
							<Image
								className='w-full md:h-[620px]'
								alt='Изображение модели'
								src={img}
								width={700}
								height={700}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className=''>
				<CarouselPrevious className='-left-0' />
				<CarouselNext className='-right-0' />
			</div>
		</Carousel>
	);
};
