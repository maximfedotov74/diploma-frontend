import { deleteApiUserSessionExceptCurrentSessionId } from '@/shared/api/generated';
import {
	EXCEPT_CURRENT_SESSION,
	USER_SESSIONS,
} from '@/shared/api/query-keys/user';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveExceptCurrentSession = () => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync: removeExceptCurrentSession } = useMutation({
		mutationKey: [EXCEPT_CURRENT_SESSION],
		mutationFn: (sessionId: number) =>
			deleteApiUserSessionExceptCurrentSessionId(sessionId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [USER_SESSIONS] });
			toast({ title: 'Были удалены все сессии кроме текущей!' });
		},
	});
	return removeExceptCurrentSession;
};
