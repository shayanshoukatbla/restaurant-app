import React from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import type { Restaurant } from '@app-types/api';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantCardSkeleton } from './RestaurantCardSkeleton';

const SKELETON_COUNT = 6;

interface RestaurantListViewProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
  isLoading: boolean;
  isRefreshing: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
}

export function RestaurantListView({
  restaurants,
  onRestaurantPress,
  isLoading,
  isRefreshing,
  isFetchingNextPage,
  hasNextPage,
  onRefresh,
  onEndReached,
}: RestaurantListViewProps): React.JSX.Element {
  if (isLoading) {
    return (
      <View className="flex-1 px-4 pt-4 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item._id}
      contentContainerClassName="px-4 pt-4 pb-6 gap-4"
      renderItem={({ item }) => (
        <RestaurantCard restaurant={item} onPress={onRestaurantPress} variant="list" />
      )}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={() => hasNextPage && onEndReached()}
      onEndReachedThreshold={0.3}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="py-4 items-center">
            <ActivityIndicator color="#264BEB" />
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
