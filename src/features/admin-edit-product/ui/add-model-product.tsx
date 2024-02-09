import { ModelAdminProduct } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AddModelProductForm } from './add-model-product-form';

export const AddModelProduct = ({
	product,
}: {
	product: ModelAdminProduct;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4 break-words'>
					Добавить модель товару (ID:{product.id})
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание модели</DialogTitle>
				</DialogHeader>
				<AddModelProductForm product={product} />
			</DialogContent>
		</Dialog>
	);
};
