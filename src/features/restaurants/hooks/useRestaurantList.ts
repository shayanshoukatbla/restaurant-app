import { useInfiniteQuery } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';
import type { Restaurant } from '@app-types/api';

export const RESTAURANT_LIST_KEY = ['restaurants'] as const;

const PAGE_SIZE = 10;

export interface UseRestaurantListResult {
  restaurants: Restaurant[];
  isLoading: boolean;
  isRefreshing: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  refresh: () => Promise<void>;
  fetchNextPage: () => void;
}

export function useRestaurantList(): UseRestaurantListResult {
  const query = useInfiniteQuery({
    queryKey: RESTAURANT_LIST_KEY,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      restaurantApi.getList({ page: pageParam as number, limit: PAGE_SIZE }),
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.length * PAGE_SIZE;
      return fetched < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const restaurants = query.data?.pages.flatMap((p) => p.restaurantList) ?? [];

  const refresh = async (): Promise<void> => {
    await query.refetch();
  };

  return {
    restaurants,
    isLoading: query.isLoading,
    isRefreshing: query.isRefetching && !query.isFetchingNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    refresh,
    fetchNextPage: query.fetchNextPage,
  };
}
