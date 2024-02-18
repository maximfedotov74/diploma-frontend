import * as React from 'react';

import { cn } from '@/shared/utils/cn';
import { ErrorText } from './error-text';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	rightSection?: React.ReactNode;
	error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, rightSection, error, ...props }, ref) => {
		return (
			<div className={cn(className)}>
				<div className='relative'>
					<input
						type={type}
						className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
						ref={ref}
						{...props}
					/>
					{rightSection && (
						<span className='absolute top-1/2  right-[10px] -translate-y-1/2 cursor-pointer flex items-center'>
							{rightSection}
						</span>
					)}
				</div>
				<ErrorText error={error} />
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
