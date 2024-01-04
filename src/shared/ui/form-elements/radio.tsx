import { RadioGroup } from '@headlessui/react';
import { VariantProps, cva } from 'class-variance-authority';
import { Dispatch, SetStateAction, forwardRef } from 'react';

const radio = cva(
	'h-5 w-5 rounded-full border border-primary-color relative before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:block before:w-[10px] before:h-[10px] before:rounded-full before:transition-colors before:ease-in-out before:duration-200 ',
	{
		variants: {
			variant: {
				active: 'before:bg-primary-color',
				disable: 'before:bg-transparent ',
			},
		},
		defaultVariants: {
			variant: 'disable',
		},
	}
);

type RadioProps = VariantProps<typeof radio> & {
	title: string;
	className?: string;
};

export const Radio = ({
	title,
	variant,
	className,
}: RadioProps): JSX.Element => {
	return (
		<div className='flex items-center'>
			<div className={radio({ className, variant })}></div>
			<span className='ml-[13px] tracking-ls-1 text-base'>{title}</span>
		</div>
	);
};
