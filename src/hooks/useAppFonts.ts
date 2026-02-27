import { useFonts } from 'expo-font';

export function useAppFonts(): { fontsLoaded: boolean } {
  const [fontsLoaded] = useFonts({
    'Roobert-Regular': require('../assets/fonts/RoobertTRIAL-Regular.otf'),
    'Roobert-SemiBold': require('../assets/fonts/RoobertTRIAL-SemiBold.otf'),
  });

  return { fontsLoaded };
}
