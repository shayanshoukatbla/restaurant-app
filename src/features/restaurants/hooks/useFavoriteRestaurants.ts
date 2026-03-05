import type { Restaurant } from '@app-types/api';
import { useFavoritesStore } from '../store';

export function useFavoriteRestaurants() {
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const restaurantCache = useFavoritesStore((s) => s.restaurantCache);

  const restaurants: Restaurant[] = [];
  for (const id of favoriteIds) {
    const r = restaurantCache[id];
    if (r) restaurants.push(r);
  }

  return { restaurants };
}
