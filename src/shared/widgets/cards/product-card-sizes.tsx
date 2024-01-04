import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Transition } from '@headlessui/react';

export const ProductCardSizes = ({ open }: { open: boolean }): JSX.Element => {
	return (
		<Transition
			show={open}
			enter='transition-opacity duration-150'
			enterFrom='opacity-0'
			enterTo='opacity-100'
			leave='transition-opacity duration-150'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'
		>
			<div className='text-[13px] pr-4 pb-1 z-[1] flex flex-col absolute -bottom-16 left-0 bg-secondary-color transition-shadow  shadow-2xl'>
				<span className='p-1'> Размеры (RUS): 44 46 48 50 52 54 56 58</span>
				<Button variant='simple'>
					<Icon icon='more_info' className='w-5 h-5' />
					<span className='text-sm ml-1'>Подробнее</span>
				</Button>
			</div>
		</Transition>
	);
};
