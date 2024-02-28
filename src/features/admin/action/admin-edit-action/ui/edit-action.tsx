import { ModelAction, ModelBrand } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { EditActionForm } from './edit-action-form';
import { AddModelToAction } from './add-model-to-action';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ActionModelList } from './action-model-list';

export const EditAction = ({
	action,
}: {
	action: ModelAction;
}): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='absolute top-2 right-2' variant='ghost' size='icon'>
					<Icon icon='more' className='w-6 h-6 ' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle>{action.title}</DialogTitle>
				</DialogHeader>

				<Tabs defaultValue='action'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='action'>Акция</TabsTrigger>
						<TabsTrigger value='models'>Модели</TabsTrigger>
					</TabsList>
					<TabsContent value='action'>
						<EditActionForm action={action} />
					</TabsContent>
					<TabsContent value='models'>
						<AddModelToAction action={action} />
						<ActionModelList action={action} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};
