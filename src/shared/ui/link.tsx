import { VariantProps, cva } from 'class-variance-authority';
import NextLink from 'next/link';
import { cn } from '../utils/cn';

const link = cva('transition-colors text-sm', {
	variants: {
		variant: {
			primary: 'text-foreground/60 hover:text-foreground/80',
			secondary: 'text-foreground/60  hover:underline',
			menu: 'hover:text-foreground/60',
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});

type LinkProps = Parameters<typeof NextLink>[0] & VariantProps<typeof link>;
export const Link = ({
	href,
	children,
	variant,
	className,
	...props
}: LinkProps): JSX.Element => {
	return (
		<NextLink
			className={cn(link({ variant, className }))}
			href={href}
			{...props}
		>
			{children}
		</NextLink>
	);
};
