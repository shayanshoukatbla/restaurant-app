import React from 'react';
import { Marker } from 'react-native-maps';
import type { Restaurant } from '@app-types/api';
import { IconLocationMarker } from '@components/icons';

interface MapMarkersProps {
  restaurants: Restaurant[];
  focusedIndex: number;
  onMarkerPress: (index: number) => void;
}

export function MapMarkers({
  restaurants,
  focusedIndex,
  onMarkerPress,
}: MapMarkersProps): React.JSX.Element {
  return (
    <>
      {restaurants.map((restaurant, index) => (
        <Marker
          key={restaurant._id}
          coordinate={{
            latitude: restaurant.latlng.lat,
            longitude: restaurant.latlng.lng,
          }}
          onPress={() => onMarkerPress(index)}
          tracksViewChanges={false}
        >
          <IconLocationMarker selected={index === focusedIndex} />
        </Marker>
      ))}
    </>
  );
}
