import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RestaurantStackParamList } from '@app-types/navigation';
import type { Restaurant } from '@app-types/api';
import { AppInput, AddressInput, IconIsotipo, FallbackScreen, Button } from '@components/index';
import type { AddressLocation } from '@components/AddressInput';
import { ImageUploadBox, type SelectedImage } from './ImageUploadBox';
import { useUploadImage, useUpdateRestaurant } from '../hooks/useCreateRestaurant';
import {
  createRestaurantSchema,
  type CreateRestaurantFields,
} from '../schemas/createRestaurant.schema';
import { formatError } from '@utils/errorFormatter';

interface EditRestaurantFormProps {
  restaurant: Restaurant;
  navigation: NativeStackNavigationProp<RestaurantStackParamList, 'EditRestaurant'>;
}

export function EditRestaurantForm({
  restaurant,
  navigation,
}: EditRestaurantFormProps): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | undefined>();
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreateRestaurantFields>({
    resolver: zodResolver(createRestaurantSchema), // Using the same schema as create restaurant
    defaultValues: {
      name: restaurant.name,
      address: restaurant.address,
      lat: restaurant.latlng?.lat,
      lng: restaurant.latlng?.lng,
      description: restaurant.description ?? '',
      image: restaurant.image,
    },
  });

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
  const {
    mutate: updateRestaurant,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdate,
  } = useUpdateRestaurant(restaurant._id);

  const serverError = updateError ? formatError(updateError) : null;

  // ── Handlers ───────────────────────────────────────────────

  const handleImageSelected = (image: SelectedImage): void => {
    setSelectedImage(image);
    setValue('image', image.uri, { shouldValidate: true });
  };

  const handleImageClear = (): void => {
    setSelectedImage(undefined);
    setValue('image', restaurant.image, { shouldValidate: true });
  };

  const handleLocationChange = (location: AddressLocation): void => {
    setValue('lat', location.lat, { shouldValidate: true });
    setValue('lng', location.lng, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateRestaurantFields): Promise<void> => {
    let imageUrl = data.image;

    if (selectedImage && imageUrl === selectedImage.uri) {
      try {
        imageUrl = await uploadImage({
          fileUri: selectedImage.uri,
          contentType: selectedImage.contentType,
          sizeBytes: selectedImage.sizeBytes,
        });
      } catch (err) {
        setError('image', { message: formatError(err) });
        return;
      }
    }

    const payload = {
      name: data.name,
      address: data.address,
      image: imageUrl,
      description: data.description,
      latlng: { lat: data.lat as number, lng: data.lng as number },
    };

    updateRestaurant(payload, {
      onSuccess: () => {
        setSaved(true);
      },
      onError: () => {},
    });
  };

  const isBusy = isUploading || isUpdating;

  // ── Status states ────────────────────────────────────────────
  if (saved) {
    return (
      <FallbackScreen
        title="Restaurante guardado"
        buttonLabel="Ver restaurante"
        onPress={() => navigation.goBack()}
        animate
      />
    );
  }

  if (serverError) {
    return (
      <FallbackScreen
        title={serverError}
        buttonLabel="Intentar de nuevo"
        onPress={() => resetUpdate()}
        animate
      />
    );
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-4 pt-4 pb-10 gap-6 items-center"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          <IconIsotipo size={26} />

          <Controller
            control={control}
            name="image"
            render={() => (
              <ImageUploadBox
                initialUri={restaurant.image}
                onImageSelected={handleImageSelected}
                onClear={handleImageClear}
                isUploading={isUploading}
                error={errors.image?.message}
              />
            )}
          />

          <View className="w-full gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Nombre de restaurante:"
                  placeholder="Nombre del restaurante"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <AddressInput
                  label="Dirección del restaurante"
                  placeholder="Dirección"
                  value={value}
                  onChange={onChange}
                  onLocationChange={handleLocationChange}
                  error={errors.address?.message ?? errors.lat?.message ?? errors.lng?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Descripción del restaurante"
                  placeholder="Escribe información acerca del restaurante"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.description?.message}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={{ minHeight: 96 }}
                />
              )}
            />
          </View>

          <Button
            label={isBusy ? 'Guardando…' : 'Guardar'}
            onPress={handleSubmit(onSubmit)}
            variant="outline-black"
            disabled={isBusy}
            fullWidth
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
