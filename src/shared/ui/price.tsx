import { parsePrice } from '../utils/parse-price';

type PriceProps = {
	price: number;
	discount?: number;
};

export const Price = ({ discount, price }: PriceProps): JSX.Element => {
	let currentPrice = discount
		? Math.round(price - (price / 100) * discount)
		: price;

	return (
		<div className='flex items-center'>
			{discount ? (
				<>
					<span className='line-through text-[13px] text-primary-color'>
						{price}
					</span>
					<span className='text-action-color font-bold ml-[6px]'>
						{parsePrice(currentPrice)}
					</span>
				</>
			) : (
				<>
					<span className='text-primary-color font-bold'>
						{parsePrice(currentPrice)}
					</span>
				</>
			)}
		</div>
	);
};
