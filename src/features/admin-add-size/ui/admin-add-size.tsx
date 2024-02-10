import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AdminAddSizeForm } from './admin-add-size-form';

export const AdminAddSize = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4'>
					Добавить размер
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Создание размера</DialogTitle>
				</DialogHeader>
				<AdminAddSizeForm />
			</DialogContent>
		</Dialog>
	);
};
