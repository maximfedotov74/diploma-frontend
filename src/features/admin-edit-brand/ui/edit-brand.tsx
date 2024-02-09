import { ModelBrand } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { EditBrandForm } from './edit-brand-form';

export const EditBrand = ({ brand }: { brand: ModelBrand }): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='absolute top-2 right-2' variant='ghost' size='icon'>
					<Icon icon='more' className='w-6 h-6 ' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>{brand.title}</DialogTitle>
				</DialogHeader>
				<EditBrandForm brand={brand} />
			</DialogContent>
		</Dialog>
	);
};
