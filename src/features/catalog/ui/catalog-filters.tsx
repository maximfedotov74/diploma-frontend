import { ModelCatalogFilters } from '@/shared/api/generated';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Slider } from '@/shared/ui/slider';
import { cn } from '@/shared/utils/cn';
export const CatalogFilters = ({
	catalogFilters,
	className,
}: {
	catalogFilters: ModelCatalogFilters;
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn('flex flex-wrap', className)}>
			<div className='mr-2'>
				<Popover>
					<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
						<div>Бренды</div>
						<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
					</PopoverTrigger>
					<PopoverContent
						align='start'
						className='w-[200px] p-3 max-h-[300px] overflow-y-scroll'
					>
						{catalogFilters.brands.map(b => (
							<div key={b.brand_id}>
								<Checkbox id={b.brand_id.toString()} />
								<Label htmlFor={b.brand_id.toString()} className='ml-2'>
									{b.brand_title}
								</Label>
							</div>
						))}
					</PopoverContent>
				</Popover>
			</div>
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
						{catalogFilters.sizes.map(s => (
							<div key={s.size_id}>
								<Checkbox id={s.size_id.toString()} />
								<Label htmlFor={s.size_id.toString()} className='ml-2'>
									{s.value}
								</Label>
							</div>
						))}
					</PopoverContent>
				</Popover>
			</div>
			{catalogFilters.options.map(opt => (
				<div className='mr-2' key={opt.option_id}>
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
									<Checkbox id={v.value_id.toString()} />
									<Label htmlFor={v.value_id.toString()} className='ml-2'>
										{v.value}
									</Label>
								</div>
							))}
						</PopoverContent>
					</Popover>
				</div>
			))}
			<div>
				<Popover>
					<PopoverTrigger className='border border-foreground/60 py-2 px-3 rounded-sm flex items-center'>
						<div>Цена</div>
						<Icon icon='chevron_down_small_24' className='w-5 h-5 ml-2' />
					</PopoverTrigger>
					<PopoverContent
						align='start'
						className='w-[240px] p-3 max-h-[300px] overflow-y-scroll'
					>
						<Slider
							onValueChange={v => console.log(v)}
							min={catalogFilters.price.min_price}
							max={catalogFilters.price.max_price}
							className='mb-4'
						/>
						<div className='flex'>
							<div className='mr-3'>
								<div className='mb-1'>Мин. цена</div>
								<Input
									type='number'
									placeholder={catalogFilters.price.min_price.toString()}
								/>
							</div>
							<div>
								<div className='mb-1'>Макс. цена</div>
								<Input
									type='number'
									placeholder={catalogFilters.price.max_price.toString()}
								/>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};
