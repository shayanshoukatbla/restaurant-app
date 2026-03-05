import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import type { RootStackParamList } from '@app-types/navigation';
import { useAuthStore } from '@features/auth/store';
import { Logo } from '@components/Logo';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  const { isAuthenticated, isHydrated, isVerifying } = useAuthStore();

  if (!isHydrated || isVerifying) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 16 }}>
        <View style={{ flex: 1, backgroundColor: '#F1F1F0', borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <Logo color="black" size="lg" />
          <ActivityIndicator size="large" color="#0B0B0B" />
        </View>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
