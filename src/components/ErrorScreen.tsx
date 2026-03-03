import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconIsotipo } from '@components/icons';
import { Button } from '@components/index';

interface ErrorScreenProps {
  title?: string;
  buttonLabel: string;
  onPress: () => void;
}

export function ErrorScreen({
  title = 'Ups, algo salió mal',
  buttonLabel,
  onPress,
}: ErrorScreenProps): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-canvas items-center justify-center px-4">
      <View className="items-center gap-10">
        <IconIsotipo size={24} />

        <Text className="font-roobert-semibold text-2xl text-blue text-center">{title}</Text>

        <Button label={buttonLabel} onPress={onPress} variant="outline-black" />

        <IconIsotipo size={24} />
      </View>
    </SafeAreaView>
  );
}
