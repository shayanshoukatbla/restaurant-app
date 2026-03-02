import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RestaurantStackScreenProps } from '@app-types/navigation';
import { RestaurantsHeader, type ViewMode } from '../components/RestaurantsHeader';
import { RestaurantListView } from '../components/RestaurantListView';
import { RestaurantMapView } from '../components/RestaurantMapView';
import { useRestaurantList } from '../hooks/useRestaurantList';

type Props = RestaurantStackScreenProps<'Restaurants'>;

export default function RestaurantsScreen({ navigation }: Props): React.JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const {
    restaurants,
    isLoading,
    isRefreshing,
    isFetchingNextPage,
    hasNextPage,
    refresh,
    fetchNextPage,
  } = useRestaurantList();

  const handleRestaurantPress = (restaurantId: string): void => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
      <RestaurantsHeader viewMode={viewMode} onViewModeChange={setViewMode} />
      <View className="flex-1">
        {viewMode === 'list' ? (
          <RestaurantListView
            restaurants={restaurants}
            onRestaurantPress={handleRestaurantPress}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            onRefresh={refresh}
            onEndReached={fetchNextPage}
          />
        ) : (
          <RestaurantMapView restaurants={restaurants} onRestaurantPress={handleRestaurantPress} />
        )}
      </View>
    </SafeAreaView>
  );
}
