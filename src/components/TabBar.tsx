import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '@app-types/navigation';
import { IconLocation, IconHeart, IconPerson, IconPlus } from '@components/icons';

const ACTIVE_COLOR = '#111827';
const INACTIVE_COLOR = '#9CA3AF';

const TAB_ICONS: Record<keyof AppTabParamList, (color: string) => React.JSX.Element> = {
  RestaurantList: (color) => <IconLocation color={color} />,
  Favorites: (color) => <IconHeart color={color} />,
  Profile: (color) => <IconPerson color={color} />,
};

export function TabBar({ state, navigation }: BottomTabBarProps): React.JSX.Element {
  return (
    <View className="relative">
      {/* TODO: when click on this it should navigate to create restaurant screen */}
      {/* Floating button for create new restaurant */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('RestaurantList')}
        className="absolute right-4 -top-16 w-14 h-14 rounded-full bg-blue items-center justify-center z-10"
      >
        <IconPlus />
      </TouchableOpacity>

      {/* Tab bar */}
      <View className="flex-row items-center justify-between px-16 py-5 bg-canvas border-t border-card">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(route.name)}
              className="items-center justify-center"
            >
              {TAB_ICONS[route.name as keyof AppTabParamList]?.(color)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
