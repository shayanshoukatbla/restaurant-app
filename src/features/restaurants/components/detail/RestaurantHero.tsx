import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { IconArrowLeft, IconHeart, IconHeartFill } from '@components/icons';
import type { Restaurant } from '@app-types/api';
import { useFavoritesStore } from '@features/restaurants/store/useFavoritesStore';

interface RestaurantHeroProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantHero({ restaurant, onBack }: RestaurantHeroProps): React.JSX.Element {
  const favorited = useFavoritesStore((s) => s.favoriteIds.includes(restaurant._id));
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const HeartIcon = favorited ? IconHeartFill : IconHeart;

  const handleFavoritePress = (): void => {
    if (favorited) {
      removeFavorite(restaurant._id);
    } else {
      addFavorite(restaurant);
    }
  };

  return (
    <View className="w-full h-[216px] overflow-hidden rounded-2xl ">
      {/* Background image */}
      <Image
        source={{ uri: restaurant.image }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
      />

      {/* Dark overlay */}
      <View className="absolute inset-0 bg-black/40" />

      {/* Controls row */}
      <View className="flex-row justify-between  px-4 py-2">
        <TouchableOpacity
          onPress={onBack}
          hitSlop={12}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-full bg-white/30 items-center justify-center"
        >
          <IconArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFavoritePress}
          hitSlop={12}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-full bg-white/30 items-center justify-center"
        >
          <HeartIcon color={favorited ? '#FFFFFF' : '#FFFFFF'} size={24} />
        </TouchableOpacity>
      </View>

      {/* Title block */}
      <View className="px-5 absolute inset-0 gap-2  flex flex-col items-center justify-center my-auto">
        <Text className="font-roobert-semibold text-2xl text-canvas" numberOfLines={2}>
          {restaurant.name}
        </Text>
        <Text className="font-roobert text-sm text-canvas " numberOfLines={1}>
          {restaurant.address}
        </Text>
      </View>
    </View>
  );
}
