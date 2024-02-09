import { FileInput } from '@/shared/ui/file-input';
import { useFileUploadApi } from './file-upload-api';
import { InputProps } from '@/shared/ui/input';
import Image from 'next/image';

type FileUploadProps = InputProps & {
	onChange: (e: any) => void;
	value?: string;
	image?: boolean;
};

export const FileUpload = ({
	onChange,
	value,
	className,
	...props
}: FileUploadProps): JSX.Element => {
	const { isLoading, uploadFile } = useFileUploadApi(onChange);
	return (
		<div className={className}>
			<FileInput onChange={uploadFile} {...props} />
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				value && (
					<Image
						src={value}
						width={340}
						height={340}
						alt='uploaded-image'
						className='w-[100px] h-[100px] rounded-md'
					/>
				)
			)}
		</div>
	);
};
