import { postApiUserPasswordCode } from '@/shared/api/generated';
import { SEND_CHANGE_PASSWORD_CODE } from '@/shared/api/query-keys/user';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useSendChangePasswordCode = () => {
	const [opened, setOpened] = useState(false);

	const { mutateAsync: sendChangePasswordCode } = useMutation({
		mutationKey: [SEND_CHANGE_PASSWORD_CODE],
		mutationFn: () => postApiUserPasswordCode(),
		onSuccess: () => {
			setOpened(true);
		},
		onError: () => {
			setOpened(false);
		},
	});
	return { sendChangePasswordCode, opened, setOpened };
};
