import { Button } from '@/shared/ui/button';
import { SizeSelect } from '@/shared/ui/choice-lists/size-select';
import { useState } from 'react';

type SizeSelect = {
	size_model_id: number;
	size_id: number;
	literal: string;
	model_id: number;
	size_value: string;
	in_stock: number;
};
export const ProductCardSelect = ({
	sizes,
}: {
	sizes: SizeSelect[];
}): JSX.Element => {
	const [size, setSize] = useState(sizes[0]);

	return (
		<div>
			<SizeSelect sizes={sizes} onChange={setSize} value={size} />
			<Button
				rounded='md'
				size='full'
				variant={'outlined'}
				className='py-2 mt-1'
			>
				Добавить в корзину
			</Button>
		</div>
	);
};
