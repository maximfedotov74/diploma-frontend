import { ModelCatalogOption } from '@/shared/api/generated';
import { useFilters } from '@/features/catalog/hooks/use-filters';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export const OptionFilter = ({
	opt,
}: {
	opt: ModelCatalogOption;
}): JSX.Element => {
	const { checked, onChecked, submitFilters } = useFilters(opt.slug, 'number');

	return (
		<div className='mr-2 mb-2' key={opt.option_id}>
			<Popover>
				<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
					<div>{opt.title}</div>
					<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
				</PopoverTrigger>
				<PopoverContent
					align='start'
					className='w-[200px] p-3 max-h-[300px] overflow-y-scroll'
				>
					{opt.values.map(v => (
						<div key={v.value_id}>
							<Checkbox
								id={v.value_id.toString()}
								checked={checked(v.value_id.toString())}
								onCheckedChange={() => onChecked(v.value_id)}
							/>
							<Label htmlFor={v.value_id.toString()} className='ml-2'>
								{v.value}
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
