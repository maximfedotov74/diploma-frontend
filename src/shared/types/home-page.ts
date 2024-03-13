import {
	ModelActionGender,
	ModelBrand,
	ModelCategoryModel,
	ModelCategoryRelation,
} from '../api/generated';

export type HomePageProps = {
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
	genderMenu: ModelActionGender;
	brands: ModelBrand[];
};
