import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@components/index';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export default function ProfileScreen(): React.JSX.Element {
  const { logout } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center bg-canvas px-4">
      <Text className="text-2xl font-bold mb-6">Profile</Text>
      <Button label="Salir" onPress={logout} variant="outline-black" />
    </View>
  );
}
