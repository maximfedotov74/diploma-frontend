import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AddBrandForm } from './add-brand-form';

export const AddBrand = (): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4'>
					Добавить бренд
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Создание бренда</DialogTitle>
				</DialogHeader>
				<AddBrandForm />
			</DialogContent>
		</Dialog>
	);
};
