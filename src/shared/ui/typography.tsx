import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

const title = cva('font-normal text-primary-color', {
	variants: {
		variant: {
			h1: 'text-3xl',
			h2: 'text-2xl',
			h3: 'text-xl',
			h4: 'text-lg',
			p: 'text-[13px] leading-[18px]',
		},
	},
	defaultVariants: {
		variant: 'h1',
	},
});

type TitleProps = HTMLAttributes<HTMLHeadingElement> &
	VariantProps<typeof title>;

export const Typography: FC<TitleProps> = ({
	variant,
	children,
	className,
	...props
}): JSX.Element => {
	const classes = title({ variant, className });
	switch (variant) {
		case 'h1':
			return (
				<h1 className={classes} {...props}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 className={classes} {...props}>
					{children}
				</h2>
			);
		case 'h3':
			return (
				<h3 className={classes} {...props}>
					{children}
				</h3>
			);
		case 'h4':
			return (
				<h4 className={classes} {...props}>
					{children}
				</h4>
			);
		case 'p':
			return (
				<p className={classes} {...props}>
					{children}
				</p>
			);
		default:
			return (
				<h1 className={classes} {...props}>
					{children}
				</h1>
			);
	}
};
