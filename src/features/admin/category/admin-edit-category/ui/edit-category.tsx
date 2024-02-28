import { ModelCategoryRelation } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { EditCategoryForm } from './edit-category-form';

export const EditCategory = ({
	category,
	opened,
}: {
	category: ModelCategoryRelation;
	opened?: boolean;
}): JSX.Element => {
	return (
		<Dialog defaultOpen={opened}>
			<DialogTrigger asChild>
				<Button className='mr-2' variant='ghost' size='icon'>
					<Icon icon='more' className='h-4 w-4 md:w-6 md:h-6 ' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>{category.title}</DialogTitle>
				</DialogHeader>
				<EditCategoryForm category={category} />
			</DialogContent>
		</Dialog>
	);
};
