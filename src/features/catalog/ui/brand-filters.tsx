import { ModelCatalogBrand } from '@/shared/api/generated';
import { useFilters } from '@/shared/hooks/use-filters';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export const BrandFilters = ({
	brands,
}: {
	brands: ModelCatalogBrand[];
}): JSX.Element => {
	const { checked, onChecked, submitFilters } = useFilters('brands');

	return (
		<div className='mr-2 mb-2'>
			<Popover>
				<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
					<div>Бренды</div>
					<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[200px] p-3 max-h-[300px] overflow-y-scroll'
				>
					{brands.map(b => (
						<div key={b.brand_id}>
							<Checkbox
								checked={checked(b.brand_id.toString())}
								id={b.brand_id.toString()}
								onCheckedChange={() => onChecked(b.brand_id)}
							/>
							<Label htmlFor={b.brand_id.toString()} className='ml-2'>
								{b.brand_title}
							</Label>
						</div>
					))}
					<Button onClick={submitFilters} className='mt-2'>
						Применить
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
};
