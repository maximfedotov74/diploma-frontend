import { deleteApiFeedbackId } from '@/shared/api/generated';
import {
	DELETE_FEEDBACK,
	GET_ALL_FEEDBACK,
} from '@/shared/api/query-keys/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteFeedback = () => {
	const qc = useQueryClient();
	const { mutateAsync: deleteFeedback } = useMutation({
		mutationKey: [DELETE_FEEDBACK],
		mutationFn: (id: number) => deleteApiFeedbackId(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_ALL_FEEDBACK] });
		},
	});
	return deleteFeedback;
};
