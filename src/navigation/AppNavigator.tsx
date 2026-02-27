import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '@app-types/navigation';

// Placeholder screens — replaced in later phases
import RestaurantListScreen from '@features/restaurants/screens/RestaurantListScreen';
import MapViewScreen from '@features/restaurants/screens/MapViewScreen';
import FavoritesScreen from '@features/restaurants/screens/FavoritesScreen';
import ProfileScreen from '@features/auth/screens/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E94560',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        },
      }}
    >
      <Tab.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
        options={{ tabBarLabel: 'Restaurants' }}
      />
      <Tab.Screen
        name="MapView"
        component={MapViewScreen}
        options={{ tabBarLabel: 'Map' }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favorites' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
