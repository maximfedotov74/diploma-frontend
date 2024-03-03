import {
	ModelConfirmChangePasswordDto,
	postApiUserPasswordCode,
	postApiUserPasswordCodeConfirm,
} from '@/shared/api/generated';
import { CONFIRM_CHANGE_PASSWORD_CODE } from '@/shared/api/query-keys/user';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { ChangePasswordFormMode } from '../ui/change-password-dialog';

export const useConfirmChangePasswordCode = (
	setMode: Dispatch<SetStateAction<ChangePasswordFormMode>>
) => {
	const { mutateAsync: confirmChangePasswordCode, error } = useMutation({
		mutationKey: [CONFIRM_CHANGE_PASSWORD_CODE],
		mutationFn: (dto: ModelConfirmChangePasswordDto) =>
			postApiUserPasswordCodeConfirm(dto),
		onSuccess: () => {
			setMode('change-password');
		},
	});
	return { confirmChangePasswordCode, error };
};
