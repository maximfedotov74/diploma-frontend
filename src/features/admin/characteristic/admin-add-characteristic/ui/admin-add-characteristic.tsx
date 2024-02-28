import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AdminAddCharacteristicForm } from './admin-add-characteristic-form';

export const AdminAddCharacteristic = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4'>
					Добавить характеристику
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Создание характеристики</DialogTitle>
				</DialogHeader>
				<AdminAddCharacteristicForm />
			</DialogContent>
		</Dialog>
	);
};
