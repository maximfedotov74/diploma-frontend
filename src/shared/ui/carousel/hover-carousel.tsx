import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

type HoverCarouselProps = {
	images: { id: number; path: string; alt: string }[];
};

export const HoverCarousel = ({ images }: HoverCarouselProps): JSX.Element => {
	const [active, setActive] = useState(0);
	return (
		<div className='flex flex-col relative' onMouseLeave={() => setActive(0)}>
			<div className='h-1 absolute top-0 left-0 w-full items-center hidden md:flex'>
				{images.map((img, idx) => (
					<div
						className={clsx(
							'flex-grow mr-1 last:mr-0 bg-light-gray-color h-1',
							{
								'bg-primary-color': idx === active,
							}
						)}
						key={img.id}
					></div>
				))}
			</div>
			<div>
				<div className='flex-grow'>
					<Image
						width={250}
						height={250}
						className='w-full block'
						src={images[active].path}
						alt={images[active].alt}
					/>
				</div>
			</div>
			<div className='absolute top-0 left-0 ring-0 bottom-0  hidden md:flex w-full'>
				{images.map((img, idx) => (
					<div
						onMouseEnter={() => setActive(idx)}
						className='flex-grow'
						key={img.id}
					></div>
				))}
			</div>
		</div>
	);
};
