import { forwardRef, useState } from 'react';
import { Input, InputProps } from './input';
import { Icon } from './icon';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
	({ ...props }, ref): JSX.Element => {
		const [type, setType] = useState<'text' | 'password'>('password');

		return (
			<Input
				type={type}
				{...props}
				ref={ref}
				rightSection={
					<Icon
						icon={type === 'password' ? 'hide_outline_20' : 'view_outline_20'}
						onClick={() =>
							setType(p => (p === 'password' ? 'text' : 'password'))
						}
						className='h-5 w-5'
					/>
				}
			/>
		);
	}
);

PasswordInput.displayName = 'PasswordInput';
