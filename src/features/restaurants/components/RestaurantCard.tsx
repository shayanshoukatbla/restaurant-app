import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import type { Restaurant } from '@app-types/api';
import { IconStar, IconHeart, IconHeartFill } from '@components/icons';
import { useFavoritesStore } from '../store';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (restaurantId: string) => void;
  variant?: 'list' | 'map';
}

function StarRating({ rating }: { rating: number }): React.JSX.Element {
  const stars = Math.round(rating);
  return (
    <View className="flex-row gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} color={i < stars ? '#264BEB' : '#E5E7EB'} size={16} />
      ))}
    </View>
  );
}

export const RestaurantCard = React.memo(function RestaurantCard({
  restaurant,
  onPress,
  variant = 'list',
}: RestaurantCardProps): React.JSX.Element {
  const favorited = useFavoritesStore((s) => s.favoriteIds.includes(restaurant._id));
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const reviewCount = restaurant.reviews?.length ?? 0;

  const handleFavoritePress = (): void => {
    if (favorited) {
      removeFavorite(restaurant._id);
    } else {
      addFavorite(restaurant);
    }
  };

  const HeartIcon = favorited ? IconHeartFill : IconHeart;

  if (variant === 'map') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress(restaurant._id)}
        className="flex-row items-center gap-2 bg-canvas rounded-[20px] p-2"
      >
        <Image
          source={{ uri: restaurant.image }}
          style={{ width: 68, alignSelf: 'stretch', borderRadius: 16 }}
          contentFit="cover"
        />
        <View className="flex-1 gap-2 py-1">
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-1 gap-1">
              <Text
                className="font-roobert-semibold text-base text-ink leading-tight"
                numberOfLines={1}
              >
                {restaurant.name}
              </Text>
              <Text
                style={{ paddingHorizontal: 0, paddingVertical: 2 }}
                className="font-roobert text-sm text-ink leading-tight"
                numberOfLines={1}
              >
                {restaurant.address}
              </Text>
            </View>
            <TouchableOpacity onPress={handleFavoritePress} hitSlop={8} activeOpacity={0.7}>
              <HeartIcon size={24} />
            </TouchableOpacity>
          </View>
          {restaurant.avgRating != null && <StarRating rating={restaurant.avgRating} />}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(restaurant._id)}
      className="flex-row items-center gap-2"
    >
      <Image
        source={{ uri: restaurant.image }}
        style={{ width: 80, height: 80, borderRadius: 16 }}
        contentFit="cover"
      />
      <View className="flex-1 justify-between self-stretch py-2">
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1 gap-1">
            <Text
              className="font-roobert-semibold text-base text-ink leading-tight"
              numberOfLines={1}
            >
              {restaurant.name}
            </Text>
            <Text
              style={{ paddingHorizontal: 0, paddingVertical: 2 }}
              className="font-roobert text-sm text-ink leading-tight"
              numberOfLines={1}
            >
              {restaurant.address}
            </Text>
          </View>
          <TouchableOpacity onPress={handleFavoritePress} hitSlop={8} activeOpacity={0.7}>
            <HeartIcon size={24} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-4">
          {restaurant.avgRating != null && <StarRating rating={restaurant.avgRating} />}
          <Text className="font-roobert text-sm text-ink">({reviewCount} comentarios)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
