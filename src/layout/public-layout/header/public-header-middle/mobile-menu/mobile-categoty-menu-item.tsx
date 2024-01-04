import { CategoriesMenu } from '@/layout/types/categories-menu';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useState } from 'react';

export const MobileCategotyMenuItem: FC<{ item: CategoriesMenu }> = ({
	item,
}): JSX.Element => {
	const [opened, setOpened] = useState<boolean>(false);
	return (
		<li className='px-3 mb-3 last:mb-0'>
			<Button
				variant='simple'
				className='flex items-center'
				onClick={() => setOpened(opened => !opened)}
			>
				<span>{item.title}</span>
				<Icon
					icon='chevron_down_small_24'
					className={clsx('h-6 w-6 transition-transform', {
						'rotate-180': opened,
					})}
				/>
			</Button>
			<Transition
				show={opened}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<ul className='pl-10 mt-2'>
					<li className='mb-2 last:mb-0'>
						<Link href='/'>Все товары</Link>
					</li>
					{item.sub.map(item => (
						<li key={item.id} className='mb-2 last:mb-0'>
							<Link href='/'>{item.title}</Link>
						</li>
					))}
				</ul>
			</Transition>
		</li>
	);
};
