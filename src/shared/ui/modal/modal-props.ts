import { HTMLAttributes } from 'react';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
	opened: boolean;
	closeModal: () => void;
};
