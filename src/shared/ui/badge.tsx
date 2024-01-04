import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const badge = cva('text-[11px] text-center flex items-center justify-center', {
	variants: {
		variant: {
			action: 'bg-action-color text-secondary-color',
			mint: 'bg-mint-color text-secondary-color',
			ghost: 'bg-blue-20-color text-dark-blue-color',
		},
		type: {
			circle: 'rounded-full w-6 h-6',
			rectangle: 'min-w-[35px] max-w-[43px] h-4 -skew-x-[10deg]',
		},
	},
	defaultVariants: {
		variant: 'action',
		type: 'rectangle',
	},
});

type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badge>;

export const Badge = ({
	variant,
	children,
	className,
	type,
	...props
}: BadgeProps): JSX.Element => {
	return (
		<div className={badge({ variant, type, className })} {...props}>
			{children}
		</div>
	);
};
