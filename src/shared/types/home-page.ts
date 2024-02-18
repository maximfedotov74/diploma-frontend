import { ModelCategoryModel, ModelCategoryRelation } from '../api/generated';

export type HomePageProps = {
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
};
