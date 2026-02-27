import './global.css';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from '@navigation/index';
import { configureApiClient } from '@api/index';
import { useAuthStore } from '@features/auth/store';
import { useAppFonts } from '@hooks/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});

function AppBootstrap(): React.JSX.Element {
  const { token, clearAuth } = useAuthStore();
  const { fontsLoaded } = useAppFonts();

  useEffect(() => {
    configureApiClient({
      tokenGetter: () => token,
      onUnauthorized: () => {
        clearAuth();
        queryClient.clear();
      },
    });
  }, [token, clearAuth]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />;
  }

  return <RootNavigator />;
}

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppBootstrap />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
