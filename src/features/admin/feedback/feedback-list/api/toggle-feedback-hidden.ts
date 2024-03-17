import { patchApiFeedbackId } from '@/shared/api/generated';
import {
	GET_ALL_FEEDBACK,
	TOGGLE_FEEDBACK_HIDDEN,
} from '@/shared/api/query-keys/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleFeedbackHidden = () => {
	const qc = useQueryClient();
	const { mutateAsync: toggleHidden } = useMutation({
		mutationKey: [TOGGLE_FEEDBACK_HIDDEN],
		mutationFn: (id: number) => patchApiFeedbackId(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_ALL_FEEDBACK] });
		},
	});
	return toggleHidden;
};
