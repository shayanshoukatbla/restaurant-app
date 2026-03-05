import React from 'react';
import { FallbackScreen } from '@components/FallbackScreen';

interface Props {
  onGoToRestaurants: () => void;
}

export function EmptyFavorites({ onGoToRestaurants }: Props): React.JSX.Element {
  return (
    <FallbackScreen
      title="Sin favoritos aún"
      buttonLabel="Explorar restaurantes"
      onPress={onGoToRestaurants}
    />
  );
}
