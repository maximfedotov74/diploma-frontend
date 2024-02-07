import { useState } from 'react';
import { ModelCategoryRelation } from '../api/generated';
import { Icon } from './icon';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';
import { TypographySmall } from './typography';
import { ErrorText } from './error-text';
import { cn } from '../utils/cn';

const CategoryItemChoice = ({ item }: { item: ModelCategoryRelation }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className='mb-2 last:mb-0'>
			<div className='flex items-center mb-2'>
				{item.subcategories.length === 0 && item.level >= 4 ? (
					<div className='flex items-center'>
						<RadioGroupItem
							value={item.category_id.toString()}
							id={`choice-category-${item.slug}`}
						/>
						<Label className='ml-1' htmlFor={`choice-category-${item.slug}`}>
							{item.short_title}
						</Label>
					</div>
				) : (
					<TypographySmall>{item.short_title}</TypographySmall>
				)}
				{item.subcategories.length > 0 && (
					<Icon
						icon='chevron_up_down'
						className='ml-2'
						onClick={() => setOpen(p => !p)}
					/>
				)}
			</div>
			{open && item.subcategories.length > 0 && (
				<div className='pl-2'>
					{item.subcategories.map(item => (
						<CategoryItemChoice key={item.category_id} item={item} />
					))}
				</div>
			)}
		</div>
	);
};

export const CategoryChoice = ({
	categories,
	onChange,
	defaultValue,
	error,
	className,
}: {
	categories: ModelCategoryRelation[];
	onChange: (value: string) => void;
	defaultValue?: string;
	error?: string;
	className?: string;
}): JSX.Element => {
	return (
		<div className={className}>
			<TypographySmall className='text-foreground/60'>
				Выбор категории
			</TypographySmall>
			<RadioGroup
				onValueChange={onChange}
				defaultValue={defaultValue}
				className={cn('border border-primary p-2 rounded-md')}
			>
				{categories.map(cat => (
					<CategoryItemChoice item={cat} key={cat.slug} />
				))}
			</RadioGroup>
			<ErrorText error={error} />
		</div>
	);
};
