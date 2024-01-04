import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import {
	DetailedHTMLProps,
	InputHTMLAttributes,
	ReactNode,
	forwardRef,
	useState,
} from 'react';

export interface TextInputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	error?: string;
	placeholder: string;
	rightSection?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{ error, placeholder, type = 'text', className, rightSection, ...props },
		ref
	): JSX.Element => {
		const [focus, setFocus] = useState(false);
		return (
			<div
				className={`h-10 w-full transition-colors ${
					error
						? 'border  border-action-color'
						: focus && !error
						? 'border-[1.5px] border-primary-color'
						: 'border border-light-gray-color'
				}`}
			>
				<label className='flex relative h-full'>
					<input
						className='bg-transparent w-full px-2 outline-none'
						type={type}
						placeholder={placeholder}
						ref={ref}
						{...props}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
					/>
					{rightSection && (
						<span
							className={clsx(
								'absolute top-1/2 right-[10px] -translate-y-1/2 cursor-pointer flex items-center',
								{
									'text-action-color': error !== undefined,
								}
							)}
						>
							{rightSection}
						</span>
					)}
				</label>
				{error && (
					<div className='mt-2 text-xs text-action-color leading-3'>
						{error}
					</div>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
