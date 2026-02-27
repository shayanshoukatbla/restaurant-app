import React from 'react';
import { View, Text } from 'react-native';
import type { AuthStackScreenProps } from '@app-types/navigation';

type Props = AuthStackScreenProps<'Signin'>;

export default function SigninScreen(_props: Props): React.JSX.Element {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Sign In</Text>
    </View>
  );
}
