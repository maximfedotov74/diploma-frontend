import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

const button = cva(
	'font-normal text-sm text-center transition-colors flex items-center justify-center',
	{
		variants: {
			variant: {
				fill: 'bg-primary-color text-secondary-color hover:bg-tundora-color',
				outlined:
					'border border-primary-color text-primary-color transition-opacity hover:opacity-60',
				simple: 'text-primary-color hover:text-light-gray-color',
			},
			size: {
				full: 'w-full',
			},
			rounded: {
				sm: 'rounded-[4px]',
				md: 'rounded-md',
				lg: 'rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'fill',
		},
	}
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ children, variant, className, size, rounded, ...props },
		ref
	): JSX.Element => {
		return (
			<button
				ref={ref}
				className={button({ variant, size, rounded, className })}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
