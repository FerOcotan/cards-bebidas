import { create } from 'zustand';
import { RecipeSliceType,createRecipesSlice } from './recipeSlice'


export const useAppStore = create<RecipeSliceType>((...a) => ({
    ...createRecipesSlice(...a),
}))