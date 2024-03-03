import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { AddFeedbackForm } from './add-feedback-form';
import { useGetProfileApi } from '@/shared/api/queries/get-profile-api';
import { Link } from '@/shared/ui/link';
import { AUTH_ROUTE } from '@/shared/constants/routes/public';
import { useState } from 'react';

export const AddFeedback = ({ modelId }: { modelId: number }): JSX.Element => {
	const { data: user } = useGetProfileApi();
	const [opened, setOpened] = useState(false);

	if (!user) {
		return (
			<div className='flex items-center mb-4'>
				<div className='mr-1'>Чтобы оставить отзыв нужно</div>
				<Link
					variant='secondary'
					className='text-base text-action'
					href={AUTH_ROUTE}
				>
					войти или зарегистрироваться
				</Link>
			</div>
		);
	}

	const closeDialog = () => {
		setOpened(false);
	};

	return (
		<Dialog open={opened} onOpenChange={setOpened}>
			<DialogTrigger asChild>
				<Button variant='outline' className='mb-4'>
					Написать отзыв
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-5xl overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				<DialogHeader>
					<DialogTitle> Написать отзыв</DialogTitle>
				</DialogHeader>
				<AddFeedbackForm modelId={modelId} closeDialog={closeDialog} />
			</DialogContent>
		</Dialog>
	);
};
