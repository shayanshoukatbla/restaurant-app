import React, { useRef, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import MapView, { type Region } from 'react-native-maps';
import type { Restaurant } from '@app-types/api';
import { MapMarkers } from './MapMarkers';
import { MapCardStrip } from './MapCardStrip';

interface RestaurantMapViewProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
  hasNextPage: boolean;
  onEndReached: () => void;
}

export function RestaurantMapView({
  restaurants,
  onRestaurantPress,
  hasNextPage,
  onEndReached,
}: RestaurantMapViewProps): React.JSX.Element {
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList<Restaurant>>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const mappable = restaurants.filter((r) => r.latlng?.lat && r.latlng?.lng);

  const initialRegion: Region | undefined =
    mappable.length > 0
      ? {
          latitude: mappable[0].latlng.lat,
          longitude: mappable[0].latlng.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : undefined;

  const focusOnIndex = useCallback(
    (index: number): void => {
      setFocusedIndex(index);
      listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 });

      const restaurant = mappable[index];
      if (restaurant?.latlng) {
        mapRef.current?.animateToRegion(
          {
            latitude: restaurant.latlng.lat,
            longitude: restaurant.latlng.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          400,
        );
      }
    },
    [mappable],
  );

  const handleCardScrollEnd = (index: number): void => {
    if (index !== focusedIndex && mappable[index]) {
      focusOnIndex(index);
    }
  };

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' }}
        initialRegion={initialRegion}
        userInterfaceStyle="dark"
        showsUserLocation
        showsMyLocationButton={false}
      >
        <MapMarkers
          restaurants={mappable}
          focusedIndex={focusedIndex}
          onMarkerPress={focusOnIndex}
        />
      </MapView>

      {mappable.length > 0 && (
        <MapCardStrip
          restaurants={mappable}
          onRestaurantPress={onRestaurantPress}
          hasNextPage={hasNextPage}
          onEndReached={onEndReached}
          onScrollEnd={handleCardScrollEnd}
          listRef={listRef}
        />
      )}
    </View>
  );
}
