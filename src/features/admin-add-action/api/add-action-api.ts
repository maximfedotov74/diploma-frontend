import { ModelCreateActionDto, postApiAction } from '@/shared/api/generated';
import { ADD_ACTION, ALL_ACTIONS } from '@/shared/api/query-keys/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddActionApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createAction } = useMutation({
		mutationKey: [ADD_ACTION],
		mutationFn: (dto: ModelCreateActionDto) => postApiAction(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_ACTIONS] });
		},
	});
	return createAction;
};
