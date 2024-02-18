import { KeyboardEvent, useRef } from 'react';
import { InputProps } from './input';
import { TypographySmall } from './typography';
import { cn } from '../utils/cn';
import { Label } from './label';
import { ErrorText } from './error-text';

export const FileInput = ({
	placeholder,
	className,
	accept,
	onChange,
	error,
}: InputProps): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onLabelKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (inputRef.current) {
				inputRef.current.click();
			}
		}
	};

	return (
		<div className={cn('relative', className)}>
			<Label tabIndex={0} onKeyDown={onLabelKeyDown}>
				<TypographySmall>{placeholder}</TypographySmall>
				<input
					ref={inputRef}
					type='file'
					className='hidden'
					accept={accept}
					onChange={onChange}
				/>
			</Label>
			<div>
				<ErrorText error={error} />
			</div>
		</div>
	);
};
