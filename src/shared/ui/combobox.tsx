import { useMemo, useState } from 'react';
import { cn } from '../utils/cn';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Icon } from './icon';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './command';
import { ErrorText } from './error-text';

type ComboboxItem = {
	id: number;
	title: string;
};

export const Combobox = ({
	items,
	value,
	placeholder,
	setValue,
	error,
	className,
}: {
	placeholder: string;
	items: ComboboxItem[];
	value?: string;
	setValue: (value: string) => void;
	error?: string;
	className?: string;
}) => {
	const [open, setOpen] = useState(false);

	const [filter, setFilter] = useState<string>('');

	const filteredItems = useMemo(
		() =>
			items.filter(b => b.title.toLowerCase().includes(filter.toLowerCase())),
		[filter, items]
	);

	const renderPlaceholder = () => {
		if (value) {
			const b = items.find(item => item.id.toString() === value);
			if (b) {
				return b.title;
			}
			return placeholder;
		}
		return placeholder;
	};

	return (
		<div className={cn('flex flex-col', className)}>
			<Popover open={open} onOpenChange={setOpen} modal>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						className='w-[200px] justify-between'
					>
						{renderPlaceholder()}
						<Icon
							icon='chevron_down_small_24'
							className='ml-2 h-4 w-4 shrink-0 opacity-50'
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-[200px] max-h-[200px] p-0 overflow-y-scroll'
					side='bottom'
					align='start'
					avoidCollisions={false}
				>
					<Command shouldFilter={false}>
						<CommandInput
							placeholder={placeholder}
							onValueChange={s => setFilter(s)}
						/>
						<CommandList>
							<CommandEmpty>Не найдено</CommandEmpty>
							<CommandGroup>
								{filteredItems.map(item => (
									<CommandItem
										key={item.id}
										value={item.id.toString()}
										onSelect={currentValue => {
											setValue(currentValue === value ? '' : currentValue);
											setFilter('');
											setOpen(false);
										}}
									>
										<Icon
											icon='done_outline_24'
											className={cn(
												'mr-2 h-4 w-4',
												value === item.id.toString()
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
										{item.title}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<ErrorText error={error} />
		</div>
	);
};
