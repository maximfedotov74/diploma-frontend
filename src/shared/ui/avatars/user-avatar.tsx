import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';

const userAvatar = cva('rounded-xl', {
	variants: {
		size: {
			sm: 'h-14 w-14',
			md: 'h-32 w-32',
		},
	},
	defaultVariants: {
		size: 'sm',
	},
});

type CategoryAvatarProps = {
	src: string;
	alt: string;
	className?: string;
} & VariantProps<typeof userAvatar>;

export const UserAvatar = ({
	src,
	alt,
	className,
	size,
}: CategoryAvatarProps): JSX.Element => {
	return (
		<Image
			width={65}
			height={65}
			src={src}
			alt={alt}
			className={userAvatar({ className, size })}
		/>
	);
};
