import { CarouselApi } from '@/shared/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui/carousel';
import { cn } from '@/shared/utils/cn';

export const ImagesCarousel = ({
	images,
}: {
	images: string[];
}): JSX.Element => {
	const [opened, setOpened] = useState(false);
	const [active, setActive] = useState(0);
	const [mainApi, setMainApi] = useState<CarouselApi>();
	const [thubmsApi, setThumbsApi] = useState<CarouselApi>();

	const changeSlide = useCallback(
		(index: number) => {
			if (!mainApi || !thubmsApi) return;
			mainApi.scrollTo(index);
		},
		[mainApi, thubmsApi]
	);

	const onImageClick = (idx: number) => {
		setOpened(true);
		setActive(idx);
	};

	useEffect(() => {
		if (opened) {
			changeSlide(active);
		}
	}, [opened, active, changeSlide]);

	const onSelect = useCallback(() => {
		if (!mainApi || !thubmsApi) return;
		setActive(mainApi.selectedScrollSnap());
		thubmsApi.scrollTo(mainApi.selectedScrollSnap());
	}, [mainApi, thubmsApi, setActive]);

	useEffect(() => {
		if (!mainApi) {
			return;
		}
		onSelect();
		mainApi.on('select', onSelect);
		mainApi.on('reInit', onSelect);
	}, [mainApi, onSelect]);

	return (
		<>
			<div className='grid grid-cols-2 gap-x-6 gap-y-3'>
				{images.map((img, idx) => (
					<Image
						onClick={() => onImageClick(idx)}
						className='h-[540px] cursor-zoom-in'
						key={img}
						alt='Изображение модели'
						src={img}
						width={700}
						height={700}
					/>
				))}
			</div>
			<Dialog open={opened} onOpenChange={setOpened}>
				<DialogTrigger className='hidden'>
					Открыть модальное окно изображений
				</DialogTrigger>
				<DialogContent className='max-w-[100vw] h-screen'>
					<div className='flex relative justify-center'>
						<Carousel
							className='flex flex-col absolute top-2 left-0'
							setApi={setThumbsApi}
							orientation='vertical'
						>
							<CarouselContent>
								{images.map((img, idx) => (
									<CarouselItem key={img}>
										<div onClick={() => changeSlide(idx)}>
											<Image
												className={cn('h-[110px] w-20', {
													'border border-primary': active === idx,
												})}
												alt='Изображение модели'
												src={img}
												width={700}
												height={700}
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
						<Carousel className='w-full max-w-2xl group' setApi={setMainApi}>
							<CarouselContent>
								{images.map(img => (
									<CarouselItem key={img}>
										<div className='p-1'>
											<Image
												className='h-screen w-full'
												alt='Изображение модели'
												src={img}
												width={700}
												height={700}
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<div className='opacity-0 transition-opacity ease-in-out delay-300 group-hover:opacity-100'>
								<CarouselPrevious className='-left-0' />
								<CarouselNext className='-right-0' />
							</div>
						</Carousel>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
