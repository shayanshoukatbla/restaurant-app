import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { AppTabParamList } from '@app-types/navigation';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFavoritesStore } from '../store';
import { RestaurantCard } from '../components/RestaurantCard';
import { IconHeart } from '@components/icons';

type FavoritesNavigationProp = BottomTabNavigationProp<AppTabParamList, 'Favorites'>;

export default function FavoritesScreen(): React.JSX.Element {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const favorites = useFavoritesStore((s) => s.favorites);

  const handleRestaurantPress = (restaurantId: string): void => {
    navigation.navigate('RestaurantList', { screen: 'RestaurantDetail', params: { restaurantId } });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
      <View className="px-4 pt-4 pb-2">
        <Text className="font-roobert-semibold text-2xl text-ink">Favoritos</Text>
      </View>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-3">
          <IconHeart color="#E5E7EB" size={56} />
          <Text className="font-roobert-semibold text-base text-ink">Sin favoritos aún</Text>
          <Text className="font-roobert text-sm text-subtle text-center px-8">
            Pulsa el corazón en cualquier restaurante para guardarlo aquí.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          contentContainerClassName="px-4 pt-2 pb-6 gap-4"
          renderItem={({ item }) => (
            <RestaurantCard restaurant={item} onPress={handleRestaurantPress} variant="list" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
