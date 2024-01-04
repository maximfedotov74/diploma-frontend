import { UseClickOutsideBlocking } from '@/shared/hooks/use-click-outside-blocking';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { SearchInput } from '@/shared/ui/form-elements/search-input';
import { Transition } from '@headlessui/react';
import { FC, Fragment, MouseEvent, useEffect, useRef, useState } from 'react';

export const MobileSearch: FC = (): JSX.Element => {
	const { areaRef, buttonRef, isOpened, setOpen } = UseClickOutsideBlocking<
		HTMLButtonElement,
		HTMLDivElement
	>(false);

	return (
		<div>
			<div>
				<button ref={buttonRef} onClick={() => setOpen(p => !p)}>
					<Icon icon='search_outline_24' className='w-6 h-6 md:h-8 md:w-8' />
				</button>
			</div>

			<Transition
				show={isOpened}
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<div
					ref={areaRef}
					className='absolute h-16 p-2 top-20 -left-4 w-[100vw] bg-secondary-color shadow-xl z-[2]'
				>
					<div className='flex items-center h-full'>
						<SearchInput
							variant='withoutBorder'
							placeholder='Товар, бренд или цвет'
							className='flex-grow h-full mr-1'
						/>
						<Button className='w-16 h-full'>Найти</Button>
					</div>
				</div>
			</Transition>
		</div>
	);
};
