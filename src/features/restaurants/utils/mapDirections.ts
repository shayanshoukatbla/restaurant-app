import { Linking, Platform, Alert } from 'react-native';

export function openDirections(lat: number, lng: number, label: string): void {
  const encodedLabel = encodeURIComponent(label);
  const url = Platform.select({
    ios: `maps://?daddr=${lat},${lng}&dirflg=d`,
    android: `google.navigation:q=${lat},${lng}`,
  });

  Alert.alert(
    label,
    '¿Quieres abrir las indicaciones en el mapa?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Abrir',
        onPress: () => {
          Linking.canOpenURL(url!).then((supported) => {
            if (supported) {
              Linking.openURL(url!);
            } else {
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodedLabel}`,
              );
            }
          });
        },
      },
    ],
  );
}
