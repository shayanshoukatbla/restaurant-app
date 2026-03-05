import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Restaurant } from '@app-types/api';

interface FavoritesState {
  favoriteIds: string[];
  restaurantCache: Record<string, Restaurant>;
  isHydrated: boolean;
  addFavorite: (restaurant: Restaurant) => void;
  removeFavorite: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
  updateCachedRestaurant: (restaurant: Restaurant) => void;
  setHydrated: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      restaurantCache: {},
      isHydrated: false,

      addFavorite: (restaurant: Restaurant) => {
        set((state) => {
          if (state.favoriteIds.includes(restaurant._id)) return state;
          return {
            favoriteIds: [...state.favoriteIds, restaurant._id],
            restaurantCache: {
              ...state.restaurantCache,
              [restaurant._id]: restaurant,
            },
          };
        });
      },

      removeFavorite: (restaurantId: string) => {
        set((state) => {
          const { [restaurantId]: _, ...restCache } = state.restaurantCache;
          return {
            favoriteIds: state.favoriteIds.filter((id) => id !== restaurantId),
            restaurantCache: restCache,
          };
        });
      },

      isFavorite: (restaurantId: string) => {
        return get().favoriteIds.includes(restaurantId);
      },

      updateCachedRestaurant: (restaurant: Restaurant) => {
        const state = get();
        // Only update if this restaurant is actually a favorite
        if (!state.favoriteIds.includes(restaurant._id)) return;
        set({
          restaurantCache: {
            ...state.restaurantCache,
            [restaurant._id]: restaurant,
          },
        });
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favoriteIds: state.favoriteIds,
        restaurantCache: state.restaurantCache,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const validIds = state.favoriteIds.filter((id) => state.restaurantCache[id]);
          if (validIds.length !== state.favoriteIds.length) {
            state.favoriteIds = validIds;
          }
          state.setHydrated();
        }
      },
    },
  ),
);
