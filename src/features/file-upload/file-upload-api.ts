import { postApiFile } from '@/shared/api/generated';
import { UPLOAD_FILE } from '@/shared/api/query-keys/file';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

export const useFileUploadApi = (onChange: (e: any) => void) => {
	const [isLoading, setIsLoading] = useState(false);

	const { mutateAsync: upload } = useMutation({
		mutationKey: [UPLOAD_FILE],
		mutationFn: (file: Blob) => postApiFile({ file }),
		onSuccess: data => {
			onChange(data.path);
		},
	});

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			setIsLoading(true);
			const files = e.target.files;
			if (files?.length) {
				await upload(files[0]);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { uploadFile, isLoading };
};
