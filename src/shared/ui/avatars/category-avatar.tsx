import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';

const categoryAvatar = cva('h-20 w-20', {
	variants: {
		type: {
			circle: 'rounded-lg',
			rectange: 'rounded-none',
		},
	},
	defaultVariants: {
		type: 'rectange',
	},
});

type CategoryAvatarProps = {
	src: string;
	alt: string;
	className?: string;
} & VariantProps<typeof categoryAvatar>;

export const CategoryAvatar = ({
	src,
	alt,
	className,
	type,
}: CategoryAvatarProps): JSX.Element => {
	return (
		<Image
			width={80}
			height={80}
			src={src}
			alt={alt}
			className={categoryAvatar({ className, type })}
		/>
	);
};
