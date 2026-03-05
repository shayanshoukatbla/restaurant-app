import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IconPlus } from '@components/icons';
import { Button } from '@components/Button';

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export interface SelectedImage {
  uri: string;
  contentType: string;
  sizeBytes: number;
}

interface ImageUploadBoxProps {
  onImageSelected: (image: SelectedImage) => void;
  onClear: () => void;
  initialUri?: string;
  isUploading?: boolean;
  error?: string;
}

export function ImageUploadBox({
  onImageSelected,
  onClear,
  initialUri,
  isUploading = false,
  error,
}: ImageUploadBoxProps): React.JSX.Element {
  const [localUri, setLocalUri] = useState<string | undefined>(initialUri);

  const handlePress = async (): Promise<void> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permiso requerido',
        'Debes permitir el acceso a la galería para subir imágenes.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const sizeBytes = asset.fileSize ?? 0;

    if (sizeBytes > MAX_SIZE_BYTES) {
      Alert.alert('Imagen muy grande', 'El tamaño máximo permitido es 10 MB.');
      return;
    }

    const mimeType = asset.mimeType ?? 'image/jpeg';
    setLocalUri(asset.uri);
    onImageSelected({ uri: asset.uri, contentType: mimeType, sizeBytes });
  };

  const handleClear = (): void => {
    setLocalUri(undefined);
    onClear();
  };

  return (
    <View className="items-center">
      <View className="w-[204px] h-[204px] rounded-3xl border border-ink overflow-hidden bg-card">
        {localUri ? (
          <>
            <Image source={{ uri: localUri }} className="w-full h-full" resizeMode="cover" />

            {/* Dark overlay + Eliminar button */}
            <View
              className="absolute inset-0 items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            >
              {isUploading ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Button
                  label="Eliminar"
                  textSize="!text-2xl"
                  variant="outline-white"
                  className="px-8 py-4 "
                  onPress={handleClear}
                />
              )}
            </View>
          </>
        ) : (
          // ── Empty state ────────────────────────────────────
          <Button
            variant="outline-black"
            onPress={handlePress}
            disabled={isUploading}
            className="flex-1 !border-0 bg-transparent"
          >
            <View className="items-center gap-2">
              <IconPlus size={24} color="#0B0B0B" />
              <Text className="font-roobert-semibold text-base text-ink">Añadir imágen</Text>
            </View>
          </Button>
        )}
      </View>

      {error ? (
        <Text className="font-roobert text-xs text-error mt-2 text-center">{error}</Text>
      ) : null}
    </View>
  );
}
