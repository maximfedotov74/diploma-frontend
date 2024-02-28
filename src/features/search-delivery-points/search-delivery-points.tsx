import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const SearchDeliveryPoints = ({
	withFitting,
	searchText,
}: {
	withFitting: boolean;
	searchText: string;
}): JSX.Element => {
	const router = useRouter();

	const [checked, setChecked] = useState(withFitting);
	const [search, setSearch] = useState(searchText);

	useEffect(() => {
		setChecked(withFitting);
	}, [withFitting]);

	useEffect(() => {
		setSearch(searchText);
	}, [searchText]);

	const changeChecked = (value: boolean) => {
		setChecked(value);
	};

	const submitChanges = () => {
		router.push(
			{
				pathname: router.pathname,
				query: { withFitting: checked, searchText: search },
			},
			undefined,
			{ shallow: true }
		);
	};

	return (
		<div className='mb-5'>
			<div className='mb-2'>
				<Input
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Поиск пунктов выдачи...'
					rightSection={<Icon icon='search_outline_24' className='w-5 h-5' />}
				/>
			</div>
			<div className='flex justify-between'>
				<div className='flex items-center'>
					<Checkbox
						id='with-fitting-checkbox'
						checked={checked}
						onCheckedChange={changeChecked}
					/>
					<Label htmlFor='with-fitting-checkbox' className='ml-2'>
						С примеркой
					</Label>
				</div>
				<Button onClick={submitChanges}>Применить</Button>
			</div>
		</div>
	);
};
