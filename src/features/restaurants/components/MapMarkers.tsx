import React, { useState, useEffect } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { Marker } from 'react-native-maps';
import type { Restaurant } from '@app-types/api';
import { IconLocationMarker } from '@components/icons';
import { openDirections } from '../utils/mapDirections';

interface MapMarkersProps {
  restaurants: Restaurant[];
  focusedIndex: number;
  onMarkerPress: (index: number) => void;
}

function CustomMarker({
  restaurant,
  index,
  isFocused,
  onPress,
}: {
  restaurant: Restaurant;
  index: number;
  isFocused: boolean;
  onPress: (index: number) => void;
}): React.JSX.Element {
  const [tracked, setTracked] = useState(Platform.OS === 'android');

  useEffect(() => {
    if (tracked) {
      const timer = setTimeout(() => setTracked(false), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [tracked]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTracked(true);
    }
  }, [isFocused]);

  const handleMarkerPress = (): void => {
    if (Platform.OS === 'android' && isFocused) {
      // Android: tap an already-focused marker → open directions
      openDirections(restaurant.latlng.lat, restaurant.latlng.lng, restaurant.name);
    } else {
      onPress(index);
    }
  };

  const handleLongPress = (): void => {
    openDirections(restaurant.latlng.lat, restaurant.latlng.lng, restaurant.name);
  };

  return (
    <Marker
      coordinate={{
        latitude: restaurant.latlng.lat,
        longitude: restaurant.latlng.lng,
      }}
      onPress={(e) => {
        e.stopPropagation();
        handleMarkerPress();
      }}
      tracksViewChanges={tracked}
      stopPropagation
    >
      {Platform.OS === 'ios' ? (
        <Pressable onLongPress={handleLongPress} delayLongPress={1500}>
          <IconLocationMarker selected={isFocused} />
        </Pressable>
      ) : (
        <View>
          <IconLocationMarker selected={isFocused} />
        </View>
      )}
    </Marker>
  );
}

export function MapMarkers({
  restaurants,
  focusedIndex,
  onMarkerPress,
}: MapMarkersProps): React.JSX.Element {
  return (
    <>
      {restaurants.map((restaurant, index) => (
        <CustomMarker
          key={restaurant._id}
          restaurant={restaurant}
          index={index}
          isFocused={index === focusedIndex}
          onPress={onMarkerPress}
        />
      ))}
    </>
  );
}
