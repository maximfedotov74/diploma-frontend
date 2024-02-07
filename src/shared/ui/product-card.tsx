import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { HoverCarousel } from '@/shared/ui/hover-carousel';
import { cn } from '../utils/cn';
import { Price } from './price';
import { TypographySmall } from './typography';
import { Icon } from './icon';

const img = [
	{
		path: '/img/1.webp',
		id: 1,
		alt: 'img1',
	},
	{
		path: '/img/2.webp',
		id: 2,
		alt: 'img1',
	},
	{
		path: '/img/33.webp',
		id: 3,
		alt: 'img1',
	},
	{
		path: '/img/4.webp',
		id: 4,
		alt: 'img1',
	},
	{
		path: '/img/5.webp',
		id: 5,
		alt: 'img1',
	},
];

export const ProductCard = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
	return (
		<Card className={cn('p-2 relative', className)}>
			<div className='absolute top-4 z-10 right-4'>
				<button>
					{/* TODO: in other component (add_wish_btn) */}
					<Icon icon='like_24' className='w-6 h-6 fill-action stroke-black' />
				</button>
			</div>
			<CardContent>
				<HoverCarousel images={img} />
			</CardContent>
			<CardFooter className=''>
				<Price price={5000} discount={25} className='my-2' />
				<div className='flex flex-col'>
					<TypographySmall className='mb-1'>Neohit</TypographySmall>
					<TypographySmall>Кардиган</TypographySmall>
				</div>
			</CardFooter>
		</Card>
	);
};
