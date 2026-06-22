import { create } from 'zustand';
import { addFavoriteApi, removeFavoriteApi, getFavoritesApi } from '@/lib/api/favorites';

type FavoritesStore = {
  favoriteIds: string[];
  isLoading: boolean;

  loadFavorites: () => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<boolean>;
  isFavorite: (recipeId: string) => boolean;
};

// ФІКС: стор раніше зберігав favorites як `{_id, recipeId}[]`, але бекенд повертає:
// GET — масив повних рецептів (з полем `_id`, без `recipeId`),
// POST/DELETE — лише `{message}`, без даних рецепта.
// Через цю невідповідність isFavorite() завжди повертав false, а кнопка "Save"
// ніколи не перемикалась на "Saved". Тепер зберігаємо просто список id обраних рецептів.
export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],
  isLoading: false,

  /* Завантаження списку обраних рецептів поточного користувача */
  loadFavorites: async () => {
    set({ isLoading: true });
    try {
      const recipes = await getFavoritesApi();
      set({ favoriteIds: recipes.map((recipe: { _id: string }) => recipe._id) });
    } catch (error) {
      console.error('Помилка завантаження обраних:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /* Перемикання стану обраного рецепта (userId більше не потрібен — визначається по сесії) */
  toggleFavorite: async (recipeId: string) => {
    const isFav = get().favoriteIds.includes(recipeId);

    try {
      if (isFav) {
        await removeFavoriteApi(recipeId);
        set(state => ({
          favoriteIds: state.favoriteIds.filter(id => id !== recipeId),
        }));
      } else {
        await addFavoriteApi(recipeId);
        set(state => ({
          favoriteIds: state.favoriteIds.includes(recipeId)
            ? state.favoriteIds
            : [...state.favoriteIds, recipeId],
        }));
      }

      return true;
    } catch (error) {
      console.error('Помилка оновлення обраного:', error);
      return false;
    }
  },

  /* Перевірка, чи є рецепт у списку обраних */
  isFavorite: (recipeId: string) => {
    return get().favoriteIds.includes(recipeId);
  },
}));
