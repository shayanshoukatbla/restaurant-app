import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconCommentStarFill, IconCommentStarEmpty } from '@components/icons';

interface StarRatingProps {
  rating: number;
  size?: number;
  onRate?: (rating: number) => void;
}

export function StarRating({ rating, size = 16, onRate }: StarRatingProps): React.JSX.Element {
  return (
    <View className="flex-row gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < rating;
        const StarIcon = isFilled ? IconCommentStarFill : IconCommentStarEmpty;

        if (onRate) {
          return (
            <TouchableOpacity key={i} onPress={() => onRate(i + 1)} hitSlop={6} activeOpacity={0.7}>
              <StarIcon size={size} />
            </TouchableOpacity>
          );
        }

        return <StarIcon key={i} size={size} />;
      })}
    </View>
  );
}
