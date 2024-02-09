import { ModelAdminProductModelRelation } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';

export const EditModelProduct = ({
	model,
}: {
	model: ModelAdminProductModelRelation;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon' className='sm:mt-2'>
					<Icon icon='more' className='w-5 h-5' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				Редактирование модели {model.article}
			</DialogContent>
		</Dialog>
	);
};
