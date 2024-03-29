import * as React from 'react';

import { cn } from '@/shared/utils/cn';
import { ErrorText } from './error-text';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, ...props }, ref) => {
		return (
			<div className={cn(className)}>
				<textarea
					className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
					ref={ref}
					{...props}
				/>
				<ErrorText error={error} />
			</div>
		);
	}
);
Textarea.displayName = 'Textarea';

export { Textarea };
