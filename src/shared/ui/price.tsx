import { cn } from '../utils/cn';
import { parsePrice, parsePriceRUB } from '../utils/parse-price';
import { TypographySmall } from './typography';

type PriceProps = {
	price: number;
	discount?: number;
	className?: string;
	large?: boolean;
};

export const Price = ({
	discount,
	price,
	className,
	large = false,
}: PriceProps): JSX.Element => {
	let currentPrice = discount
		? Math.round(price - (price / 100) * discount)
		: price;

	return (
		<div
			className={cn('flex h-5', className, {
				'items-center': discount,
			})}
		>
			{discount ? (
				<>
					<TypographySmall
						className={cn('line-through text-[13px]', {
							'text-base': large,
						})}
					>
						{parsePrice(price)}
					</TypographySmall>
					<TypographySmall
						className={cn('text-action font-bold ml-2', {
							'text-base': large,
						})}
					>
						{parsePriceRUB(currentPrice)}
					</TypographySmall>
				</>
			) : (
				<>
					<TypographySmall
						className={cn('font-bold', {
							'text-base': large,
						})}
					>
						{parsePriceRUB(currentPrice)}
					</TypographySmall>
				</>
			)}
		</div>
	);
};
