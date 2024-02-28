import { ModelCategoryModel, ModelCategoryRelation } from '../api/generated';
import { GenderCategoryMenu } from '../constants/genders';

export type HomePageProps = {
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
	genderMenu: GenderCategoryMenu;
};
