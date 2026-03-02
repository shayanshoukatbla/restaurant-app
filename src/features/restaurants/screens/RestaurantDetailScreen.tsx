import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RestaurantStackScreenProps } from '@app-types/navigation';

type Props = RestaurantStackScreenProps<'RestaurantDetail'>;

export default function RestaurantDetailScreen({ route, navigation }: Props): React.JSX.Element {
  const { restaurantId } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
      <View className="flex-1 items-center justify-center">
        <Text className="font-roobert text-base text-muted">Restaurant detail</Text>
        <Text className="font-roobert text-sm text-subtle mt-2">{restaurantId}</Text>
      </View>
    </SafeAreaView>
  );
}
