import { ModelProductModelSize } from '@/shared/api/generated';
import { useGetCartApi } from '@/shared/api/queries/get-cart-api';
import { Button } from '@/shared/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/shared/utils/cn';
import { useState } from 'react';
import { useAddToCartApi } from '../api/add-to-cart-api';

export const SizeSelectToCart = ({
	sizes,
	className,
}: {
	sizes: ModelProductModelSize[];
	className?: string;
}): JSX.Element => {
	const [modelSizeId, setModelSizeId] = useState<string | undefined>(undefined);

	const { data: cart } = useGetCartApi();

	const addToCart = useAddToCartApi();

	const disableItem = (id: number) => {
		const exist = cart?.find(c => c.cart_item_model_size.model_size_id === id);
		if (exist) {
			return true;
		}
		return false;
	};

	const disableBtn = (id: string | undefined) => {
		if (id === undefined) {
			return true;
		}
		return disableItem(+id);
	};

	const onClick = () => {
		if (modelSizeId) {
			addToCart({ model_size_id: +modelSizeId });
		}
	};

	return (
		<div>
			<Select onValueChange={setModelSizeId}>
				<SelectTrigger className={cn('mb-3', className)}>
					<SelectValue placeholder='Размер' />
				</SelectTrigger>
				<SelectContent>
					{sizes?.map(s => {
						const inCart = disableItem(s.size_model_id);
						return (
							<SelectItem
								key={s.size_id}
								value={s.size_model_id.toString()}
								disabled={inCart || s.in_stock === 0}
								className='flex items-center'
							>
								<div>
									{s.size_value} ({s.literal}) ({s.in_stock})
								</div>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			<Button
				disabled={modelSizeId === undefined || disableBtn(modelSizeId)}
				onClick={onClick}
				className='w-full'
			>
				Добавить в корзину
			</Button>
		</div>
	);
};
