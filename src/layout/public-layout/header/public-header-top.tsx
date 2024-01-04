import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { Container } from '../../container';
import { SelectCityModal } from '@/shared/ui/modal/select-city-modal';
import { Typography } from '@/shared/ui/typography';

export const PublichHeaderTop = (): JSX.Element => {
	const [opened, setOpened] = useState<boolean>(false);

	const openModal = () => {
		setOpened(true);
	};

	const closeModal = () => {
		setOpened(false);
	};

	return (
		<div className='h-10 bg-primary-color text-secondary-color'>
			<Container className='flex items-center h-full '>
				<Button onClick={openModal} className='text-xs'>
					г. Челябинск
				</Button>
				<SelectCityModal opened={opened} closeModal={closeModal}>
					<div className='w-[300px]'>
						<Typography variant='h2'>Где вы находитесь?</Typography>
						<div className='min-h-[200px]'>
							<ul>
								<li>фыфывфывфы</li>
								<li>фыв21312321</li>
								<li>лродавпав</li>
							</ul>
						</div>
					</div>
				</SelectCityModal>
			</Container>
		</div>
	);
};
