import { Icon } from '@/shared/ui/icon';
import { useCatalogSort } from '../hooks/use-catalog-sort';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { catalogSortTranslate } from '@/shared/translation';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Label } from '@/shared/ui/label';
import { CatalogSort } from '@/shared/types/catalog';

export const SortFilter = (): JSX.Element => {
	const { onChange, sort, submitFilters } = useCatalogSort();
	return (
		<div className='mr-2 mb-2'>
			<Popover>
				<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
					<div>{catalogSortTranslate[sort]}</div>
					<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[240px] p-3 max-h-[300px] overflow-y-scroll'
				>
					<RadioGroup value={sort} onValueChange={onChange}>
						{Object.keys(catalogSortTranslate).map(k => (
							<div key={k}>
								<RadioGroupItem value={k} id={k} />
								<Label htmlFor={k} className='ml-2'>
									{catalogSortTranslate[k as CatalogSort]}
								</Label>
							</div>
						))}
					</RadioGroup>

					<Button onClick={submitFilters} className='mt-2'>
						Применить
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
};
