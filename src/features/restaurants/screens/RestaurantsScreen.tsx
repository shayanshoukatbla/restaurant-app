import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RestaurantStackScreenProps } from '@app-types/navigation';
import { RestaurantsHeader, type ViewMode } from '../components/RestaurantsHeader';
import { RestaurantListView } from '../components/RestaurantListView';
import { RestaurantMapView } from '../components/RestaurantMapView';

type Props = RestaurantStackScreenProps<'Restaurants'>;

export default function RestaurantsScreen({ navigation }: Props): React.JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleRestaurantPress = (restaurantId: string): void => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
      <RestaurantsHeader viewMode={viewMode} onViewModeChange={setViewMode} />
      <View className="flex-1">
        {viewMode === 'list' ? (
          <RestaurantListView restaurants={[]} onRestaurantPress={handleRestaurantPress} />
        ) : (
          <RestaurantMapView restaurants={[]} onRestaurantPress={handleRestaurantPress} />
        )}
      </View>
    </SafeAreaView>
  );
}
