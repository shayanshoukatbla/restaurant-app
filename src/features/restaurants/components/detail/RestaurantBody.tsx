import React from 'react';
import { View, Text } from 'react-native';

interface RestaurantBodyProps {
  description: string | undefined;
}

export function RestaurantBody({ description }: RestaurantBodyProps): React.JSX.Element | null {
  if (!description) return null;

  return (
    <View className="gap-2">
      <Text className="font-roobert text-base text-ink leading-6">{description}</Text>
    </View>
  );
}
