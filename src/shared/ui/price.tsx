import { cn } from '../utils/cn';
import { parsePrice, parsePriceRUB } from '../utils/parse-price';
import { TypographySmall } from './typography';

type PriceProps = {
	price: number;
	discount?: number;
	className?: string;
};

export const Price = ({
	discount,
	price,
	className,
}: PriceProps): JSX.Element => {
	let currentPrice = discount
		? Math.round(price - (price / 100) * discount)
		: price;

	return (
		<div className={cn('flex items-center', className)}>
			{discount ? (
				<>
					<TypographySmall className='line-through text-[13px]'>
						{parsePrice(price)}
					</TypographySmall>
					<TypographySmall className='text-action font-bold ml-2'>
						{parsePriceRUB(currentPrice)}
					</TypographySmall>
				</>
			) : (
				<>
					<TypographySmall className='font-bold'>
						{parsePriceRUB(currentPrice)}
					</TypographySmall>
				</>
			)}
		</div>
	);
};
