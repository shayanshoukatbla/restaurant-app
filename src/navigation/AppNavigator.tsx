import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from '@app-types/navigation';
import { TabBar } from '@components/TabBar';
import { RestaurantsNavigator } from './RestaurantsNavigator';
import FavoritesScreen from '@features/restaurants/screens/FavoritesScreen';
import ProfileScreen from '@features/auth/screens/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="RestaurantList" component={RestaurantsNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
