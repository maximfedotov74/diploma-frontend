import { ModelAddFeedbackDto, postApiFeedback } from '@/shared/api/generated';
import {
	ADD_FEEDBACK,
	GET_MODEL_FEEDBACK,
} from '@/shared/api/query-keys/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddFeedbackApi = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: addFeedback, isSuccess } = useMutation({
		mutationKey: [ADD_FEEDBACK],
		mutationFn: (dto: ModelAddFeedbackDto) => postApiFeedback(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [GET_MODEL_FEEDBACK, modelId],
			});
		},
	});

	return { addFeedback, isSuccess };
};
