import { FC } from 'react';
import { Modal } from './modal';
import { ModalProps } from './modal-props';

export const SelectCityModal: FC<ModalProps> = ({
	closeModal,
	opened,
	children,
}): JSX.Element => {
	return (
		<Modal closeModal={closeModal} opened={opened}>
			{children}
		</Modal>
	);
};
