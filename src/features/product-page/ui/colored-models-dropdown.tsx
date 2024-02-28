import Image from 'next/image';
import { ModelProductModelColors } from '../../../shared/api/generated';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../shared/ui/dropdown-menu';
import { Icon } from '../../../shared/ui/icon';
import { Link } from '../../../shared/ui/link';
import { PRODUCT_ROUTE } from '../../../shared/constants/routes/public';
import { KeyboardEvent, useState } from 'react';
import { cn } from '@/shared/utils/cn';

export const ColoredModelsDropdownItem = ({
	isCurrent = false,
	item,
}: {
	isCurrent?: boolean;
	item: ModelProductModelColors;
}): JSX.Element => {
	if (isCurrent) {
		return (
			<div className='flex items-center p-3 border border-primary rounded-sm relative h-12'>
				<Image
					className='w-6 h-8'
					src={item.image_path}
					alt='Изображение модели'
					width={60}
					height={60}
				/>
				<div className='ml-4 text-sm'>{item.color.value}</div>
				<div className='absolute top-1/2 -translate-y-1/2 right-3'>
					<Icon icon='chevron_up_down' className='h-5 w-5' />
				</div>
			</div>
		);
	}

	return (
		<Link
			href={`${PRODUCT_ROUTE}/${item.slug}`}
			variant='menu'
			className='flex items-center p-3 rounded-sm relative h-12'
		>
			<Image
				className='w-6 h-8'
				src={item.image_path}
				alt='Изображение модели'
				width={60}
				height={60}
			/>
			<div className='ml-4'>{item.color.value}</div>
		</Link>
	);
};

export const ColoredModelsDropdown = ({
	models,
	currentModelId,
	className,
}: {
	models: ModelProductModelColors[];
	currentModelId: number;
	className?: string;
}) => {
	const [open, setOpen] = useState(false);
	const current = models.find(m => m.id === currentModelId);
	const otherModels = models.filter(m => m.id !== currentModelId);

	if (!current) return null;

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			setOpen(p => !p);
		}
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<div
					tabIndex={0}
					onKeyDown={onKeyDown}
					className={cn('w-[200px]', className)}
				>
					<ColoredModelsDropdownItem isCurrent={true} item={current} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='p-0'>
				{otherModels.map(m => (
					<DropdownMenuItem className='h-12 w-[200px] p-0' key={m.id}>
						<ColoredModelsDropdownItem item={m} />
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
