import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconIsotipo } from '@components/icons';
import { Button } from '@components/Button';

interface FallbackScreenProps {
  title?: string;
  buttonLabel: string;
  onPress: () => void;
  animate?: boolean;
}

export function FallbackScreen({
  title = 'Ups, algo salió mal',
  buttonLabel,
  onPress,
  animate = false,
}: FallbackScreenProps): React.JSX.Element {
  const fadeAnim = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (animate) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [animate, fadeAnim]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <SafeAreaView className="flex-1 bg-canvas items-center justify-center px-4">
        <View className="items-center gap-10">
          <IconIsotipo size={24} />

          <Text className="font-roobert-semibold text-2xl text-blue text-center">{title}</Text>

          <Button label={buttonLabel} onPress={onPress} variant="outline-black" />

          <IconIsotipo size={24} />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
