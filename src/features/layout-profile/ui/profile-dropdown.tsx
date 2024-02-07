import Image from 'next/image';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { TypographySmall } from '@/shared/ui/typography';
import { Separator } from '@/shared/ui/separator';
import { useState } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import { Link } from '@/shared/ui/link';
import { AuthDialogTrigger } from '@/features/layout-profile/ui/auth-dialog-trigger';
import { ProfileWish } from './profile-wish';

export const ProfilePropdown = () => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(true);

	if (loading) {
		return <Skeleton className='h-10 w-10 rounded-full' />;
	}

	if (!loading && user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button>
						<Avatar className='h-10 w-10'>
							<AvatarImage asChild src='/img/jason-eyes.jpg' alt='avatar'>
								<Image
									src='/img/jason-eyes.jpg'
									alt='avatar'
									width={40}
									height={40}
								/>
							</AvatarImage>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className=''>
					<DropdownMenuItem className='px-2 py-1.5'>
						<Link variant='menu' className='flex flex-col items-start' href='/'>
							<TypographySmall className='mb-1 font-semibold'>
								Максим Федотов
							</TypographySmall>
							<TypographySmall className='text-foreground/60'>
								tixii22874@gmail.com
							</TypographySmall>
						</Link>
					</DropdownMenuItem>
					<Separator className='my-1' />
					<div>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Заказы
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Возвраты
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Отзывы и вопросы
							</Link>
						</DropdownMenuItem>
					</div>
					<Separator className='my-1' />
					<ProfileWish />
					<Separator className='my-1' />
					<div>
						<DropdownMenuItem>
							<Link variant='menu' href='/' className='w-full'>
								Выйти
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='px-2 py-1.5'>
							<Link variant='menu' href='/' className='w-full'>
								Выйти со всех устройств
							</Link>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	if (!loading && !user) {
		return <AuthDialogTrigger />;
	}
};
