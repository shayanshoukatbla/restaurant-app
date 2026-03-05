import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RestaurantStackScreenProps } from '@app-types/navigation';
import { AppInput, AddressInput, IconIsotipo, Button, FallbackScreen } from '@components/index';
import type { AddressLocation } from '@components/AddressInput';
import { ImageUploadBox, type SelectedImage } from '../components/ImageUploadBox';
import { useUploadImage, useCreateRestaurant } from '../hooks/useCreateRestaurant';
import {
  createRestaurantSchema,
  type CreateRestaurantFields,
} from '../schemas/createRestaurant.schema';
import { formatError } from '@utils/errorFormatter';

type Props = RestaurantStackScreenProps<'CreateRestaurant'>;

export default function CreateRestaurantScreen({ navigation }: Props): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | undefined>();
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreateRestaurantFields>({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      name: '',
      address: '',
      lat: undefined,
      lng: undefined,
      description: '',
      image: '',
    },
  });

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
  const {
    mutate: createRestaurant,
    isPending: isCreating,
    error: createError,
    reset: resetCreate,
  } = useCreateRestaurant();

  const serverError = createError ? formatError(createError) : null;

  // ── Handlers ───────────────────────────────────────────────

  const handleImageSelected = (image: SelectedImage): void => {
    setSelectedImage(image);
    setValue('image', image.uri, { shouldValidate: true });
  };

  const handleImageClear = (): void => {
    setSelectedImage(undefined);
    setValue('image', '', { shouldValidate: true });
  };

  const handleLocationChange = (location: AddressLocation): void => {
    setValue('lat', location.lat, { shouldValidate: true });
    setValue('lng', location.lng, { shouldValidate: true });
  };

  // First upload image then create restaurant
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
        const message = formatError(err);
        setError('image', { message });
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

    createRestaurant(payload, {
      onSuccess: () => {
        setSaved(true);
      },
      onError: () => {
        // Error handled by serverError state matching the fallback
      },
    });
  };

  const isBusy = isUploading || isCreating;

  // ── Status states ────────────────────────────────────────────
  if (saved) {
    return (
      <FallbackScreen
        title="Restaurante creado"
        buttonLabel="Volver al inicio"
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
        onPress={() => resetCreate()}
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
          {/* Logo */}
          <IconIsotipo size={26} />

          {/* Image upload box */}
          <Controller
            control={control}
            name="image"
            render={() => (
              <ImageUploadBox
                onImageSelected={handleImageSelected}
                onClear={handleImageClear}
                isUploading={isUploading}
                error={errors.image?.message}
              />
            )}
          />

          {/* Form fields */}
          <View className="w-full gap-4">
            {/* Name */}
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

            {/* Address with lat/lng extraction */}
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

            {/* Description */}
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

          {/* Submit button */}
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
