import { deleteApiUserSessionSessionId } from '@/shared/api/generated';
import {
	REMOVE_ONE_SESSION,
	USER_SESSIONS,
} from '@/shared/api/query-keys/user';
import { useToast } from '@/shared/ui/use-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useRemoveSession = () => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync: removeSession } = useMutation({
		mutationKey: [REMOVE_ONE_SESSION],
		mutationFn: (sessionId: number) => deleteApiUserSessionSessionId(sessionId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [USER_SESSIONS] });
			toast({ title: 'Сессия удалена успешно!' });
		},
	});
	return removeSession;
};
