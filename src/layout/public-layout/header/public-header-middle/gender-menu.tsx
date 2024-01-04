import { getCookie } from '@/shared/utils/cookie';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { GenderMenuProps } from '../../../types/gender-menu';
import { AppLink } from '@/shared/ui/link';

export const GenderMenu: FC<GenderMenuProps> = ({ items }): JSX.Element => {
	const [active, setActive] = useState('');
	const router = useRouter();
	useEffect(() => {
		const currentGender = getCookie('menu-gender');

		if (currentGender) {
			setActive(currentGender);
		}
	}, [router]);

	return (
		<div>
			<ul className='flex items-center'>
				{items.map(item => (
					<li className='mr-2 last:mr-0' key={item.id}>
						<AppLink
							className={clsx('relative', {
								'after:absolute after:top-7 after:left-0 after:h-[2px] after:bg-primary-color after:w-full':
									active == item.slug,
							})}
							href={item.slug + '-home'}
						>
							{item.short_title}
						</AppLink>
					</li>
				))}
			</ul>
		</div>
	);
};
