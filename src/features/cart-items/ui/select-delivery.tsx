import { ModelDeliveryPoint } from '@/shared/api/generated';
import { useSearchDeliveryPoints } from '@/shared/api/queries/search-delivery-points';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Dispatch, SetStateAction, useState } from 'react';

export const SelectDelivery = ({
	setDelivery,
	point,
}: {
	setDelivery: Dispatch<SetStateAction<ModelDeliveryPoint | undefined>>;
	point: ModelDeliveryPoint | undefined;
}): JSX.Element => {
	const [withFitting, setWithFitting] = useState(false);
	const [search, setSearch] = useState('');
	const { debounced } = useDebounce(search, 500);
	const [open, setOpen] = useState(false);
	const { data } = useSearchDeliveryPoints(withFitting, debounced);

	const onChange = (v: boolean) => {
		setWithFitting(v);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>
					{point ? point.address : 'Выбрать пункт выдачи'}
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-7xl h-full block'>
				<DialogHeader className='mb-8'>
					<DialogTitle className='text-2xl'>Пункты выдачи</DialogTitle>
				</DialogHeader>
				<div className='flex items-center mb-5'>
					<Input
						placeholder='Поиск пункта'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='grow mr-4'
					/>

					<div className='flex items-center'>
						<Checkbox
							id='with-fitting-checkbox'
							checked={withFitting}
							onCheckedChange={onChange}
						/>
						<Label htmlFor='with-fitting-checkbox' className='ml-2'>
							С примеркой
						</Label>
					</div>
				</div>
				<div>
					{data?.map(p => (
						<div key={p.delivery_point_id} className='mb-5 last:mb-0'>
							<div className='mb-1'>{p.city}</div>
							<div className='mb-1'>{p.address}</div>
							<div className='mb-1'>{p.work_schedule}</div>
							<div className='mb-2'>
								{p.with_fitting ? 'С примеркой' : 'Без примерки'}
							</div>
							<Button
								variant='default'
								size='sm'
								onClick={() => {
									setDelivery(p);
									setOpen(false);
								}}
							>
								Выбрать пункт
							</Button>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
