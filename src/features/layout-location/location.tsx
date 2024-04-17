import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Icon } from '@/shared/ui/icon';
import { TypographySmall } from '@/shared/ui/typography';

export const Location = (): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost'>
					<span>
						<Icon icon='location_outline_24' className='h-7 w-7 mr-1' />
					</span>
					<TypographySmall>г. Челябинск</TypographySmall>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Где вы находитесь?</DialogTitle>
				</DialogHeader>
				<ul>
					<li>г. Челябинск</li>
				</ul>
				<TypographySmall className='italic underline'>
					Извините, но магазин работает пока только по Челябинской области
				</TypographySmall>
			</DialogContent>
		</Dialog>
	);
};
