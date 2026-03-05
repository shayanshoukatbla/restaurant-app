import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favoriteIds: string[];
  isHydrated: boolean;

  addFavorite: (restaurantId: string) => void;
  removeFavorite: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
  setHydrated: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isHydrated: false,

      addFavorite: (restaurantId: string) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(restaurantId)
            ? state.favoriteIds
            : [...state.favoriteIds, restaurantId],
        }));
      },

      removeFavorite: (restaurantId: string) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== restaurantId),
        }));
      },

      isFavorite: (restaurantId: string) => {
        return get().favoriteIds.includes(restaurantId);
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
