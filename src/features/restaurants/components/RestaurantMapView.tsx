import React from 'react';
import { View, Text } from 'react-native';
import type { Restaurant } from '@app-types/api';

interface RestaurantMapViewProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
}

export function RestaurantMapView({
  restaurants,
  onRestaurantPress,
}: RestaurantMapViewProps): React.JSX.Element {
  console.log('Restaurants in MapView', restaurants);
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-roobert text-base text-muted">Map view</Text>
    </View>
  );
}
