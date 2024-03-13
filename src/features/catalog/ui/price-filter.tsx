import { ModelCatalogPrice } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useCatalogPriceFilter } from '../hooks/use-price-filter';

export const PriceFilter = ({
	price,
}: {
	price: ModelCatalogPrice;
}): JSX.Element => {
	const { max, min, onMaxChange, onMinChange, submitFilters } =
		useCatalogPriceFilter(price);

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
