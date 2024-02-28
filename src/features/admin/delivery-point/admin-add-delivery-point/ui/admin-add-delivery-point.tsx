import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AddDeliveryPointForm } from './admin-add-delivery-point-form';

export const AddDeliverypoint = (): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4'>
					Добавить пункт выдачи
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Создание пункта выдачи</DialogTitle>
				</DialogHeader>
				<AddDeliveryPointForm />
			</DialogContent>
		</Dialog>
	);
};
