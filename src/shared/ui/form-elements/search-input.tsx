import { VariantProps, cva } from 'class-variance-authority';
import { FC, InputHTMLAttributes } from 'react';

const searchInput = cva('px-2 text-sm placeholder:text-light-gray-color', {
	variants: {
		variant: {
			withBorder: 'border border-primary-color',
			withoutBorder: '',
		},
	},
	defaultVariants: {},
});

type InputProps = InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof searchInput>;

export const SearchInput: FC<InputProps> = ({
	placeholder,
	value,

	onChange,
	type,
	className,
	variant,
	...props
}): JSX.Element => {
	return (
		<input
			type={type}
			className={searchInput({ variant, className })}
			{...props}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
};
