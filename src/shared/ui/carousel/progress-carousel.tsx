import { FC, HTMLAttributes, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Icon } from '../icon';
import { Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { Button } from '../button';
import Link from 'next/link';

type Slide = {
	src: string;
	alt: string;
	link: string;
};

type CarouselProps = HTMLAttributes<HTMLDivElement> &
	SwiperOptions & {
		items: Slide[];
	};

const CarouselItem: FC<Slide> = ({ src, alt, link }) => {
	return (
		<Link href={link} className='h-[332px] block'>
			<Image
				src={src}
				alt={alt}
				width={300}
				height={300}
				className='w-full h-full block'
			/>
		</Link>
	);
};

type SwiperRef = {
	slidePrev: () => void;
	slideNext: () => void;
};

export const ProgressCarousel: FC<CarouselProps> = ({ items }): JSX.Element => {
	const swiperRef = useRef<SwiperRef>();

	const [progress, setProgress] = useState(1);

	return (
		<div className='flex flex-col'>
			<div>
				<Swiper
					modules={[Navigation]}
					onSlideChange={s => {
						if (s.activeIndex > s.previousIndex) {
							setProgress(p => p + 1);
						} else {
							setProgress(p => p - 1);
						}
					}}
					onBeforeInit={swiper => {
						swiperRef.current = swiper;
					}}
				>
					<div>
						{items.map((item, idx) => (
							<SwiperSlide key={item.link + idx}>
								<CarouselItem link={item.link} alt={item.alt} src={item.src} />
							</SwiperSlide>
						))}
					</div>
				</Swiper>
			</div>
			<div className='flex items-center ml-auto'>
				<Button variant='simple' onClick={() => swiperRef.current?.slidePrev()}>
					<Icon icon='arrow_left_outline_24' />
				</Button>
				<div className='mx-2'>
					{progress}/{items.length}
				</div>
				<Button variant='simple' onClick={() => swiperRef.current?.slideNext()}>
					<Icon icon='arrow_right_outline_24' />
				</Button>
			</div>
		</div>
	);
};
