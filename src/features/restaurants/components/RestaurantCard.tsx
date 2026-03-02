import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import type { Restaurant } from '@app-types/api';
import { IconStar, IconHeart } from '@components/icons';

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

export function RestaurantCard({
  restaurant,
  onPress,
  variant = 'list',
}: RestaurantCardProps): React.JSX.Element {
  const reviewCount = restaurant.reviews?.length ?? 0;

  if (variant === 'map') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress(restaurant._id)}
        className="flex-row items-center gap-2 bg-canvas rounded-[20px] p-2"
      >
        <Image
          source={{ uri: restaurant.image }}
          className="w-[68px] self-stretch rounded-2xl"
          resizeMode="cover"
        />
        <View className="flex-1 gap-2 py-1">
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-1 gap-1">
              <Text className="font-roobert-semibold text-base text-ink leading-tight" numberOfLines={1}>
                {restaurant.name}
              </Text>
              <Text className="font-roobert text-sm text-ink leading-tight" numberOfLines={1}>
                {restaurant.address}
              </Text>
            </View>
            <IconHeart color="#111827" size={24} />
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
        className="w-20 h-20 rounded-2xl"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between self-stretch py-2">
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1 gap-1">
            <Text className="font-roobert-semibold text-base text-ink leading-tight" numberOfLines={1}>
              {restaurant.name}
            </Text>
            <Text className="font-roobert text-sm text-ink leading-tight" numberOfLines={1}>
              {restaurant.address}
            </Text>
          </View>
          <IconHeart color="#111827" size={24} />
        </View>
        <View className="flex-row items-center gap-4">
          {restaurant.avgRating != null && <StarRating rating={restaurant.avgRating} />}
          <Text className="font-roobert text-sm text-ink">({reviewCount} comentarios)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
