import { ModelAdminProductModelRelation } from '@/shared/api/generated';
import { useGetAllCharacteristics } from '@/shared/api/queries/get-characteristics-list-api';
import { Combobox } from '@/shared/ui/combobox';
import { FormEvent, useEffect, useState } from 'react';
import { useAddModelOption } from '../api/add-model-product-option';
import { Button } from '@/shared/ui/button';

export const AddProductModelOptionForm = ({
	model,
}: {
	model: ModelAdminProductModelRelation;
}): JSX.Element => {
	const { data: options } = useGetAllCharacteristics();

	const [activeOption, setActiveOption] = useState<number | undefined>(
		undefined
	);

	const [activeValue, setActiveValue] = useState<number | undefined>(undefined);

	const [values, setValues] = useState<{ title: string; id: number }[]>([]);

	useEffect(() => {
		if (activeOption && options) {
			const currentOption = options.find(opt => opt.id === activeOption);
			if (currentOption) {
				const newValues = currentOption.values?.map(v => ({
					title: v.value,
					id: v.id,
				}));
				setValues(newValues ? newValues : []);
			}
		}
	}, [activeOption, options]);

	const addOption = useAddModelOption(model.id);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (activeOption && activeValue) {
			await addOption({
				option_id: activeOption,
				value_id: activeValue,
				product_model_id: model.id,
			});
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<Combobox
				items={options || []}
				placeholder='Характеристика'
				setValue={value => setActiveOption(+value)}
				value={activeOption ? activeOption.toString() : undefined}
				className='mb-3'
			/>
			<Combobox
				items={values || []}
				placeholder='Значение'
				setValue={v => setActiveValue(+v)}
				value={activeValue ? activeValue.toString() : undefined}
				className='mb-3'
			/>

			<Button>Добавить</Button>
		</form>
	);
};
