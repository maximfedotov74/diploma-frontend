import { ModelUpdateActionDto, patchApiActionId } from '@/shared/api/generated';
import { ALL_ACTIONS, EDIT_ACTION } from '@/shared/api/query-keys/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditActionApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: editAction } = useMutation({
		mutationKey: [EDIT_ACTION],
		mutationFn: ({ id, dto }: { id: string; dto: ModelUpdateActionDto }) =>
			patchApiActionId(id, dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_ACTIONS] });
		},
	});
	return editAction;
};
