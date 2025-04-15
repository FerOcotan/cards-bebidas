import { StateCreator } from "zustand";
import { getCategories } from "../services/RecipeService";

type Category = {}


export type RecipeSliceType = {
    categories: Category[]
    fetchCategories: () => Promise<void>

}


export const createRecipesSlice : StateCreator<RecipeSliceType>= () => ({
    categories: [],
    fetchCategories: async () => {
    getCategories()
    }
});