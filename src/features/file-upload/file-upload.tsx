import { FileInput } from '@/shared/ui/file-input';
import { useFileUploadApi } from './file-upload-api';
import { InputProps } from '@/shared/ui/input';
import Image from 'next/image';

type FileUploadProps = InputProps & {
	onChange: (e: any) => void;
	value: string;
	image?: boolean;
};

export const FileUpload = ({
	onChange,
	value,
	...props
}: FileUploadProps): JSX.Element => {
	const { isLoading, uploadFile } = useFileUploadApi(onChange);
	return (
		<div>
			<FileInput onChange={uploadFile} {...props} />
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				value && (
					<Image src={value} width={60} height={60} alt='uploaded-image' />
				)
			)}
		</div>
	);
};
