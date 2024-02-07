import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AddProductForm } from './add-product-form';

export const AddProduct = (): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4'>
					Добавить новый
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Создание нового товара</DialogTitle>
				</DialogHeader>
				<AddProductForm />
			</DialogContent>
		</Dialog>
	);
};
