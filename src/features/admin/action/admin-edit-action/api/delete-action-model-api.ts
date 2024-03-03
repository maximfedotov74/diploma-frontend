import { deleteApiActionModelActionModelId } from '@/shared/api/generated';
import {
	ACTION_MODELS,
	DELETE_ACTION_MODEL,
} from '@/shared/api/query-keys/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteActionModelApi = (actionId: string) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteActionModel } = useMutation({
		mutationKey: [DELETE_ACTION_MODEL],
		mutationFn: (actionModelId: number) =>
			deleteApiActionModelActionModelId(actionModelId),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ACTION_MODELS, actionId] });
		},
	});
	return deleteActionModel;
};
