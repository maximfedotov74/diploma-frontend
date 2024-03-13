import { ModelCatalogSize } from '@/shared/api/generated';
import { useFilters } from '@/features/catalog/hooks/use-filters';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export const SizeFilters = ({
	sizes,
}: {
	sizes: ModelCatalogSize[];
}): JSX.Element => {
	const { checked, onChecked, submitFilters } = useFilters('size', 'string');

	return (
		<div className='mr-2'>
			<Popover>
				<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
					<div>Размеры</div>
					<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[200px] p-3 max-h-[300px] overflow-y-scroll'
				>
					{sizes.map(s => (
						<div key={s.size_id}>
							<Checkbox
								id={s.size_id.toString()}
								checked={checked(s.value)}
								onCheckedChange={() => onChecked(s.value)}
							/>
							<Label htmlFor={s.size_id.toString()} className='ml-2'>
								{s.value}
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
