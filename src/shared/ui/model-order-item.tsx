import Image from 'next/image';
import { ModelOrderModel } from '../api/generated';
import { PRODUCT_ROUTE } from '../constants/routes/public';
import { Link } from './link';
import { Price } from './price';
import { TypographySmall } from './typography';
import { cn } from '../utils/cn';

export const OrderModelItem = ({
	m,
	className,
}: {
	m: ModelOrderModel;
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn(className)}>
			<Link
				href={`${PRODUCT_ROUTE}/${m.slug}`}
				className='block w-[160px] mb-2 relative'
			>
				<Image
					className='w-full h-[230px]'
					src={m.main_image_path}
					alt={m.article}
					width={75}
					height={105}
				/>
				<div className='bg-slate-400 text-xs w-12 absolute bottom-0 left-0'>
					{m.quantity} шт.
				</div>
			</Link>
			<Price price={m.price} discount={m.discount} className='mb-1' />
			<div className='flex flex-col'>
				<TypographySmall className='mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-[160px]'>
					{m.product.title}
				</TypographySmall>
				<TypographySmall className='mb-1'>
					Размер: {m.size.size_value}
				</TypographySmall>
			</div>
		</div>
	);
};
