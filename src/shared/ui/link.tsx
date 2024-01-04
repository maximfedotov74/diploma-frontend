import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';

const link = cva('text-center transition-colors flex items-center', {
	variants: {
		variant: {
			primary: 'text-primary-color hover:text-light-gray-color',
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
	VariantProps<typeof link> & {
		href: string;
	};

export const AppLink = forwardRef<HTMLAnchorElement, LinkProps>(
	({ href, variant, className, children, ...props }, ref): JSX.Element => {
		return (
			<Link
				ref={ref}
				href={href}
				className={link({ variant, className })}
				{...props}
			>
				{children}
			</Link>
		);
	}
);

AppLink.displayName = 'AppLink';
