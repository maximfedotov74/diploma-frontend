export type GenderMenuItem = {
	id: number;
	title: string;
	short_title: string;
	slug: string;
};

export type GenderMenuProps = {
	items: GenderMenuItem[];
};
