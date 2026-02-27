import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthStackScreenProps } from '@app-types/navigation';
import { AppCard, Button, Logo } from '@components/index';

type Props = AuthStackScreenProps<'Welcome'>;

export default function WelcomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'bottom', 'left', 'right']}>
      <View className="flex-1 p-4">
        <AppCard>
          <View className="flex-1 items-center justify-center px-6 py-10">
            <Logo color="black" size="md" />

            <View className="w-full items-center gap-6 mt-10">
              <Text className="text-ink text-center text-2xl font-roobert">
                {
                  'Hola,\nBienvenido a la prueba de\n Tailor hub, en ella has de\n añadir los restaurantes\n favoritos donde te\n gustaría ir en tu\n onboarding.'
                }
              </Text>

              <Button
                label="Entrar"
                onPress={() => navigation.navigate('Signin')}
                variant="outline-black"
              />
            </View>
          </View>
        </AppCard>
      </View>
    </SafeAreaView>
  );
}
