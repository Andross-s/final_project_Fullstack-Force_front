import { create } from 'zustand';
import { User } from '@/types/user';
import { addFavoriteApi, removeFavoriteApi, getFavoritesApi } from '@/lib/api/favorites';

type FavoriteItem = {
  _id: string;
  recipeId: string;
};

type FavoritesStore = {
  favorites: FavoriteItem[];
  isLoading: boolean;

  loadFavorites: (userId: string) => Promise<void>;
  toggleFavorite: (recipeId: string, userId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  isLoading: false,

  /* Завантаження списку обраних рецептів користувача */
  loadFavorites: async (userId: string) => {
    set({ isLoading: true });
    try {
      const data = await getFavoritesApi(userId);
      set({ favorites: data });
    } catch (error) {
      console.error('Помилка завантаження обраних:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /* Перемикання стану обраного рецепта */
  toggleFavorite: async (recipeId: string, userId: string) => {
    const { favorites } = get();
    const isFav = favorites.some(f => f.recipeId === recipeId);

    try {
      if (isFav) {
        await removeFavoriteApi(recipeId, userId);
        set({
          favorites: favorites.filter(f => f.recipeId !== recipeId),
        });
      } else {
        const newFav = await addFavoriteApi(recipeId, userId);
        set({
          favorites: [...favorites, newFav],
        });
      }
    } catch (error) {
      console.error('Помилка оновлення обраного:', error);
    }
  },

  /* Перевірка, чи є рецепт у списку обраних */
  isFavorite: (recipeId: string) => {
    return get().favorites.some(f => f.recipeId === recipeId);
  },
}));
