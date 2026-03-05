import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { AppTabParamList } from '@app-types/navigation';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { Restaurant } from '@app-types/api';
import { useFavoriteRestaurants } from '../hooks/useFavoriteRestaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { EmptyFavorites } from '../components/EmptyFavorites';
import { useFavoritesStore } from '../store';

type FavoritesNavigationProp = BottomTabNavigationProp<AppTabParamList, 'Favorites'>;

export default function FavoritesScreen(): React.JSX.Element {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const { restaurants } = useFavoriteRestaurants();
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const handleRestaurantPress = (restaurantId: string): void => {
    navigation.navigate('RestaurantList', { screen: 'RestaurantDetail', params: { restaurantId } });
  };

  const renderItem = ({ item }: { item: Restaurant }): React.JSX.Element => (
    <RestaurantCard restaurant={item} onPress={handleRestaurantPress} variant="list" />
  );

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
      <View className="px-4 pt-4 pb-2">
        <Text className="font-roobert-semibold text-2xl text-ink">Favoritos</Text>
      </View>

      {favoriteIds.length === 0 ? (
        <EmptyFavorites
          onGoToRestaurants={() => navigation.navigate('RestaurantList', { screen: 'Restaurants' })}
        />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(r) => r._id}
          contentContainerClassName="px-4 pt-2 pb-6 gap-4"
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
