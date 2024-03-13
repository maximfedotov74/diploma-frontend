import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import { ChangePasswordFormMode } from './change-password-dialog';
import { useConfirmChangePasswordCode } from '../api/confirm-change-password-code';

export const ConfirmCodeForm = ({
	setMode,
}: {
	setMode: Dispatch<SetStateAction<ChangePasswordFormMode>>;
}): JSX.Element => {
	const [code, setCode] = useState('');

	const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 6) {
			return;
		}
		setCode(e.target.value);
	};

	const { confirmChangePasswordCode } = useConfirmChangePasswordCode(setMode);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await confirmChangePasswordCode({ code });
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='flex flex-col justify-center items-center'>
					<Input
						className='w-32'
						type='number'
						value={code}
						onChange={onCodeChange}
						placeholder='Код'
					/>
					<Button disabled={code.length !== 6} className='w-32 mt-5'>
						Отправить
					</Button>
				</div>
			</form>
		</div>
	);
};
