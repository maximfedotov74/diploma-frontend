import { useEffect, useState } from 'react';
import { ModelAction } from '../api/generated';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './carousel';
import Image from 'next/image';
import { Link } from './link';
import Autoplay from 'embla-carousel-autoplay';

export const ActionSlider = ({
	actions,
}: {
	actions: ModelAction[];
}): JSX.Element => {
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);
	return (
		<>
			<Carousel
				setApi={setApi}
				className='flex flex-col'
				plugins={[Autoplay({ delay: 3000 })]}
			>
				<CarouselContent>
					{actions.map(a => (
						<CarouselItem
							key={a.id}
							className='w-full  xs:h-[362px] sm:h-[462px] lg:h-[562px]'
						>
							<Link href='/' variant='menu' className='block h-full w-full'>
								<Image
									className='w-full h-full rounded-md'
									alt={a.title}
									src={a.img_path ?? '/img/action-default.png'}
									width={700}
									height={562}
								/>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className='mt-2 flex'>
					<div className='text-xl'>{actions[current].title}</div>
					<div className='ml-auto hidden sm:flex items-center'>
						<CarouselPrevious className='static -translate-y-0' />
						<div className='mx-2'>
							{current + 1} / {count}
						</div>
						<CarouselNext className='static -translate-y-0' />
					</div>
				</div>
			</Carousel>
		</>
	);
};
