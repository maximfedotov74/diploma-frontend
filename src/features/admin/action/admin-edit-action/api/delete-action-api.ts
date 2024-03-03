import { deleteApiActionId } from '@/shared/api/generated';
import { ALL_ACTIONS, DELETE_ACTION } from '@/shared/api/query-keys/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteActionApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteAction } = useMutation({
		mutationKey: [DELETE_ACTION],
		mutationFn: (id: string) => deleteApiActionId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_ACTIONS] });
		},
	});
	return deleteAction;
};
