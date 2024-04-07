import { getApiProductModelSearch } from '@/shared/api/generated';
import { SEARCH } from '@/shared/api/query-keys/product';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';

export const useSearchApi = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const { debounced, setDebounced } = useDebounce(searchTerm, 500);

	const { data: models } = useQuery({
		queryKey: [SEARCH, debounced],
		queryFn: () => getApiProductModelSearch({ searchTerm: debounced }),
		enabled: !!debounced,
	});

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(models === undefined ? false : true);
	}, [models]);

	return {
		handleSearch,
		models,
		searchTerm,
		setDebounced,
		open,
		setOpen,
	};
};
