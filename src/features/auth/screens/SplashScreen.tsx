import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthStackScreenProps } from '@app-types/navigation';
import { AppCard } from '@components/AppCard';
import { Logo } from '@components/Logo';

type Props = AuthStackScreenProps<'Splash'>;

export default function SplashScreen({ navigation }: Props): React.JSX.Element {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'bottom', 'left', 'right']}>
      <View className="flex-1 p-4">
        <AppCard>
          <View className="flex-1 items-center justify-center">
            <Logo color="black" size="lg" />
          </View>
        </AppCard>
      </View>
    </SafeAreaView>
  );
}
