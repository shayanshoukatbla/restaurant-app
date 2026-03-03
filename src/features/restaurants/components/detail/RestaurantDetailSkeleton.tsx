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

export function RestaurantDetailSkeleton(): React.JSX.Element {
  return (
    <View className="gap-6 px-4 pt-4">
      {/* Hero placeholder */}
      <SkeletonBox className="w-full h-[216px] rounded-2xl bg-card" />

      {/* Description lines */}
      <View className="gap-2">
        <SkeletonBox className="h-4 w-full rounded bg-card" />
        <SkeletonBox className="h-4 w-full rounded bg-card" />
        <SkeletonBox className="h-4 w-3/4 rounded bg-card" />
        <SkeletonBox className="h-4 w-full rounded bg-card" />
        <SkeletonBox className="h-4 w-5/6 rounded bg-card" />
      </View>

      {/* Comment box */}
      <SkeletonBox className="w-full h-32 rounded-3xl bg-card" />

      {/* Comment items */}
      {[1, 2, 3].map((i) => (
        <View key={i} className="gap-2 py-4 border-b border-border">
          <View className="flex-row justify-between items-center">
            <SkeletonBox className="h-4 w-32 rounded bg-card" />
            <SkeletonBox className="h-4 w-24 rounded bg-card" />
          </View>
          <SkeletonBox className="h-3 w-full rounded bg-card" />
          <SkeletonBox className="h-3 w-5/6 rounded bg-card" />
          <SkeletonBox className="h-3 w-3/4 rounded bg-card" />
        </View>
      ))}
    </View>
  );
}
