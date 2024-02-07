import { ReactNode } from 'react';
import { cn } from '../utils/cn';

type TypographyProps = { className?: string; children: ReactNode };

export function TypographyH1({ className, children }: TypographyProps) {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				className
			)}
		>
			{children}
		</h1>
	);
}

export function TypographyH2({ className, children }: TypographyProps) {
	return (
		<h2
			className={cn(
				'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
				className
			)}
		>
			{children}
		</h2>
	);
}

export function TypographyH3({ className, children }: TypographyProps) {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-2xl font-semibold tracking-tight',
				className
			)}
		>
			{children}
		</h3>
	);
}

export function TypographyH4({ className, children }: TypographyProps) {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-xl font-semibold tracking-tight',
				className
			)}
		>
			{children}
		</h3>
	);
}

export function TypographyP({ className, children }: TypographyProps) {
	return (
		<p className={cn('eading-7 [&:not(:first-child)]:mt-6', className)}>
			{children}
		</p>
	);
}

export function TypographySmall({ className, children }: TypographyProps) {
	return (
		<span className={cn('text-sm leading-none', className)}>{children}</span>
	);
}
