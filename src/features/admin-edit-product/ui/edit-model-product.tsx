import { ModelAdminProductModelRelation } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { EditModelProductForm } from './edit-model-product-form';
import { Separator } from '@/shared/ui/separator';
import { AddModelProductImg } from './add-product-model-img-form';
import { ModelImgList } from './model-img-list';
import { ModelSizeList } from './model-size-list';
import { AddModelProductSize } from './add-product-model-size-form';
import { AddProductModelOptionForm } from './add-product-model-option-form';
import { ModelOptions } from './model-options';
import { cn } from '@/shared/utils/cn';

export const EditModelProduct = ({
	model,
	className,
}: {
	model: ModelAdminProductModelRelation;
	className?: string;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon' className={cn(className)}>
					<Icon icon='more' className='w-5 h-5' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>Модель: {model.article}</DialogTitle>
				</DialogHeader>
				<EditModelProductForm model={model} />
				<Separator className='my-3' />
				<div className='font-bold text-lg'>Изображения модели</div>
				<AddModelProductImg model={model} />
				<ModelImgList model={model} />
				<Separator className='my-3' />
				<div className='font-bold text-lg'>Размеры модели</div>
				<AddModelProductSize model={model} />
				<ModelSizeList model={model} />
				<Separator className='my-3' />
				<div className='font-bold text-lg'>Характеристики модели</div>
				<AddProductModelOptionForm model={model} />
				<ModelOptions model={model} />
			</DialogContent>
		</Dialog>
	);
};
