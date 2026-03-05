import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RestaurantStackParamList } from '@app-types/navigation';
import RestaurantsScreen from '@features/restaurants/screens/RestaurantsScreen';
import RestaurantDetailScreen from '@features/restaurants/screens/RestaurantDetailScreen';
import CreateRestaurantScreen from '@features/restaurants/screens/CreateRestaurantScreen';
import EditRestaurantScreen from '@features/restaurants/screens/EditRestaurantScreen';

const Stack = createNativeStackNavigator<RestaurantStackParamList>();

export function RestaurantsNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
      <Stack.Screen name="CreateRestaurant" component={CreateRestaurantScreen} />
      <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} />
    </Stack.Navigator>
  );
}
