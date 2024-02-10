import {
	ModelCreateOptionDto,
	postApiCharacteristicsOption,
} from '@/shared/api/generated';
import {
	ADD_CHARACTERISTIC,
	ALL_CHARACTERISTICS,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddCharacteristic = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createOption } = useMutation({
		mutationKey: [ADD_CHARACTERISTIC],
		mutationFn: (dto: ModelCreateOptionDto) =>
			postApiCharacteristicsOption(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_CHARACTERISTICS] });
		},
	});
	return createOption;
};
