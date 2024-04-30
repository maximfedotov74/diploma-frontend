import { Button } from '@/shared/ui/button';
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useState,
} from 'react';
import { ChangePasswordFormMode } from './change-password-dialog';
import { useConfirmChangePasswordCode } from '../api/confirm-change-password-code';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';

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
					<InputOTP maxLength={6} value={code} onChange={setCode}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<Button disabled={code.length !== 6} className='w-32 mt-5'>
						Отправить
					</Button>
				</div>
			</form>
		</div>
	);
};
