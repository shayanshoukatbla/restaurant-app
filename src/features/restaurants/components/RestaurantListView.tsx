import React from 'react';
import { View, Text } from 'react-native';
import type { Restaurant } from '@app-types/api';

interface RestaurantListViewProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
}

export function RestaurantListView({
  restaurants,
  onRestaurantPress,
}: RestaurantListViewProps): React.JSX.Element {
  console.log('Restaurants in ListView', restaurants);
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-roobert text-base text-muted">List view</Text>
    </View>
  );
}
