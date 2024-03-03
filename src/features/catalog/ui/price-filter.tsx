import { ModelCatalogPrice } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const PriceFilter = ({
	price,
}: {
	price: ModelCatalogPrice;
}): JSX.Element => {
	const [min, setMin] = useState<number>(price.min_price);
	const [max, setMax] = useState<number>(price.max_price);

	const router = useRouter();

	const onMinChange = useCallback(
		(val: number) => {
			if (val < 0 || isNaN(val)) {
				setMin(price.min_price);
				return;
			}
			setMin(val);
		},
		[price.min_price]
	);

	const onMaxChange = useCallback(
		(val: number) => {
			if (val > price.max_price || val < 0 || isNaN(val)) {
				setMax(price.max_price);
				return;
			}
			setMax(val);
		},
		[price.max_price]
	);

	useEffect(() => {
		const priceQuery = router.query.price as string;

		if (priceQuery) {
			const items = priceQuery.split(',');
			let minValue = Number(items[0]);
			let maxValue = Number(items[1]);
			if (isNaN(maxValue) || isNaN(minValue)) {
				return;
			}
			onMaxChange(maxValue);
			onMinChange(minValue);
		}
	}, [router, onMaxChange, onMinChange]);

	const categorySlug = router.query.categorySlug as string;

	const submitFilters = () => {
		const queryValue = `${min},${max}`;

		const newQuery = { ...router.query };

		if (queryValue === '') {
			delete newQuery.price;
		} else {
			newQuery.price = queryValue;
		}
		delete newQuery.categorySlug;

		router.push(
			{
				pathname: router.pathname.replace('[categorySlug]', categorySlug),
				query: newQuery,
			},
			undefined,
			{ scroll: false }
		);
	};

	return (
		<div className='mr-2 mb-2'>
			<Popover>
				<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
					<div>Цена</div>
					<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[240px] p-3 max-h-[300px] overflow-y-scroll'
				>
					<div className='flex mb-2'>
						<div className='mr-2'>
							<div className='mb-1'>Мин. цена</div>
							<Input
								type='number'
								placeholder={price.min_price.toString()}
								value={min === 0 ? '' : min}
								onChange={e => onMinChange(+e.target.value)}
							/>
						</div>
						<div>
							<div className='mb-1'>Макс. цена</div>
							<Input
								type='number'
								value={max === 0 ? '' : max}
								onChange={e => onMaxChange(+e.target.value)}
								placeholder={price.max_price.toString()}
							/>
						</div>
					</div>
					<Button onClick={submitFilters}>применить</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
};
