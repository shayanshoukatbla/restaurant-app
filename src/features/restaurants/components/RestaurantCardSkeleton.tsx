import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

function SkeletonBox({ className }: { className: string }): React.JSX.Element {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={{ opacity }} className={className} />;
}

export function RestaurantCardSkeleton(): React.JSX.Element {
  return (
    <View className="flex-row items-center gap-2">
      {/* Thumbnail */}
      <SkeletonBox className="w-20 h-20 rounded-2xl bg-card" />

      {/* Info */}
      <View className="flex-1 justify-between self-stretch py-2">
        <View className="gap-1">
          {/* Name line */}
          <SkeletonBox className="h-4 w-3/4 rounded bg-card" />
          {/* Address line */}
          <SkeletonBox className="h-3 w-1/2 rounded bg-card" />
        </View>
        {/* Stars row */}
        <SkeletonBox className="h-4 w-32 rounded bg-card" />
      </View>
    </View>
  );
}
