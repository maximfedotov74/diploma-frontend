import {
	ModelConfirmChangePasswordDto,
	postApiUserPasswordCode,
	postApiUserPasswordCodeConfirm,
} from '@/shared/api/generated';
import { CONFIRM_CHANGE_PASSWORD_CODE } from '@/shared/api/query-keys/user';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { ChangePasswordFormMode } from '../ui/change-password-dialog';
import { useToast } from '@/shared/ui/use-toast';

export const useConfirmChangePasswordCode = (
	setMode: Dispatch<SetStateAction<ChangePasswordFormMode>>
) => {
	const { toast } = useToast();

	const { mutateAsync: confirmChangePasswordCode, error } = useMutation({
		mutationKey: [CONFIRM_CHANGE_PASSWORD_CODE],
		mutationFn: (dto: ModelConfirmChangePasswordDto) =>
			postApiUserPasswordCodeConfirm(dto),
		onSuccess: () => {
			setMode('change-password');
		},
		onError: err => {
			toast({
				duration: 4000,
				title: err.message,
			});
		},
	});
	return { confirmChangePasswordCode, error };
};
