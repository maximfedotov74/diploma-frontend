import { Dispatch, SetStateAction } from 'react';
import { ChangePasswordFormMode } from '../ui/change-password-dialog';
import { useMutation } from '@tanstack/react-query';
import { CHANGE_PASSWORD } from '@/shared/api/query-keys/user';
import {
	ModelChangePasswordDto,
	patchApiUserPasswordCodeChange,
} from '@/shared/api/generated';
import { useToast } from '@/shared/ui/use-toast';

export const useChangePassword = (
	closeDialog: () => void,
	setMode: Dispatch<SetStateAction<ChangePasswordFormMode>>
) => {
	const { toast } = useToast();

	const { mutateAsync: changePassword } = useMutation({
		mutationKey: [CHANGE_PASSWORD],
		mutationFn: (dto: ModelChangePasswordDto) =>
			patchApiUserPasswordCodeChange(dto),
		onSuccess: () => {
			setMode('confirm');
			closeDialog();
			toast({ duration: 4000, title: 'Пароль изменен успешно!' });
		},
		onError: err => {
			toast({
				duration: 4000,
				title: err.message,
			});
		},
	});
	return changePassword;
};
