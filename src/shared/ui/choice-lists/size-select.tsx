import { Listbox, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, forwardRef } from 'react';
import { Icon } from '../icon';

type SizeSelect = {
	size_model_id: number;
	size_id: number;
	literal: string;
	model_id: number;
	size_value: string;
	in_stock: number;
};

export const SizeSelect = forwardRef<
	HTMLDivElement,
	{
		sizes: SizeSelect[];
		value: SizeSelect;
		onChange: Dispatch<SetStateAction<SizeSelect>>;
		className?: string;
	}
>(({ sizes, value, onChange, className }, ref): JSX.Element => {
	return (
		<div className={className}>
			<Listbox defaultValue={value} ref={ref} onChange={onChange}>
				<div className='relative mt-1'>
					<Listbox.Button className='relative w-full cursor-default border border-light-gray-color rounded-md bg-secondary-color py-2 pl-3 pr-10 text-left shadow-md sm:text-sm'>
						<span className='block truncate'>
							{value.literal + ' | ' + value.size_value}
						</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<Icon className='h-5 w-5' icon='chevron_down_small_24' />
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-secondary-color py-1 text-base shadow-lg ring-1 ring-primary-color focus:outline-none sm:text-sm'>
							{sizes.map(size => (
								<Listbox.Option
									key={size.size_model_id}
									className={({ active }) => {
										return `relative cursor-default select-none py-1 pl-10 pr-4 ${
											active
												? 'bg-light-gray-color text-secondary-color'
												: 'text-primary-color'
										}`;
									}}
									value={size}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate text-xs ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{size.literal + ' | ' + size.size_value}
											</span>
											{selected ? (
												<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
													<Icon
														icon='selected_24'
														className='h-4 w-4 text-primary-color'
														aria-hidden='true'
													/>
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
});
SizeSelect.displayName = 'SizeSelect';
