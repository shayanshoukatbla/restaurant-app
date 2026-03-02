import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Restaurant } from '@app-types/api';

interface FavoritesState {
  favorites: Restaurant[];
  isHydrated: boolean;

  addFavorite: (restaurant: Restaurant) => void;
  removeFavorite: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
  setHydrated: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isHydrated: false,

      addFavorite: (restaurant: Restaurant) => {
        set((state) => ({
          favorites: [...state.favorites, restaurant],
        }));
      },

      removeFavorite: (restaurantId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((r) => r._id !== restaurantId),
        }));
      },

      isFavorite: (restaurantId: string) => {
        return get().favorites.some((r) => r._id === restaurantId);
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
