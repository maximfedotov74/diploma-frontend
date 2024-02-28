import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { ModelAdminProduct } from '@/shared/api/generated';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { EditProductForm } from './edit-product-form';
import { ModelsList } from './models-list';
import { AddModelProduct } from './add-model-product';
import { Icon } from '@/shared/ui/icon';

export const EditProduct = ({
	product,
}: {
	product: ModelAdminProduct;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-2'>
					<Icon icon='more' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle className='text-left text-lg sm:text-xl pr-10'>
						Редактирование товара (ID:{product.id})
					</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue='product'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='product'>Товар</TabsTrigger>
						<TabsTrigger value='models'>Модели</TabsTrigger>
					</TabsList>
					<TabsContent value='product'>
						<EditProductForm product={product} />
					</TabsContent>
					<TabsContent value='models'>
						<AddModelProduct product={product} />
						<ModelsList id={product.id} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
