import React, { useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { profileSchema, type ProfileFields } from '@features/auth/schemas/profile.schema';
import { ProfileAvatar } from '@features/auth/components/ProfileAvatar';
import { isoToDisplay } from '@features/auth/utils/dateUtils';
import { AppInput } from '@components/AppInput';
import { Button, DateInput, AddressInput } from '@components/index';

export default function ProfileScreen(): React.JSX.Element {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuthStore();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      dni: user?.dni ?? '',
      birthDate: isoToDisplay(user?.birthDate),
      address: user?.address ?? '',
    },
  });

  // Keep form in sync if the user object updates (e.g. after verifySession)
  useEffect(() => {
    reset({
      dni: user?.dni ?? '',
      birthDate: isoToDisplay(user?.birthDate),
      address: user?.address ?? '',
    });
  }, [user, reset]);

  const onSave = (_values: ProfileFields): void => {
    // TODO: connect to updateProfile API when available
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-4 pt-10 pb-10 gap-6"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          {/* Header */}
          <View className="items-center gap-2">
            <ProfileAvatar name={user?.name ?? 'U'} />
            <Text className="font-roobert-semibold text-2xl text-ink text-center">
              {user?.name ?? 'Nombre de usuario'}
            </Text>
          </View>

          {/* Editable fields */}
          <View className="gap-4 pt-6">
            <Controller
              control={control}
              name="dni"
              render={({ field: { value, onChange, onBlur } }) => (
                <AppInput
                  theme="profile"
                  label="DNI"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Introduce tu DNI"
                  autoCapitalize="characters"
                  error={errors.dni?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="birthDate"
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Fecha de Nacimiento"
                  value={value}
                  onChange={onChange}
                  error={errors.birthDate?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <AddressInput
                  theme="profile"
                  label="Dirección"
                  placeholder="Dirección"
                  value={value}
                  onChange={onChange}
                  error={errors.address?.message}
                />
              )}
            />

            {isDirty && (
              <Button
                label="Guardar cambios"
                onPress={handleSubmit(onSave)}
                variant="outline-black"
              />
            )}
          </View>

          <Button label="Salir" onPress={logout} variant="outline-black" />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
