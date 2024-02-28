import Image from 'next/image';
import { useState } from 'react';
import { cn } from '../utils/cn';

export const HoverCarousel = ({
	images,
}: {
	images: string[];
}): JSX.Element => {
	const [active, setActive] = useState(0);
	return (
		<div className='flex flex-col relative' onMouseLeave={() => setActive(0)}>
			<div className='h-1 absolute top-0 left-0 w-full items-center hidden md:flex'>
				{images.slice(0, 4).map((img, idx) => (
					<div
						className={cn('flex-grow mr-1 last:mr-0 bg-gray-300 h-1', {
							'bg-black dark:bg-yellow-500': idx === active,
						})}
						key={img}
					></div>
				))}
			</div>
			<div>
				<div className='flex-grow'>
					<Image
						width={250}
						height={250}
						className='w-full block'
						src={images[active]}
						alt='Изображение модели'
					/>
				</div>
			</div>
			<div className='absolute top-0 left-0 ring-0 bottom-0 hidden md:flex w-full'>
				{images.slice(0, 4).map((img, idx) => (
					<div
						onMouseEnter={() => setActive(idx)}
						className='flex-grow'
						key={img}
					></div>
				))}
			</div>
		</div>
	);
};
