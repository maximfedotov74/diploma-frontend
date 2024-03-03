import { ModelUser } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { ConfirmCodeForm } from './confirm-code-form';
import { useState } from 'react';
import { useSendChangePasswordCode } from '../api/send-change-password-code';
import { ChangePasswordForm } from './change-password-form';

export type ChangePasswordFormMode = 'confirm' | 'change-password';

export const ChangePasswordDialog = (): JSX.Element => {
	const { opened, setOpened, sendChangePasswordCode } =
		useSendChangePasswordCode();

	const onBtn = async () => {
		await sendChangePasswordCode();
	};

	const [mode, setMode] = useState<ChangePasswordFormMode>('confirm');

	const closeDialog = () => {
		setOpened(false);
	};

	return (
		<Dialog open={opened} onOpenChange={setOpened}>
			<DialogTrigger asChild>
				<Button
					onClick={onBtn}
					variant='outline'
					size='default'
					className='mb-5'
				>
					Пароль
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-md overflow-y-scroll max-h-[500px] px-1 sm:px-3 md:px-4'>
				{mode === 'confirm' ? (
					<>
						<DialogHeader>
							<DialogTitle className='text-center my-5'>
								Введите код из письма, отправленного на ваш email
							</DialogTitle>
						</DialogHeader>
						<ConfirmCodeForm setMode={setMode} />
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle className='text-center my-5'>
								Изменение пароля
							</DialogTitle>
						</DialogHeader>
						<ChangePasswordForm closeDialog={closeDialog} setMode={setMode} />
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
