import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IconArrowLeft, IconHeart, IconHeartFill } from '@components/icons';
import type { Restaurant } from '@app-types/api';
import { useFavoritesStore } from '@features/restaurants/store/useFavoritesStore';

interface RestaurantHeroProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantHero({ restaurant, onBack }: RestaurantHeroProps): React.JSX.Element {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(restaurant._id);

  const HeartIcon = favorited ? IconHeartFill : IconHeart;

  const handleFavoritePress = (): void => {
    if (favorited) {
      removeFavorite(restaurant._id);
    } else {
      addFavorite(restaurant._id);
    }
  };

  return (
    <View className="w-full h-[216px] overflow-hidden rounded-2xl ">
      {/* Background image */}
      <Image
        source={{ uri: restaurant.image }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
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
