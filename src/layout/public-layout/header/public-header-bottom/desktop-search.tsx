import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { SearchInput } from '@/shared/ui/form-elements/search-input';
import { FC, useState } from 'react';

export const DesktopSearch: FC = (): JSX.Element => {
	const [t, sett] = useState('');
	return (
		<div className='flex items-center'>
			<SearchInput
				variant='withBorder'
				value={t}
				onChange={e => sett(e.target.value)}
				placeholder='Поиск'
				className='mr-2 h-8 w-[230px]'
			/>
			<Button className='w-10 h-8'>
				<Icon icon='search_outline_24' className='w-5 h-5' />
			</Button>
		</div>
	);
};
