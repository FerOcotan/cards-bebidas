import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipeSliceType, createRecipesSlice } from './recipeSlice'
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { NotificationSliceType, createNotificationSlice} from './notificationSlice'

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice (...a),
    ...createNotificationSlice(...a),
})))