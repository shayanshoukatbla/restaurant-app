import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconList, IconMap } from '@components/icons';

export type ViewMode = 'list' | 'map';

interface RestaurantsHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ACTIVE_COLOR = '#111827';
const INACTIVE_COLOR = '#9CA3AF';

const TITLES: Record<ViewMode, string> = {
  list: 'Restaurantes',
  map: 'Mapa',
};

export function RestaurantsHeader({
  viewMode,
  onViewModeChange,
}: RestaurantsHeaderProps): React.JSX.Element {
  return (
    <View className="flex-row items-center justify-between px-4 py-6">
      <Text className="font-roobert-semibold text-2xl text-ink">{TITLES[viewMode]}</Text>
      <View className="flex-row items-center gap-6">
        <TouchableOpacity activeOpacity={0.7} onPress={() => onViewModeChange('list')}>
          <IconList color={viewMode === 'list' ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => onViewModeChange('map')}>
          <IconMap color={viewMode === 'map' ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
