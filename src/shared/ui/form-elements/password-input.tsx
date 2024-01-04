import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Input } from './input';
import { FieldError } from 'react-hook-form';
import { Icon } from '../icon';

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
	placeholder: string;
	error?: string;
};

type InputType = 'text' | 'password';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ error, placeholder, className, ...props }, ref): JSX.Element => {
		const [type, setType] = useState<InputType>('password');

		const onClick = () => {
			const newType: InputType = type == 'password' ? 'text' : 'password';
			setType(newType);
		};
		const rightSection = (
			<Icon
				className='h-6 w-6'
				icon={type == 'password' ? 'hide_outline_20' : 'view_outline_20'}
				onClick={onClick}
			/>
		);
		return (
			<Input
				placeholder={placeholder}
				error={error}
				ref={ref}
				className={className}
				type={type}
				rightSection={rightSection}
				{...props}
			/>
		);
	}
);

PasswordInput.displayName = 'PasswordInput';
