import { ReactNode } from 'react';
import { cn } from '../utils/cn';

export const WidthContainer = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn('max-w-[1230px]  px-1 lg:px-4 mx-auto', className)}>
			{children}
		</div>
	);
};
