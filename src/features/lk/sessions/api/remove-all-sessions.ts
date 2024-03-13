import { deleteApiUserSessionAll } from '@/shared/api/generated';
import {
	REMOVE_ALL_SESSIONS,
	USER_SESSIONS,
} from '@/shared/api/query-keys/user';
import { AUTH_ROUTE } from '@/shared/constants/routes/public';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useRemoveAllSessions = () => {
	const qc = useQueryClient();
	const router = useRouter();
	const { mutateAsync: removeSession } = useMutation({
		mutationKey: [REMOVE_ALL_SESSIONS],
		mutationFn: () => deleteApiUserSessionAll(),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [USER_SESSIONS] });
			router.push(AUTH_ROUTE);
		},
	});
	return removeSession;
};
