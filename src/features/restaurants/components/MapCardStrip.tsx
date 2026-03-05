import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import type { Restaurant } from '@app-types/api';
import { RestaurantCard } from './RestaurantCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_GAP = 8;

interface MapCardStripProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
  hasNextPage: boolean;
  onEndReached: () => void;
  onScrollEnd: (index: number) => void;
  listRef: React.RefObject<FlatList<Restaurant> | null>;
}

export function MapCardStrip({
  restaurants,
  onRestaurantPress,
  hasNextPage,
  onEndReached,
  onScrollEnd,
  listRef,
}: MapCardStripProps): React.JSX.Element {
  const handleScrollEnd = (e: { nativeEvent: { contentOffset: { x: number } } }): void => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP));
    onScrollEnd(index);
  };

  return (
    <View className="absolute bottom-14 left-0 right-0">
      <FlatList
        ref={listRef}
        data={restaurants}
        keyExtractor={(item) => item._id}
        horizontal
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: CARD_GAP }}
        onMomentumScrollEnd={handleScrollEnd}
        onEndReached={hasNextPage ? onEndReached : undefined}
        onEndReachedThreshold={0.5}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + CARD_GAP,
          offset: (CARD_WIDTH + CARD_GAP) * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <RestaurantCard restaurant={item} onPress={onRestaurantPress} variant="map" />
          </View>
        )}
      />
    </View>
  );
}

export { CARD_WIDTH, CARD_GAP };
