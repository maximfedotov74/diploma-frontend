import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { useCatalogDiscount } from '../hooks/use-discount-filter';

export const DiscountFilter = (): JSX.Element => {
	const { changeCheked, submitFilters, withDiscount } = useCatalogDiscount();

	return (
		<div className='mr-2 mb-2'>
			<Popover>
				<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
					<div>Только со скидкой</div>
					<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[200px] p-3 max-h-[300px] overflow-y-scroll'
				>
					<div className='flex items-center'>
						<Checkbox
							checked={withDiscount}
							id='only-with-discount-checkbox'
							onCheckedChange={changeCheked}
						/>
						<Label htmlFor='only-with-discount-checkbox' className='ml-2'>
							Только со скидкой
						</Label>
					</div>

					<Button onClick={submitFilters} className='mt-2'>
						Применить
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
};
